import React from 'react'
import { FaFacebookMessenger } from "react-icons/fa6";

import Link from 'next/link';


const MessageNotification = () => {
  return (
    <Link href="/" className='flex h-8 items-center px-1 rounded-sm hover:bg-primary-foreground' >


    <FaFacebookMessenger size={22} className='' />
    </Link>
    

  )
}

export default MessageNotification
