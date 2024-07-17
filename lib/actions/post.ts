"use server"


import { db } from "../db";

interface createpostProps {
    userId: string;
    desc:string;
    img?:string
}
export const createNote = async ({userId, desc}:createpostProps) =>{
    try {
        
        await db.post.create({
            data:{
                description:desc,
                userId
            }
        })
        return {success:"Note has been created!"}
        
    } catch (error) {
        return {error:"Something went wrong try again"}
    }

}

export const createpost = async ({userId, desc,img}:createpostProps) =>{
    try {
        
        await db.post.create({
            data:{
                description:desc,
                userId,
                img,
            }
        })
        
        return true
        
        
    } catch (error) {
        return {error:"Something went wrong try again"}
    }
}

export const deletePost = async ({postId}:any)=>{
    try {
        
        await db.post.delete({
            where:{
                id:postId
            }
        })
        
        return true
        
        
    } catch (error) {
        return {error:"Something went wrong try again"}
    }
}