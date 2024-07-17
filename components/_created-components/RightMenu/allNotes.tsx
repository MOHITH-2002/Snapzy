import { db } from "@/lib/db";
import React, { Suspense } from "react";
import Description from "../feeds/description";
import PostLike from "../feeds/PostLike";
import { Comments } from "../feeds/comments";
import More from "../feeds/more";
import Image from "next/image";
import { auth } from "@/auth";

const AllNotes =async () => {
  const sessions = await auth();
      const userposts = await db.post.findMany({
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
    
        <div className="grid w-full grid-cols-1 dark:bg-zinc-900 rounded-md p-1 gap-2">
          <h1 className="text-muted-foreground">Notes 🗒️</h1>
      {userposts.map((post: any) => (
        post.img === null && (
          <div key={post.id} className="flex flex-col dark:bg-black gap-4 p-3 border-2 rounded-md">
            <div className="flex items-center gap-2" >
                <Image
                  src={post.user.image || '/default.svg'}
                  width={40}
                  height={40}
                  alt={post.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-[#4845D2]">

                {post.user.name}
                </span>
            </div>
            {/* DESC */}
            <div className="flex flex-col gap-4">
              <Description desc={post.description} />
              <div className="flex items-center gap-10">
                <Suspense fallback="Loading...">
                  <PostLike postId={post.id} postlikes = {post.likes} userId={sessions?.user.id}/>
                </Suspense>
                <Suspense fallback="Loading...">
                  <Comments postId={post.id} sessions={sessions}/>
                </Suspense>
                <More sessions={sessions} userId={post.user.id} postId={post.id} />
              </div>
            </div>
            {/* INTERACTION */}
          </div>
        )
      ))}
    </div>
    
  );
};

export default AllNotes;
