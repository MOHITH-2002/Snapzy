
import Navbar from "@/components/_created-components/navbar/navbar";
import Profile from "@/components/_created-components/profile/profile";
import Userposts from "@/components/_created-components/profile/userposts";
import RightMenu from "@/components/_created-components/RightMenu/rightmenu";
import React from "react";
interface idProps{
  params:{
        id:string;

  };

}
export const generateMetadata = async ({ params }:idProps) => {
return {
    title: "Snapzy | " + params.id,
    
  };
};
const Profilepage = ({params}:idProps) => {

  
  return(
    <>
    <Navbar/>
    <div className="flex w-full pt-20 gap-5 px-4 md:px-8 lg:px-12 2xl:px-64">


    <div className="flex flex-col py-4 gap-4 w-[100%] md:w-[70%] lg:w-[75%]">
      

      <Profile username={params.id}/>
      
      <Userposts username={params.id}/>
      
      
    </div>
    <div className=" gap-3 hidden md:flex flex-col w-[30%] lg:w-[25%]" >
      <RightMenu/>
    </div>
    </div>
    </>
  );
};

export default Profilepage;
