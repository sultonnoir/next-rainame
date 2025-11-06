"use server";
import prisma from "@/server/db";
import z from "zod";
import { action } from "@/lib/safe-action";
import { cacheTag, updateTag } from "next/cache";

export const getPosts = async () => {
  "use cache";
  cacheTag("posts");
  const start = performance.now();

  const posts = await prisma.posts.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  const end = performance.now();

  return {
    posts,
    duration: end - start,
  };
};

const postSchema = z.object({
  name: z.string().min(1).max(255),
});

export const addPost = action
  .inputSchema(postSchema)
  .action(async ({ parsedInput }) => {
    const start = performance.now();
    const newPost = await prisma.posts.create({
      data: {
        name: parsedInput.name,
        id: Date.now().toString(),
      },
    });
    const end = performance.now();
    updateTag("posts");
    return {
      message: `Post "${newPost.name}" added in ${(end - start).toFixed(0)}ms`,
    };
  });
