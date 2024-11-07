import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { generateEmail } from "@/app/mail/server-actions/ai-generate-action"
import { readStreamableValue } from 'ai/rsc';
import useThreads from '@/hooks/use-threads';
import { turndown } from '@/lib/turndown';
  

type Props = {
    isComposing: boolean;
    onGenerate: (token: string) => void;
}


const AIComposeButton = ({isComposing , onGenerate}: Props) => {

    const [isOpen , setIsOpen] = React.useState<boolean>(false)
    const [prompt , setPrompt] = React.useState<string>('');
    const { threads , threadId , account} = useThreads();
    const thread = threads?.find((thread) => thread.id === threadId);


    const aiGenerate = async () => {
        let contextOfEmail = '';

        if(!isComposing){
            for(const email of thread?.emails || []){
                const content = `
                Subject: ${email.subject}
                From: ${email.from.address}
                SentAt: ${new Date(email.sentAt).toLocaleString()}
                Body: ${turndown.turndown(email.body ?? email.bodySnippet ?? '')}
                `;
                contextOfEmail += content;
            }
        }
        contextOfEmail += `My name is ${account?.name} and my email is ${account?.emailAddress}`;

        const { output } = await generateEmail(contextOfEmail, prompt)
        for await (const chunk of readStreamableValue(output)){
            if(chunk) {
                // console.log(chunk);
                onGenerate(chunk);
            }
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger >
            <Button size={'icon'} variant={'outline'} onClick={() => setIsOpen(true)} >
                <Bot className='size-4' />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>AI Smart Compose</DialogTitle>
                <DialogDescription>
                    AI will help you compose your email
                </DialogDescription>
                <div className="h-2"></div>
                <Textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter your prompt here'
                />
                <div className="h-2"></div>
                <Button onClick={() => {
                    setIsOpen(false);
                    setPrompt('');
                    aiGenerate();
                }}>
                    Generate Email
                </Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default AIComposeButton