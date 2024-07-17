import React from "react";

import { auth } from "@/auth";
import Link from "next/link";
import Logo from "../logo";
import Search from "./search";

import Account from "./account";
import { Button } from "@/components/ui/button";


const Navbar =async  () => {
        const session = await auth();
        
        
    
    return( 
    <div className="flex w-full z-[99999] items-center top-0 fixed backdrop-blur-md justify-between h-14 md:h-16 gap-4 px-4 md:px-8 lg:px-12 2xl:px-64">
    <div>
        <Logo/> 
    </div>
    
    
    <div className="flex items-center gap-3 sm:gap-6">
        <Search/>
        <Link href="/create">
        <Button variant="secondary" size="sm">
            Create Post
        </Button></Link>
        
        {
            session === null ? (
                <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
            ):(
        <Account usersession={session}/>)
        }
    </div>

    </div>);
};

export default Navbar;
