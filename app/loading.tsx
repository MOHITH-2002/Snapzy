"use client"

import Loader from '@/components/loading'
import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
    <Image src="/loader.svg" height={50} width={50}  alt="error" />
    </div>
  )
}

export default Loading