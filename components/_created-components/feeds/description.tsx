"use client"
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
interface descprops{
  desc?:String
}
const Description = ({desc}:descprops) => {
    const [open,setOpen] = useState<boolean>(false);

  
  return (
    
     <div className="flex w-full  gap-3">

        <p className={cn( !open && 'truncate w-[90%]')} >{desc}</p>
        {open === false && <p className='text-blue-400 underline cursor-pointer' onClick={()=>setOpen(!open)}>more</p>}
      </div>
    
  )
}

export default Description
