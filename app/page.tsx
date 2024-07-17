import Addpost from "@/components/_created-components/addPost/addpost";
import Feeds from "@/components/_created-components/feeds/feeds";
import Navbar from "@/components/_created-components/navbar/navbar";
import RightMenu from "@/components/_created-components/RightMenu/rightmenu";
import Stories from "@/components/_created-components/stories/stories";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex w-full pt-20 gap-5 px-4 md:px-8 lg:px-12 2xl:px-64">


    <div className="flex flex-col py-4 gap-4 w-[100%] md:w-[70%] lg:w-[75%]">
      <Stories/>

      <Addpost/>
      <Feeds/>
      
    </div>
    <div className=" gap-3 hidden md:flex flex-col w-[30%] lg:w-[25%]" >
      <RightMenu/>
    </div>
    </div>
    </>
  );
}
