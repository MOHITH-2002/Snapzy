import Link from 'next/link';
import React from 'react'
import { IoNotifications } from "react-icons/io5";

const Notification = () => {
  return (
    <Link href="/" className='flex h-8 items-center px-1 rounded-sm hover:bg-primary-foreground' >
    <IoNotifications  size={22} className='' />
    </Link>
  )
}

export default Notification
