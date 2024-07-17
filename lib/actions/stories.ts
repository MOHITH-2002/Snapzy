"use server"

import { db } from "../db";


export const createStory = async ({userId,image}:any) => {


  try {
    const existingStory = await db.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await db.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }
    const createdStory = await db.story.create({
      data: {
        userId,
        img:image,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};