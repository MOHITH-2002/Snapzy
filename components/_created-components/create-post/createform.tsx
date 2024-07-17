"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IconPicker } from "../addPost/emoji"

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { useState } from "react"
import { FileState, MultiFileDropzone } from "./multidropzone"
import { useEdgeStore } from "@/lib/edgestore"
import { createpost } from "@/lib/actions/post"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  
})
interface propscreateform{
  sessions: string
}
export function Createform({sessions}:propscreateform) {
   const router = useRouter()

  const [image,setImage] = useState<string>('');
  const [buttonloading,setButtonLoading] = useState<boolean>(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

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



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      
    },
  })

  
  
  const onSubmit = async (values: z.infer<typeof formSchema>)=> {

    const res = await createpost({userId:sessions, desc:values.description, img:image})
    if(res){
      router.push("/")
    }
    
  }

  function handleIconSelect(icon: string) {
    const currentDescription = form.getValues("description")
    form.setValue("description", currentDescription + icon)
  }

  return (
    <Card className="flex  flex-col items-center w-[400px] h-min shadow-md dark:bg-gray-950">
      <CardHeader className="text-3xl font-semibold text-[#A5B4FC]">
        Create post
      </CardHeader>
      <CardContent>
      
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div className="flex w-full items-center relative">

                <Input placeholder="Enter description or select an icon" {...field}  className="flex pr-12" />
                <div className="flex absolute right-3">

                <IconPicker onChange={handleIconSelect} />
                </div>
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Upload photos and videos here</FormLabel>
          <FormControl>
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

                      setButtonLoading(true)
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                setImage(res.url);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
          </FormControl>
          
        </FormItem>
        
        {
          buttonloading ? (<Button type="submit"   className="w-full bg-[#A5B4FC] text-black hover:bg-[#8495ef]">
        Submit</Button> ):(<Button type="submit"  disabled className="w-full bg-[#A5B4FC] text-black hover:bg-[#8495ef]">
        Submit</Button> )
        }
        
      </form>
    </Form>
    </CardContent>
    </Card>
  )
}
