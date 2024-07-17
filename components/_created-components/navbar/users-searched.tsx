import { useState, useEffect } from 'react';
import { searchuser } from '@/lib/actions/users';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  image: string | null;
  name: string;
  id: string;
  slug: string | null;
}

interface InputProps {
  inputvalue: string;
}

const UserSearched: React.FC<InputProps> = ({ inputvalue }: InputProps) => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputvalue) {
          const users = await searchuser({ inputvalue });
          setUserData(users);
        
        }
      } catch (error) {
        console.error('Error searching user:', error);
        // Handle error state or display error message
      }
    };

    fetchData();
  }, [inputvalue]);



    return (
        <>
      {userData.map((user) => (
      <Link href={`/profile/${user.slug}`} key={user.id} className="flex gap-4 items-center dark:hover:bg-zinc-900 p-2 rounded-md">
              <Image
                src={user?.image || "/default.svg"}
                width={40}
                height={40}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex ">
                <span className="font-medium">{user?.name}</span>
              </div>
            </Link>
      ))} 
      </>

  );
};

export default UserSearched;
