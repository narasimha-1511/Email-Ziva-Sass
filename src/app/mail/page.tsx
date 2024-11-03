import dynamic from 'next/dynamic'
import React from 'react'

const Mail = dynamic(() => {
  return import('./mail')
} , { ssr : false});  

const page = () => {
  return (
   <Mail
   defaultCollaped={false}
   navCollapsedSize={4}
   defaultLayout={[20 , 32 , 48]}
    />
  )
}

export default page