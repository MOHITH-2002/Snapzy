"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdConnectWithoutContact } from "react-icons/md";
import { ImProfile } from "react-icons/im";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "@/components/Modetoggle";
import { LogoutButton } from "./logout";

interface props{
  usersession:any
}
const Account = ({usersession}:props) => {


  


  
  return( 
    <>

    <DropdownMenu>

      <DropdownMenuTrigger asChild>
      
            {usersession.user.image  && usersession.user.image!== null ? (
        <Avatar className="cursor-pointer">
                <AvatarImage src={usersession.user.image} alt="logo"/>
            <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
            </Avatar>
        ) :(

            
            <Avatar className="cursor-pointer">
                <AvatarImage src={usersession.user.image} alt="logo"/>
            <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
            </Avatar>
            )
        }
        
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 mr-1 w-40">
       
        
          <div className="flex flex-col w-full">

       
        <DropdownMenuItem className="cursor-pointer">
            
            <Link href={`/profile/${usersession.user.slug}`} className="flex items-center gap-1">
            <ImProfile  className="mr-2 h-4 w-4"/>
          Profile
        </Link>
          </DropdownMenuItem>
            
            
            

        
        <DropdownMenuItem className="cursor-pointer">
            <Link href="/https://github.com/MOHITH-2002" className="flex items-center gap-1">
            <MdConnectWithoutContact size={20} className="mr-2 h-4 w-4"/>
          Contact
        </Link>
          </DropdownMenuItem>
        <ModeToggle/>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
          </div>
      </DropdownMenuContent>
    </DropdownMenu>
    
    </>
  )
}

export default Account
