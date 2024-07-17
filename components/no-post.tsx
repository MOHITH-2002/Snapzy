import Image from 'next/image'
import React from 'react'

const Nopost = () => {
  return (
    <div className="flex flex-col gap-5 w-full min-h-96 items-center justify-center">
    <Image src="/post.svg" alt="post" width={400} height={500}  />
    <h1  className="text-3xl text-blue-500">No Post</h1>
    </div>
  )
}

export default Nopost
