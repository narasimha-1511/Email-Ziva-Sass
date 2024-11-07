import ThemeToggle from '@/components/theme-toggle';
import dynamic from 'next/dynamic'
import React from 'react'

const Mail = dynamic(() => {
  return import('./mail')
} , { ssr : false});  

const page = () => {
  return (
    <>
    <div className="absolute bottom-4 left-4">
      <ThemeToggle />
    </div>
    <Mail
    defaultCollaped={false}
    navCollapsedSize={4}
    defaultLayout={[20 , 32 , 48]}
    />
   </>
  )
}

export default page