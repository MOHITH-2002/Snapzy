"use server"

import { revalidatePath } from "next/cache"
import { db } from "../db"

export const followrequest = async ({senderId,receiverId}:any)=>{
    try {
        await db.followRequest.create({
            data: {
        senderId: senderId,
        receiverId: receiverId,
        },
    })
        return {success:"follow request sent"}
    } catch (error) {
        return {error:"follow request failed"}
    }
}
export const following = async ({senderId,receiverId}:any)=>{
    try {
        
        const res  = await db.followRequest.findFirst({
            where: {
                senderId,
                receiverId
                
            },
        })
        
        
        return res
    } catch (error) {
        
        return false
    }
    }

export const follower = async ({senderId,receiverId,id}:any)=>{
    try {
        await db.follower.create({
            data: {
        followingId: senderId,
        followerId: receiverId,
        },
    })
    revalidatePath('/');

        return {success:"follow accepted"}
    } catch (error) {
        return {error:"follow request failed"}
    }
}