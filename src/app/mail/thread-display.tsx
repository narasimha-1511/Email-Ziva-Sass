"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useThreads from '@/hooks/use-threads';
import { Archive, ArchiveIcon, ArchiveX, Clock, MoreVertical, Trash2 } from 'lucide-react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import EmailDisplay from "./email-display";
import ReplyBox from "./reply-box";

const ThreadDisplay = () => {

    const { threadId , threads } = useThreads();
    const thread = threads?.find(e => e.id === threadId);
    const [isReplyBoxVisible, setReplyBoxVisible] = React.useState(false);

    const toggleReplyBox = () => {
        setReplyBoxVisible(!isReplyBoxVisible);
    };

    return (
        <div className='flex flex-col h-full'>
            {/* Buttons Row */}
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2">
                    <Button variant={`ghost`} size={'icon'} disabled={!thread} >
                        <Archive className='size-4' />
                    </Button>
                    <Button variant={`ghost`} size={'icon'} disabled={!thread} >
                        <ArchiveX className='size-4' />
                    </Button>
                    <Button variant={`ghost`} size={'icon'} disabled={!thread} >
                        <Trash2 className='size-4' />
                    </Button>
                </div>
                
                <Separator orientation='vertical' className='h-full' />
                
                <Button className='ml-2' variant={`ghost`} size={'icon'} disabled={!thread} >
                    <Clock className='size-4' />
                </Button>
                
                <div className='ml-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="ml-2" variant={`ghost`} size={'icon'} disabled={!thread}>
                                <MoreVertical className='size-4'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                            <DropdownMenuItem>Start Thread</DropdownMenuItem>
                            <DropdownMenuItem>Add label</DropdownMenuItem>
                            <DropdownMenuItem>Mute Thread</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Separator />

            {thread ? 
                <>
                    <div className="flex flex-col flex-1 relative">
                        <div className="flex items-center p-4">
                            <div className="flex items-center gap-4 text-sm">
                                <Avatar>
                                    <AvatarImage alt="avatar" />
                                    <AvatarFallback>
                                        {thread.emails[0]?.from?.name?.split(' ').map((name) => name[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1"> 
                                    <div className="font-semibold">
                                        {thread.emails[0]?.from?.name}
                                    </div>
                                    <div className="text-xs line-clamp-1">
                                        {thread.emails[0]?.subject}
                                    </div>
                                    <div className="text-xs line-clamp-1">
                                        <span className="font-medium mr-1">
                                            Reply-To:
                                        </span>
                                        {thread.emails[0]?.from?.address}
                                    </div>
                                </div>
                            </div>

                            {thread.emails[0]?.sentAt && (
                                <div className="ml-auto text-xs text-muted-foreground">
                                    {format(thread.emails[0]?.sentAt ?? new Date() , "PPpp")}
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div className="max-h-[calc(100vh-380px)] h-fit overflow-y-scroll custom-scrollbar flex flex-col">
                            <div className="p-6 flex flex-col gap-4">
                                {thread.emails.map(email => {
                                    return <EmailDisplay key={email.id} email={email} />
                                })}
                            </div>
                        </div>
                        
                        <Separator className="mt-auto" />

                        {/* Toggle Reply Box Button */}
                        {/* <div className="absolute bottom-0 w-full p-2">
                            <Button onClick={toggleReplyBox} variant="ghost" size="sm">
                                {isReplyBoxVisible ? "Hide Reply Box" : "Show Reply Box"}
                            </Button>
                        </div> */}

                        {/* Reply Box */}
                        {/* {isReplyBoxVisible && ( */}
                            <div className="absolute bottom-0 w-full">
                                <ReplyBox />
                            </div>
                        {/* )} */}
                    </div>
                </>
                : 
                <>
                <div className="p-8 text-center text-muted-foreground">
                    No Message Selected
                </div>
                </>
            }
        </div>
    )
}

export default ThreadDisplay