
import React, { Suspense } from 'react'
import Nopost from '@/components/no-post'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Toggle from './toggle'
interface UserpostsProps {
  username: string;
}

const Userposts = async ({username}:UserpostsProps) => {
  const session = await auth()
  if (!session) {
    return redirect("/auth/login")
  }
    let userposts:any[] =[];
  if(username){

    userposts = await db.post.findMany({
      where: {
        user:{
          
          slug: username,
        }
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  
    
  if (!userposts) {
    return <Nopost />
  }


  return (
    <Toggle userposts={userposts} sessions={session} />
  )
}

export default Userposts
