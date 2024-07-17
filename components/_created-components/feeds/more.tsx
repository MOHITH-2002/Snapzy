"use client"
import { Delete, Ellipsis, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deletePost } from '@/lib/actions/post'
import { redirect } from 'next/navigation'
const More = ({sessions,userId,postId}:any) => {

  const handleDelete = async()=>{
    const res = await deletePost({postId});
    if(res){
      location.reload();
    }
  }
  return (
    <>
    { sessions?.user?.id === userId &&
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">

        <Ellipsis/>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-zinc-950 w-[300px]">
        <DialogHeader>
          <DialogClose asChild>
          <Button onClick={handleDelete}>
          <Trash2 />
          Delete Post
          </Button>
          </DialogClose>
        </DialogHeader>
        
        
      </DialogContent>
    </Dialog>
    }
    </>
  )
}

export default More
