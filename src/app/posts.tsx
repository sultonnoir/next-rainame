"use client";
import { posts } from "@prisma/client";
import { use } from "react";

export default function Posts({
  data,
}: {
  data: Promise<{ posts: posts[]; duration: number }>;
}) {
  const { posts, duration } = use(data);

  return (
    <ul>
      <li>{duration.toFixed(0)}ms</li>
      {posts.map((post) => (
        <li key={post.id}>{post.name}</li>
      ))}
    </ul>
  );
}
