"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createComment } from '@/lib/actions/comments';
import { IconPicker } from '../addPost/emoji';

interface CreateCommentProps {
  userId: string;
  postId: string;
  addCommentToState: (comment: any) => void;
}

const CreateComment = ({ userId, postId, addCommentToState }: CreateCommentProps) => {
  const [inputValue, setInputValue] = useState('');

  const onIconSelect = (icon: string) => {
    setInputValue((prevValue) => prevValue + icon);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await createComment({ userId, postId, comment: inputValue });
    if (res) {
      addCommentToState(res); // Add the new comment to the parent component's state
      setInputValue('');
    }
  };

  return (
    <>
      <div className="flex w-[85%] items-center relative">
        <Input
          placeholder="Add comment"
          className="flex w-full pr-14 focus:none"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex absolute right-3">
          <IconPicker onChange={onIconSelect} />
        </div>
      </div>
      {inputValue && inputValue !== '' ? (
        <Button onClick={handleSubmit}>Post</Button>
      ) : (
        <Button disabled>Post</Button>
      )}
    </>
  );
};

export default CreateComment;