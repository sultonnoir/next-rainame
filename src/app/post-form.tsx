"use client";

import { addPost } from "@/server/service/posts/post.service";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export default function PostForm() {
  const [name, setName] = useState("");
  const { execute, result } = useAction(addPost, {
    onSuccess: () => {
      setName("");
    },
  });

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Post name"
        onChange={(e) => setName(e.target.value)}
        className="border border-white rounded-lg outline-none"
      />
      <button
        onClick={() => {
          execute({ name });
        }}>
        Greet user
      </button>
      {result.data?.message ? <p>{result.data.message}</p> : null}
    </div>
  );
}
