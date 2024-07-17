"use server"

import { db } from "../db";

export const createComment = async({postId,userId,comment}:any)=>{
    try {
        await db.comment.create({data:{
            postId,
            userId,
            desc:comment,
        }})
        return true;
        
    } catch (error) {
        return error;
    }
    
}
export const fetchcomments = async ({postId}:any)=>{
    try {
        
        const comments = await db.comment.findMany({
            where:{
                postId,
            },
            include:{
                user:{
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        
                    },
                }
                
            }
        })
        return comments
    } catch (error) {
        console.log(error);
        
    }
} 