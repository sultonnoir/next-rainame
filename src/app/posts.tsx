"use client";

import { use, useState, useTransition } from "react";
import { getPostPagination } from "@/server/service/posts/post.service";
import { posts } from "@prisma/client";

export default function Posts({
  initialData,
}: {
  initialData: Promise<{ posts: posts[]; duration: number }>;
}) {
  // ✅ gunakan `use()` sekali saja di client,
  // tapi hanya untuk `Promise` yang dikirim dari server component.
  const init = use(initialData);

  const [page, setPage] = useState(1);
  const [data, setData] = useState(init);
  const [isPending, startTransition] = useTransition();

  async function nextPage() {
    startTransition(async () => {
      const res = await getPostPagination(page + 1, 5);
      setData(res);
      setPage((p) => p + 1);
    });
  }

  async function prevPage() {
    startTransition(async () => {
      const res = await getPostPagination(page - 1, 5);
      setData(res);
      setPage((p) => p - 1);
    });
  }

  return (
    <div>
      <p>{data.duration.toFixed(0)}ms</p>
      <ul className="list-decimal">
        {data.posts.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <button
        onClick={prevPage}
        disabled={page === 1 || isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {isPending ? "Loading..." : "prev"}
      </button>

      <button
        onClick={nextPage}
        disabled={isPending || !data.posts.length}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {isPending ? "Loading..." : "Next"}
      </button>
    </div>
  );
}
