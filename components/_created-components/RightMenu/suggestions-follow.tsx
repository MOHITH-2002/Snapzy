"use client"
import { Button } from '@/components/ui/button'

import { following, followrequest } from '@/lib/actions/follows'


import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const SuggestionsFollow = ({user, sessions}: any) => {
  const [isFollowingSent, setisFollowingSent] = useState<Boolean>(false);

  const router = useRouter()
    
  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await following({
          senderId: sessions.user.id,
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
  }, [user, sessions]);


  const followRequest = async () => {
    try {
      const res = await followrequest({
        senderId: sessions.user.id,
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
    <div className=" flex gap-1">

            {isFollowingSent ? (
              <Button size="sm" variant="secondary">Following</Button>
              ) : (
                <>
                  <Button size="sm" variant="secondary" onClick={followRequest}>Follow</Button>
                </>
              )}

    </div>
  )
}

export default SuggestionsFollow
