'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import Image from 'next/image';


import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createStory } from '@/lib/actions/stories';
import { FileState, MultiFileDropzone } from '../create-post/multidropzone';

const Storieslist = ({ stories, userId, sessions }: any) => {

  const [img, setImg] = useState<string>('');
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [buttonloading, setButtonLoading] = useState<boolean>(false);

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleSubmit = async () => {
    const res = await createStory({ userId, image: img });
    setImg('');

  };

  const userHasStory = stories.some((story: any) => story.user.id === userId);

  return (
    <>
      <div className="flex flex-col items-center gap-2 cursor-pointer relative">
        {userHasStory ? (
          <>
            {stories
              .filter((story: any) => story.user.id === userId)
              .map((story: any) => (
                <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image
                        src={story.user.image || "/default.svg"}
                        alt="stories"
                        width={60}
                        height={80}
                        className="w-16 h-16 rounded-full ring-2 object-cover"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] p-0 rounded-sm dark:bg-black">
                      <div className="w-full min-h-96 relative">
                        <Image
                          src={story.img}
                          fill
                          className="object-cover rounded-md"
                          alt={story.img || 'default image'}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                </div>
              ))}
          </>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Image
                src={sessions.user.image || "/default.svg"}
                alt="stories"
                width={60}
                height={80}
                className="w-16 h-16 rounded-full ring-2 object-cover"
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[300px] dark:bg-slate-950">
              <AlertDialogHeader>
                <AlertDialogTitle>Create Story</AlertDialogTitle>
                <div>
                  <MultiFileDropzone
                    value={fileStates}
                    onChange={(files) => {
                      setFileStates(files);
                    }}
                    onFilesAdded={async (addedFiles) => {
                      setFileStates([...fileStates, ...addedFiles]);
                      await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                          try {
                            const res = await edgestore.publicFiles.upload({
                              file: addedFileState.file,
                              onProgressChange: async (progress) => {
                                updateFileProgress(addedFileState.key, progress);
                                if (progress === 100) {
                                  setButtonLoading(true);
                                  await new Promise((resolve) => setTimeout(resolve, 1000));
                                  updateFileProgress(addedFileState.key, 'COMPLETE');
                                }
                              },
                            });
                            setImg(res.url);
                          } catch (err) {
                            updateFileProgress(addedFileState.key, 'ERROR');
                          }
                        }),
                      );
                    }}
                  />
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Discard</AlertDialogCancel>
                {buttonloading ? (
                  <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                ) : (
                  <AlertDialogAction disabled>Continue</AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {userHasStory ?
        <span className="font-medium">view story</span>
        :
        <span className="font-medium">Add story</span>
      }
      </div>

      {stories &&
        stories
          .filter((story: any) => story.user.id !== userId)
          .map((story: any) => (
            <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src={story.user.image || "/default.svg"}
                    alt="stories"
                    width={60}
                    height={80}
                    className="w-16 h-16 rounded-full ring-2 object-cover"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[400px] p-0 rounded-sm dark:bg-black">
                  <div className="w-full min-h-96 relative">
                    <Image
                      src={story.img}
                      fill
                      className="object-cover rounded-md"
                      alt={story.img || 'default image'}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <span className="font-medium">{story.user.name}</span>
            </div>
          ))}
    </>
  );
};

export default Storieslist;
