"use client"
import { Button } from '@/components/ui/button'
import { blocktheuser } from '@/lib/actions/block'
import { following, followrequest } from '@/lib/actions/follows'


import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { EditForm } from './editform'
import Link from 'next/link'

const Menu = ({user, session}: any) => {
  const [isFollowingSent, setisFollowingSent] = useState<Boolean>(false);

  const router = useRouter()

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await following({
          senderId: session.user.id,
          receiverId: user.id
        });

        if (response !== null) {
          setisFollowingSent(true);
        }

      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();
  }, [user, session]);

  const handleBlocked = async () => {
    const res = await blocktheuser({
      blockerId: user.id,
      blockedId: session.user.id
    });

    if (res.success) {
      return router.push("/");
    }
  }

  const followRequest = async () => {
    try {
      const res = await followrequest({
        senderId: session.user.id,
        receiverId: user.id
      });

      if (res.success) {
        setisFollowingSent(true);
      }
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center md:items-start">
      <div className="flex gap-5 items-center">
        <span className="text-2xl ">{user.name}</span>
        {
          session.user.id === user.id ? (
            <>
              <EditForm userId={session.user.id}/>
            </>
          ) : (
            <>
              {isFollowingSent ? (
                <Button size="sm" variant="secondary">Following</Button>
              ) : (
                <>
                  <Button size="sm" variant="secondary" onClick={followRequest}>Follow</Button>
                </>
              )}
              <Button size="sm" variant="destructive" onClick={handleBlocked}>Block</Button>
            </>
          )
        }
      </div>
      <div className='flex flex-col'>
        {
          user.bio && 
          <span>{user?.bio}</span>
        }{
          user.website && 
          <Link href={user.bio} className='text-blue-500 hover:underline'>{user.website}</Link>
        }
      </div>
      <div className="flex gap-5">
        <span> {user._count.posts} posts</span>
        <span> {user._count.followRequestsReceived} followers</span>
        <span> {user._count.followRequestsSent} following</span>
      </div>
    </div>
  )
}

export default Menu
