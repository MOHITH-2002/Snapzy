"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { fetchcomments } from '@/lib/actions/comments';
import CreateComment from './create-comment';

interface Comment {
  id: string;
  createdAt: Date;
  desc: string;
  userId: string;
  postId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

export const Comments = ({ postId, sessions }: any) => {

  
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = async () => {
    const commentsData: Comment[] = (await fetchcomments({ postId })) || [];
    setComments(commentsData);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const addCommentToState = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon"><MessageCircleMore /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[425px] md:max-w-[700px] dark:bg-zinc-950 rounded-md">
        <DialogHeader>
          <DialogTitle>{sessions?.user?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 max-h-96 md:max-h-80 overflow-y-auto scrollbar-hide py-4">
          {comments && comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Image
                src={comment?.user?.image || "/default.svg"}
                width={40}
                height={40}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-medium">{comment?.user?.name}</span>
                <span className="font-medium">{comment?.desc}</span>
                <span className="text-blue-500 hover:underline cursor-pointer">Reply</span>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <CreateComment userId={sessions?.user.id} postId={postId} addCommentToState={addCommentToState} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
