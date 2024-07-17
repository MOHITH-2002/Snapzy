"use client"
import React, { useState } from 'react'
import { IconPicker } from './emoji'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createNote } from '@/lib/actions/post'
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface CreateNoteProps {
  placeholder: string
  session:any
}

const CreateNote = ({ placeholder,session }: CreateNoteProps) => {
  const router = useRouter()


  

  const [inputValue, setInputValue] = useState('');

  const onIconSelect = (icon: string) => {
    setInputValue((prevValue) => prevValue + icon);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if(!session){
      return router.push('/auth/login') 
    }
    
    
    const res = await createNote({userId:session.user.id,desc:inputValue}) 
    if(res?.success){
      toast.success(res.success,{
  className:"bg-green-400",

});
setInputValue('');
    }else if(res?.error){
      toast.error(res.error,{
  className:"bg-red-600",

});
    }
    return;
  };

  return (
    <>
      <div className="flex w-[85%] items-center relative">
        <Input 
          placeholder={placeholder} 
          className="flex w-full pr-14 focus:none" 
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex absolute right-3">
          <IconPicker onChange={onIconSelect} />
        </div>
      </div>
      
        {
          inputValue && inputValue!== '' ? 
          <Button  onClick={handleSubmit}>Post</Button> : 
      <Button disabled >Post</Button>
        }
      
    </>
  )
}

export default CreateNote
