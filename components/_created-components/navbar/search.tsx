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
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserSearched from "./users-searched";

const Search = ()=> {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-900 items-center relative h-8 pl-8 md:w-52 rounded-md border border-input bg-background  py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:none  focus-visible:ring-transparent">
      <FaSearch className="absolute flex left-2 text-muted-foreground " />
      <span className="hidden md:flex">search</span>
    </div>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[425px] dark:bg-zinc-950 rounded-md">
        <DialogHeader>
          <Input placeholder="search..."  value={inputValue}
          onChange={handleInputChange} className="flex w-[95%]"/>  
        </DialogHeader>
        <div className="grid gap-4 max-h-96 md:max-h-80 overflow-y-auto scrollbar-hide py-4">
          <UserSearched inputvalue={inputValue}/>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

export default Search