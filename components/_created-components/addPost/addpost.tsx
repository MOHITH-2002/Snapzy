
import Image from 'next/image'
import React from 'react'
import CreateNote from './createNote'
import { auth, signOut } from "@/auth";
const Addpost = async() => {
    const session = await auth();
    

  return (
      <div className="flex w-full gap-2 items-center p-2 dark:bg-zinc-900 rounded-lg shadow-md">
    
    
    <Image
                src={ session?.user.image || "./default.svg"}
                alt="stories"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full ring-2 object-cover"
            />
    
    <CreateNote placeholder={"Create a note..."} session={session}/>
    
        
    
    </div>
    
  )
}

export default Addpost
