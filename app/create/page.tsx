import Create from '@/components/_created-components/create-post/Create'
import React from 'react'
export const generateMetadata = async () => {
return {
    title: "Snapzy | Create Post" ,
  };
};
const CreatePage = () => {

  return (
    <>
    <Create/>
    </>
    )
}

export default CreatePage
