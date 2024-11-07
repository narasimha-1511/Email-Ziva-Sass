'use client'
import React from 'react'
import { EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Text } from "@tiptap/extension-text"
import EditorMenuBar from './editor-menubar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TagInput from './components/tag-input'
import { Input } from '@/components/ui/input'
import AIComposeButton from './components/ai-compose-button'

type Props = {
    subject: string
    setSubject: (subject: string) => void

    toValues: {label:string , value:string}[]
    setToValues: (value: {label:string , value:string}[]) => void

    ccValues: {label:string , value:string}[]
    setCcValues: (value: {label:string , value:string}[]) => void

    to: string[]

    handleSend:  (value: string) => void 
    isSending: boolean

    defaultToolBarExpanded?: boolean
}

const EmailEditor = ({ subject, setSubject, toValues, setToValues, ccValues, setCcValues, to, handleSend, isSending, defaultToolBarExpanded  }: Props) => {

    const [value , setValue] = React.useState<string>('')
    const [expanded , setExpanded] = React.useState<boolean>(defaultToolBarExpanded || false)

    const CustomText = Text.extend({
        addKeyboardShortcuts() {
            return{
                'Control-j': () => {
                    console.log('Control-j pressed');
                    // Add your custom logic here
                    return true; // Prevent default behavior
                },
                'Meta-j': () => {
                    console.log('Meta-j pressed');
                    // Add your custom logic here
                    return true; // Prevent default behavior
                },
            }
        },
    })

    const editor = useEditor({
        autofocus: false,
        extensions: [StarterKit , CustomText],
        onUpdate: ({editor}) => {
            setValue(editor?.getHTML() || '')
        }
    });

    if(!editor){
        console.log('editor not found in email-editor.tsx');
        return null;
    }

    const onGenerate = (chunk: string) => {
        editor?.commands?.insertContent(chunk);
    }

    return (
    <div>

        <div className='flex p-4 py-2 border-b'>
            <EditorMenuBar editor={editor} />
        </div>

        <div className='p-4 pb-0 space-y-1'>
            {expanded && (
                <>
                   <TagInput 
                   placeholder='Add Reciepients'
                   label='To'
                   onChange={setToValues}
                   value={toValues}
                   />
                   <TagInput 
                   placeholder='Add Reciepients'
                   label='Cc'
                   onChange={setCcValues}
                   value={ccValues}
                   />
                   <Input
                   id='subject'
                   placeholder='Subject'
                   value={subject}
                   onChange={(e) => setSubject(e.target.value)}
                   />
                </>
            )}
            <div className='flex items-center gap-2'>
                <div className='cursor-pointer' onClick={() => setExpanded(!expanded)}>
                    <span className='text-green-600 font-medium '>
                        Draft {" "}
                    </span>
                    <span>
                        to {to.join(", ")}
                    </span>
                </div>
                <AIComposeButton isComposing={defaultToolBarExpanded || false} onGenerate={onGenerate}/>
            </div>
        </div>
        
        <div className='prose w-full px-4 '>
            <EditorContent 
            className='dark:text-gray-100'
            editor={editor}
            value={value}/>
        </div>

        <Separator />

        <div className='py-3 px-4 flex items-center justify-between'>
            <span className='text-sm'>
                Tip: Press {" "}
                <kbd className='px-2 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg '>
                    Ctrl/Cmd + J
                </kbd> {" "}
                for AI autocomplete
            </span>
            <Button onClick={async () =>{
                editor.commands.clearContent()
                await handleSend(value)
            } 
            } disabled={isSending}>
                {isSending ? 'Sending...' : 'Send'}
            </Button>
        </div>
    </div>
  )
}

export default EmailEditor