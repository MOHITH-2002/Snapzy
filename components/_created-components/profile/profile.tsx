import Image from 'next/image';
import React from 'react';
import Menu from './menu';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';

import { db } from '@/lib/db';

interface ProfileProps {
  username: string;
}

const Profile = async ({ username }: ProfileProps) => {
  const session = await auth();
  if (!session) {
    return redirect('/auth/login');
  }

  const user = await db.user.findFirst({
    where: {
      slug: username,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      website:true,
      bio:true,
      _count: {
        select: {
          followings: true,
          followers: true,
          posts: true,
        },
      },
    },
  });



  if (!user) {
    return notFound();
  }
  let isBlocked = false;
  if(session){
    const res = await db.block.findFirst({
      where:{
        blockerId:user.id,
        blockedId:session.user.id,
      }
    })
    if(res) isBlocked = true;
  }
  if(isBlocked === true){
    return notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-3 md:min-h-[200px] w-full border-2 md:border-none rounded-xl">
      <div className="flex items-center justify-center">
        <Image
          src={user.image || '/default.svg'}
          alt="profile"
          width={160}
          height={160}
          className="w-24 h-24 md:w-[160px] md:h-[160px] rounded-full object-cover"
        />
      </div>
      <Menu user={user} session={session} />
    </div>
  );
};

export default Profile;
