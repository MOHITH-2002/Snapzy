import Image from 'next/image'
import React, { Suspense } from 'react'
import More from './more'
import { Comments } from './comments'
import PostLike from './PostLike'
import Description from './description'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import Link from 'next/link'

const Feeds = async () => {
  const sessions = await auth();
  const posts = await db.post.findMany({
    select: {
      id: true,
      img: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          slug:true
        }
      },
      comments: true,
      likes: true,
    },
    take: 10, // Fetch only 10 posts
    orderBy: {
      createdAt: 'desc', // Order by creation date, latest first
    },
  });
  

  
  
  
  return (
    <div className="flex flex-col gap-4 md:p-8 xl:p-12 ">
      {posts.map(post => (
        post.img && (
          <div key={post.id} className="flex flex-col gap-4 border-2 p-2 rounded-md">
            {/* USER */}
            <div className="flex items-center justify-between">
              <Link href={`/profile/${post.user.slug}`} className="flex items-center gap-4">
                <Image
                  src={post.user.image || '/default.svg'}
                  width={40}
                  height={40}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{post.user.name}</span>
              </Link>
              <More sessions={sessions} userId={post.user.id} postId={post.id} />
            </div>

            {/* POST */}
            <div className="flex flex-col gap-4">
              <div className="w-full min-h-96 relative">
                <Image
                  src={post.img || ''}
                  fill
                  className="object-cover rounded-md"
                  alt={post.description}
                />
              </div>
              <div className="flex items-center gap-10">
                <Suspense fallback="Loading...">
                  <PostLike postId={post.id} postlikes = {post.likes} userId={sessions?.user.id}/>
                </Suspense>
                <Suspense fallback="Loading...">
                  <Comments postId={post.id}  sessions={sessions}/>
                </Suspense>
              </div>
              <Description desc={post.description} />
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default Feeds
