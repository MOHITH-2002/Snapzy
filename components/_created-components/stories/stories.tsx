import React from 'react'
import Storieslist from './storieslist'
import { db } from '@/lib/db';
import { auth } from '@/auth';

const Stories = async() => {
  const sessions = await auth()
    if(!sessions) return null;
    const stories = await db.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      
    },
    include: {
      user: true,
    },
  });

  
    return (
    <div className="p-2 dark:bg-zinc-900 rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
        <div className="flex gap-4 w-max">
        <Storieslist stories={stories} userId={sessions?.user.id}sessions={sessions}/>
        
      </div>
        </div>
    
    )
}

export default Stories
