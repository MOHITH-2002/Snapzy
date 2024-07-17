
import React from 'react'
import { Createform } from './createform'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';


const Create = async() => {
  const sessions = await auth();

  if(!sessions) {
    redirect("/auth/login")
  }
  return (
    <div className="flex w-full min-h-screen items-center justify-center">

      <Createform sessions={sessions?.user.id}/>
    </div>
  )
}

export default Create
