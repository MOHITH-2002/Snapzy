"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = ()=>{
    return(
        <div className="h-screen flex flex-col items-center justify-center space-y-5 ">
            <Image src="/loading.svg" height={300} width={300}  alt="error" />
            <h2 className="text-red-600 dark:text-red-400 text-3xl">Page not found</h2>
            <Link href="/">
            <Button>Go back</Button>
            </Link>


        </div>
    );
}
export default Error;