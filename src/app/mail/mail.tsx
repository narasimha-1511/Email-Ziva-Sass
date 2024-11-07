"use client"
import React from 'react'
import { ResizableHandle , ResizablePanel , ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountSwitcher from '@/app/mail/components/account-switcher';
import Sidebar from '@/app/mail/components/sidebar';
import ThreadList from './thread-list';
import ThreadDisplay from './thread-display';

type Props = {
    defaultLayout: number[] | undefined
    navCollapsedSize: number
    defaultCollaped: boolean
}

const Mail = ({ defaultLayout = [20 , 32 , 48] , navCollapsedSize , defaultCollaped} : Props ) => {

    const [isCollapsed , setIsCollapsed] = React.useState(defaultCollaped)

  return (
    <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
        className='items-stretch h-full min-h-screen' 
        direction='horizontal' 
        onLayout={(sizes: number[]) => console.log(sizes)}
        >
            <ResizablePanel 
            defaultSize={defaultLayout[0]} 
            className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
            collapsible={true}
            collapsedSize={navCollapsedSize}
            onCollapse={() => setIsCollapsed(true)}
            minSize={15}
            maxSize={40}
            onResize={() => {
                setIsCollapsed(false)
            }}>
                <div className='flex flex-col h-full flex-1'>
                    <div className={cn('flex h-[52px] items-center justify-between px-4', 
                        isCollapsed ? 'h-[52px]' : 'px-2'
                    )}>
                        {/* Account Switcher */}
                        <AccountSwitcher isCollapsed={isCollapsed} />
                    </div>
                    <Separator />

                    {/* Sidebar */}
                    <Sidebar isCollapsed={isCollapsed} />

                    <div className='flex-1'>
                    </div>
                    {/*AI  */}
                    ask AI
                </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue='inbox'>
                    <div className='flex items-center px-4 py-2'>
                        <h1 className='text-xl font-bold'> Inbox</h1>
                        <TabsList className='ml-auto text-zinc-600 dark:text-zinc-200'>
                            <TabsTrigger value='inbox'>Inbox</TabsTrigger>
                            <TabsTrigger value='unread'>unread</TabsTrigger>
                        </TabsList>
                    </div>

                    <Separator />

                    {/* Search Bar */}
                    SearchBar

                    <TabsContent value='inbox'>
                        {/* Inbox Content */}
                        <ThreadList />   
                    </TabsContent>

                    <TabsContent value='unread'>
                        {/* Archive Content */} 
                        Unread Content
                    </TabsContent>

                </Tabs>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
                {/* Thread */}
                <ThreadDisplay />
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default Mail