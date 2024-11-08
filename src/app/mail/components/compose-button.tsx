"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EmailEditor from "../email-editor";
import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";
import useThreads from "@/hooks/use-threads";
import { toast } from "sonner";

const ComposeButton = () => {
  const [toValues, setToValues] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [ccValues, setCcValues] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [bccValues, setBccValues] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [subject, setSubject] = React.useState<string>("");

  const { account } = useThreads();

  const { mutate: sendEmail, isPending: isSending } =
    api.account.sendEmail.useMutation();

  const handleSend = async (value: string) => {
    if (!account) return;

    sendEmail(
      {
        accountId: account?.id ?? "",
        from: {
          name: account?.name ?? "",
          address: account?.emailAddress ?? "",
        },
        subject: subject,
        body: value,
        to: toValues.map((to) => ({
          name: to.label || "",
          address: to.value,
        })),
        replyTo: {
          name: account?.name ?? "",
          address: account?.emailAddress ?? "",
        },
        cc: ccValues.map((cc) => ({
          name: cc.value || "",
          address: cc.value,
        })),
        bcc: bccValues.map((bcc) => ({
          name: bcc.value || "",
          address: bcc.value,
        })),
        threadId: undefined,
        attachments: undefined,
      },
      {
        onSuccess: () => {
          toast.success("Email sent successfully");
        },
        onError: (error) => {
          toast.error("Failed to send email");
          console.log("Failed to send email", error);
        },
      },
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <Pencil className="size-4" />
          Compose
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Compose Email</DrawerTitle>
          <EmailEditor
            subject={subject}
            setSubject={setSubject}
            toValues={toValues}
            setToValues={setToValues}
            ccValues={ccValues}
            setCcValues={setCcValues}
            isSending={isSending}
            defaultToolBarExpanded={true}
            to={[]}
            handleSend={handleSend}
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default ComposeButton;
