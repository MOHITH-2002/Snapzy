"use server"
import { db } from "../db";
interface UpdateUserProps {
  userId: string;
  values: {
    bio?: string;
    website?: string;
  };
  image?: string;
}
export const searchuser = async ({ inputvalue }:any) => {
    try {
        const users = await db.user.findMany({
            where: {
                slug: {
                    startsWith: inputvalue,
                },
            },
            select: {
                name: true,
                id: true,
                image: true,
                slug: true,
            },
        });
        return users;
    } catch (error) {
        console.error("Error in searchuser:", error);
        throw error; // Optionally, rethrow the error to handle it elsewhere
    }
};



export const updateuser = async ({ userId, values, image }: UpdateUserProps) => {
  try {


    const updateDetails = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        bio: values.bio || '',
        website: values.website || '',
        image: image || '',
      },
    });

    return true;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};