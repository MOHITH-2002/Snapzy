import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapzy | Auth",
  description: "Snapzy is a dynamic social media platform where users can post, follow, like, add stories, and block suspicious accounts. Engage with friends, share moments, and stay safe with our robust security features. Join Snapzy today for a seamless and secure social experience!",
};

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-screen w-full  flex items-center justify-center ">
      {children}
    </div>
   );
}

export default AuthLayout;