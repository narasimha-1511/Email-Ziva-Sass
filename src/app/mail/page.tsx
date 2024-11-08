import ThemeToggle from '@/components/theme-toggle';

import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic'
import React from 'react'
import ComposeButton from './components/compose-button';

const Mail = dynamic(() => {
  return import('./mail')
} , { ssr : false});  

const page = () => {
  return (
    <div>
    <div className="absolute flex bottom-4 left-4 gap-2 items-center">
      <UserButton />
      <ThemeToggle />
      <ComposeButton />
    </div>
    <Mail
    defaultCollaped={false}
    navCollapsedSize={4}
    defaultLayout={[20 , 32 , 48]}
    />
   </div>
  )
}

export default page