import { ResetForm } from "@/components/auth/reset-form";
export const generateMetadata = async () => {
return {
    title: "Snapzy | Auth| Reset" ,
  };
};
const ResetPage = () => {
  return ( 
    <ResetForm />
  );
}

export default ResetPage;