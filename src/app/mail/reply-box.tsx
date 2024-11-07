'use client'
import React from 'react'
import EmailEditor from './email-editor'
import { api, RouterOutputs } from '@/trpc/react'
import useThreads from '@/hooks/use-threads'

const ReplyBox = () => {

  const { accountId , threadId } = useThreads();

  const { data : replyDetails } = api.account.getReplyDetails.useQuery({accountId , threadId: threadId ?? ''});

  if(!replyDetails) return null;

  return (
    <Component
    replyDetails={replyDetails}
    />  
  )
}


const Component = ({ replyDetails } : { replyDetails: RouterOutputs['account']['getReplyDetails']}) => {

  const { accountId , threadId } = useThreads();
  const [subject , setSubject] = React.useState<string>(replyDetails?.subject.startsWith("Re:") ? replyDetails.subject : `Re : ${replyDetails.subject}` ?? "");
  const [toValues , setToValues] = React.useState<{label:string , value:string}[]>(replyDetails.to.map(to => ({
    label: to.address,
    value: to.address
  })));
  const [ccValues , setCcValues] = React.useState<{label:string , value:string}[]>(replyDetails.cc.map(cc => ({
    label: cc.address,
    value: cc.address
  })));
  const [isSending , setIsSending] = React.useState<boolean>(false);

  React.useEffect(() => {

    if(!threadId || !replyDetails){
      return;
    }

    if(!replyDetails.subject.startsWith("Re:")){
      setSubject(`Re: ${replyDetails.subject}`)
    }

    setToValues(replyDetails.to.map(to => ({
      label: to.address,
      value: to.address
    })));

    setCcValues(replyDetails.cc.map(cc => ({
      label: cc.address,
      value: cc.address
    })));


  },[threadId , replyDetails])

  const handleSend = () => {
    try {
      
    } catch (error) {
     throw  new Error("Failed to send email");
    }
  }

  return (
    <EmailEditor 
    subject={subject}
    setSubject={setSubject}

    toValues={toValues}
    setToValues={setToValues}
    
    ccValues={ccValues}
    setCcValues={setCcValues}
    
    to={replyDetails.to.map(to => to.address)}
    handleSend={handleSend}
    isSending={isSending}

    />
  )
}

export default ReplyBox