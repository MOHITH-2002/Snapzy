import { RegisterForm } from "@/components/auth/register-form";
import Loader from "@/components/loading";
import { Suspense } from "react";
export const generateMetadata = async () => {
return {
    title: "Snapzy | Auth| Register" ,
  };
};
const RegisterPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <RegisterForm />
    </Suspense>
    

  );
}

export default RegisterPage;