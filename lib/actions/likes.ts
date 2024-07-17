"use server"

import { db } from "../db"

export const createlike = async ({userId,postId}:any)=>{
    try {

        
        await db.like.create({data: {userId:userId,postId:postId}})
        
        
        return true;
    } catch (error) {
        return false;
    }
}