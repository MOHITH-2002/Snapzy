import { NewVerificationForm } from "@/components/auth/new-verification-form";
import Loader from "@/components/loading";
import { Suspense } from "react";
export const generateMetadata = async () => {
return {
    title: "Snapzy | Auth| verify" ,
  };
};
const NewVerificationPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <NewVerificationForm />
    </Suspense>
   );
}

export default NewVerificationPage;