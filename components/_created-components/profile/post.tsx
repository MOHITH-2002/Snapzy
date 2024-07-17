"use client"
import Image from 'next/image'
import React, { Suspense } from 'react'
import PostLike from '../feeds/PostLike'
import { Comments } from '../feeds/comments'
import More from '../feeds/more'
import Description from '../feeds/description'


const Post = ({userposts,sessions}:any) => {

  
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
      {userposts.map((post: any) => (
        post.img && (
          <div key={post.id} className="flex flex-col gap-4 md:p-8 xl:p-12 border-2 rounded-lg">
            {/* DESC */}
            <div className="flex flex-col gap-4">
              <div className="w-full min-h-96 relative">
                <Image
                  src={post.img || ''}
                  fill
                  className="object-cover rounded-md"
                  alt={post.img || 'default image'}
                />
              </div>
              <div className="flex items-center gap-10">
                <Suspense fallback="Loading...">
                  <PostLike postId={post.id} postlikes = {post.likes} userId={sessions?.user.id}/>
                </Suspense>
                <Suspense fallback="Loading...">
                  <Comments postId={post.id}  sessions={sessions}/>
                </Suspense>
                <More />
              </div>
              <Description desc={post.description} />
            </div>
            {/* INTERACTION */}
          </div>
        )
      ))}
    </div>
  )
}

export default Post
