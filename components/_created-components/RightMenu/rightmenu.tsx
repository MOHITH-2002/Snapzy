import React, { Suspense } from 'react'
import { User } from "@prisma/client";
import Suggestions from './suggestions';
import AllNotes from './allNotes';
const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      
      
      <Suggestions/>
      <AllNotes/>
    </div>
  )
}

export default RightMenu
