"use client";
import { use } from "react";
import { posts } from "../../generated/prisma/client";

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
