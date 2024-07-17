"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
import { FileState, MultiFileDropzone } from "../create-post/multidropzone"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { Textarea } from "@/components/ui/textarea"
import { updateuser } from "@/lib/actions/users"

const formSchema = z.object({
  bio: z.string().min(2, {
    message: "Add bio",
  }),
  website: z.string().min(0, {
    message: "Add website",
  }),
  
})
export function EditForm({userId}:any) {

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
      bio: "",
      website: "",
      
    },
  })

  
  
  const onSubmit = async (values: z.infer<typeof formSchema>)=> {

    const res = await updateuser({userId,values,image});
    if(res){
        location.reload();
        
    }
    
    
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-950">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <div className="flex w-full items-center relative">
          <Textarea 
            placeholder="Add Bio" 
            {...field} 
            className="flex"
            
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="website"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Website</FormLabel>
      <FormControl>
        <div className="flex w-full items-center relative">
          <Input 
            placeholder="Add website link" 
            {...field} 
            className="flex"
            

          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        <FormItem>
          <FormLabel>Change profile photo</FormLabel>
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
        
        
          <Button type="submit" className="w-full bg-[#A5B4FC] text-black hover:bg-[#8495ef]">
        Submit</Button> 
        
        
      </form>
    </Form>
        
      </DialogContent>
    </Dialog>
  )
}
