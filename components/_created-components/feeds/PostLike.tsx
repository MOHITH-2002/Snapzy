"use client"
import { createlike } from '@/lib/actions/likes'
import { Heart } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import React, { useState, useEffect } from 'react'
import { FcLike } from 'react-icons/fc'

const PostLike = ({ postId, postlikes, userId }: any) => {
  if (!userId) return null;

  // Check if the user has already liked the post
  const initialLikeState = postlikes.some((like: any) => like.userId === userId);
  const [like, setLike] = useState<boolean>(initialLikeState);
  const [likesCount, setLikesCount] = useState<number>(postlikes.length);

  const handleLike = async () => {
    const res = await createlike({ userId, postId });
    if (res) {
      setLike(!like);
      setLikesCount(like ? likesCount - 1 : likesCount + 1);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <span className="cursor-pointer" onClick={handleLike}>
        {like ? <FcLike size={24} /> : <Heart />}
      </span>
      {likesCount} likes
    </div>
  )
}

export default PostLike
