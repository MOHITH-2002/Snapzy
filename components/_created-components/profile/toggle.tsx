"use client"
import Nopost from '@/components/no-post'
import React, { useState } from 'react'
import Note from './note'
import Post from './post'

const Toggle = ({userposts,sessions}:any) => {
      const [showPost, setShowPost] = useState<boolean>(true)  

  return (
    <>
      {userposts.length === 0 ? (
        <>
      <span className="font-bold text-2xl dark:text-emerald-200 text-emerald-600">posts</span>
        <Nopost />
        </>
      ) : (
        <>
        <div className="flex gap-10 cursor-pointer">

        <span className="font-bold text-2xl dark:text-emerald-200 text-emerald-600" onClick={()=>setShowPost(true)}>posts</span>
        <span className="font-bold text-2xl dark:text-emerald-200 text-emerald-600" onClick={()=>setShowPost(false)}>Note</span>
        </div>
        <>
        {
            showPost === true &&
        <Post userposts={userposts} sessions={sessions}/>
        }
        {
            showPost === false &&
            <Note sessions={sessions} userposts={userposts}/>
        }
        </>
        </>
      )}
    </>
  )
}

export default Toggle
