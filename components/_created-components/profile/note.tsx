import Image from 'next/image'
import React, { Suspense } from 'react'
import PostLike from '../feeds/PostLike'
import { Comments } from '../feeds/comments'
import More from '../feeds/more'
import Description from '../feeds/description'

const Note = ({ sessions,userposts }: any) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {userposts.map((post: any) => (
        post.img === null && (
          <div key={post.id} className="flex flex-col gap-4 p-4 md:p-8 border-2 rounded-md">
            {/* DESC */}
            <div className="flex flex-col gap-4">
              <Description desc={post.description} />
              <div className="flex items-center gap-10">
                <Suspense fallback="Loading...">
                  <PostLike />
                </Suspense>
                <Suspense fallback="Loading...">
                  <Comments />
                </Suspense>
                <More sessions={sessions} userId={post.id}/>
              </div>
            </div>
            {/* INTERACTION */}
          </div>
        )
      ))}
    </div>
  )
}

export default Note
