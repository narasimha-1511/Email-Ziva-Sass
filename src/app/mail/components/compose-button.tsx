"use client"
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import EmailEditor from '../email-editor';

const ComposeButton = () => {

    const [toValues, setToValues] = React.useState<{label: string, value: string}[]>([]);
    const [ccValues, setCcValues] = React.useState<{label: string, value: string}[]>([]);

    const [subject, setSubject] = React.useState<string>("");   

    const [isSending, setIsSending] = React.useState<boolean>(false);

    const handleSend = async (value: string) => {
        setIsSending(true);
        console.log(value);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsSending(false);
    }


  return (
    <Drawer>
    <DrawerTrigger asChild>
        <Button>
            <Pencil className='size-4'/>
            Compose
        </Button>
    </DrawerTrigger>
    <DrawerContent className=''>
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
  )
}

export default ComposeButton