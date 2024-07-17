import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (<Link href="/" className="flex items-end gap-1">
    <Image src="/logo.svg" alt="logo" width="50" height="0"/>

    <h1 className="hidden md:flex font-bold text-2xl">Snapzy</h1>
  </Link>);
};

export default Logo;
