"use client"
import React from 'react'
import { Action, KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar'
import RenderResults from './render-results'
import { useLocalStorage } from 'usehooks-ts'
import { useThemeSwitching } from './use-theme-switching'
import { useAccountsSwitching } from './use-accounts-switching'

export default function Kbar({children} : {children: React.ReactNode}) {

    const [tab , setTab] = useLocalStorage('sidebar-tab' , 'inbox');
    const [done , setDone] = useLocalStorage('emails-reading-done' , false);

    const actions: Action[] = [
        {
            id: 'inboxAction',
            name: "Inbox",
            shortcut: ['g' , 'i'],
            section: 'Navigation',
            subtitle: 'View your inbox',
            perform: () => {
                setTab('inbox')
            }
        },
        {
            id: 'draftAction',
            name: "Draft",
            shortcut: ['g' , 'd'],
            section: 'Navigation',
            subtitle: 'View your draft',
            perform: () => {
                setTab('draft')
            }
        },
        {
            id : 'sentAction',
            name : 'Sent',
            shortcut : ['g' , 's'],
            section : 'Navigation',
            subtitle : 'View your sent emails',
            perform : () => {
                setTab('sent')
            }
        },
        {
            id : 'pendingAction',
            name : 'See Pending',
            shortcut : ['g' , 'u'],
            section : 'Navigation',
            subtitle : 'View your uread emails',
            perform : () => {
                setDone(false)
            }
        },
        {
            id : 'unreadAction',
            name : 'See done',
            shortcut : ['g' , 'r'],
            section : 'Navigation',
            subtitle : 'View your read emails',
            perform : () => {
                setDone(true)
            }
        }
    ]

    return <KBarProvider actions={actions}>
        <ActuvalComponent>
            {children}
        </ActuvalComponent>
    </KBarProvider>
}

const ActuvalComponent = ({children} : {children: React.ReactNode}) => {

    useThemeSwitching();
    useAccountsSwitching();
    return <>
    <KBarPortal>
        <KBarPositioner className='fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm scrollbar-hide !p-0 z-[999]'>
            <KBarAnimator className='max-w-[600px] !mt-64 w-full bg-white dark:bg-gray-800 text-foreground dark:text-gray-200 shadow-lg border dark:border-gray-700 rounded-lg overflow-hidden relative !-translate-y-12'>
               <div className='bg-white dark:bg-gray-800'>
                <div className="border-x-0 border-b-2 dark:border-gray-700">
                 <KBarSearch className='py-4 px-6 text-lg w-full bg-white dark:bg-gray-800 outline-none border-none focus:outline-none focus:ring-0 focus:ring-offset-0' />
                </div>
                <RenderResults/>
               </div>
            </KBarAnimator>
        </KBarPositioner>
    </KBarPortal>
    {children}
    </>
}