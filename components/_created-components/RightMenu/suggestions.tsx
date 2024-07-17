import { auth } from '@/auth'

import { db } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SuggestionsFollow from './suggestions-follow'

const Suggestions = async () => {
  const sessions = await auth()
  
  if(!sessions) return null;
  const suggestions = await db.user.findMany({
    where: {
      id: {
        not: sessions.user.id,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      slug: true,
      followers:true,
      followings:true,
    },
    take: 10,
  });


  
  return (
    <div>
      <div className="flex flex-col p-2 dark:bg-zinc-900 rounded-md gap-2 shadow-md">
    <div className="flex justify-between text-muted-foreground">
        <span>Suggested for you</span>
        <Link href="/" className="text-blue-500 hover:underline">see all</Link>
    </div>
    { suggestions && suggestions.map((suggestion) =>(

      
      <Link href={`/profile/${suggestion.slug}`} className="flex justify-between" key={suggestion.id}>

    <div className="flex items-center gap-2">
          <Image
            src={suggestion.image || '/default.svg'}
            width={36}
            height={36}
            alt=""
            className="w-9 h-9 rounded-full"
            />
        <span className="font-medium">
            {suggestion.name}
            </span>
            </div>

        <SuggestionsFollow  user={suggestion} sessions={sessions}/>
        </Link>
        ))
          }
    
    </div>
    </div>
  )
}

export default Suggestions
