"use server";
import { cacheTag, cacheLife } from "next/cache";
import { db } from "@/server/db";

export const getCategories = async () => {
  "use cache";
  // This cache can be revalidated by webhook or server action
  // when you call revalidateTag("articles")
  cacheTag("cateries");
  // This cache will revalidate after an hour even if no explicit
  // revalidate instruction was received
  cacheLife("hours");
  return await db.category.findMany({
    include: {
      subcategory: true,
    },
  });
};
