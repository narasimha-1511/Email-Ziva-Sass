import axios from "axios";
import {
  EmailAddress,
  EmailAttachment,
  EmailMessage,
  SyncResponse,
  SyncUpdatedResponse,
} from "./types";
import { db } from "@/server/db";
import { syncEmailsToDatabase } from "./sync-to-db";

export class Account {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async startSync() {
    const respose = await axios.post<SyncResponse>(
      "https://api.aurinko.io/v1/email/sync",
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          bodyType: "html",
          daysWithin: 2,
        },
      },
    );

    return respose.data;
  }

  private async getUpdatedEmails({
    deltaToken,
    pageToken,
  }: {
    deltaToken?: string;
    pageToken?: string;
  }) {
    let params: Record<string, string> = {};

    if (deltaToken) params.deltaToken = deltaToken;
    if (pageToken) params.pageToken = pageToken;

    const response = await axios.get<SyncUpdatedResponse>(
      "https://api.aurinko.io/v1/email/sync/updated",
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: params,
      },
    );

    return response.data;
  }

  async performInitialSync() {
    try {
      //start the sync process
      let syncResponse = await this.startSync();
      while (!syncResponse.ready) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        syncResponse = await this.startSync();
      }

      //get the delta token thing
      let storedDeltaToken: string = syncResponse.syncUpdatedToken;

      let updatedResponse = await this.getUpdatedEmails({
        deltaToken: storedDeltaToken,
      });

      if (updatedResponse.nextDeltaToken) {
        // this means sync is completed
        storedDeltaToken = updatedResponse.nextDeltaToken;
      }

      let allEmails: EmailMessage[] = updatedResponse.records;

      //fetch all pages if they are more
      while (updatedResponse.nextPageToken) {
        updatedResponse = await this.getUpdatedEmails({
          pageToken: updatedResponse.nextPageToken,
        });
        allEmails = allEmails.concat(updatedResponse.records);
        if (updatedResponse.nextDeltaToken) {
          //sync has ended
          storedDeltaToken = updatedResponse.nextDeltaToken;
        }
      }

      console.log(
        "intial sync completed , we have Synced all Emails",
        allEmails.length,
        "emails",
      );

      //store the latest deltaToken for future syncying the data

      return {
        emails: allEmails,
        deltaToken: storedDeltaToken,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during sync:",
          JSON.stringify(error?.response?.data, null, 2),
        );
      } else {
        console.error("Error during sync:", error);
      }
    }
  }

  async sendEmail({
    threadId,
    from,
    subject,
    body,
    inReplyTo,
    references,
    to,
    cc,
    bcc,
    replyTo,
    attachments,
  }: {
    from: EmailAddress;
    subject: string;
    body: string;
    inReplyTo?: string;
    references?: string;
    to: EmailAddress[];
    cc?: EmailAddress[];
    bcc?: EmailAddress[];
    replyTo?: EmailAddress;
    attachments?: EmailAttachment[];
    threadId?: string;
  }) {
    try {
      const response = await axios.post<EmailMessage>(
        "https://api.aurinko.io/v1/email/messages",
        {
          threadId,
          from,
          subject,
          body,
          inReplyTo,
          references,
          to,
          cc,
          bcc,
          replyTo: [replyTo],
        },
        {
          params: {
            returnIds: true,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );

      console.log("Email sent successfully", response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during sendEmail:",
          JSON.stringify(error?.response?.data, null, 2),
        );
      }
      console.error("Error during sendEmail:", error);
      throw error;
    }
  }

  async syncEmails() {
    const account = await db.account.findUnique({
      where: {
        accessToken: this.token,
      },
    });

    if (!account) throw new Error("Account not found");
    if (!account.nextDeltaToken) throw new Error("No delta token found");

    let syncResponse = await this.getUpdatedEmails({
      deltaToken: account.nextDeltaToken ?? undefined,
    });

    let storedDeltaToken: string = syncResponse.nextDeltaToken;
    let allEmails: EmailMessage[] = syncResponse.records || [];

    //fetch all pages if they are more
    while (syncResponse.nextPageToken) {
      syncResponse = await this.getUpdatedEmails({
        pageToken: syncResponse.nextPageToken,
      });
      allEmails = allEmails.concat(syncResponse.records || []);
      if (syncResponse.nextDeltaToken) {
        storedDeltaToken = syncResponse.nextDeltaToken;
      }
    }

    try {
      await syncEmailsToDatabase(allEmails, account.id);
    } catch (error) {
      console.error("Error during syncEmails:", error);
      throw error;
    }

    await db.account.update({
      where: { id: account.id },
      data: { nextDeltaToken: storedDeltaToken },
    });

    return {
      emails: allEmails,
      deltaToken: storedDeltaToken,
    };
  }
}
