"use server"

import { db } from "../db"

export const blocktheuser = async ({blockerId,blockedId}:any)=>{
    try {
        await db.block.create({
            data:{
                blockerId:blockerId,
                blockedId:blockedId
            }
        })
        return {success:"user is blocked"}
        
    } catch (error) {
        return {error:"something went wrong"}
    }

}