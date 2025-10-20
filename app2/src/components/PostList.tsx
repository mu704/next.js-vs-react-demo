"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PostListProps {
  limit?: number; // optionally show only first N posts
}

export default function PostList({ limit }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: Post[] = await res.json();
        console.log("hello two");
        setPosts(limit ? data.slice(0, limit) : data);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit]);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading posts</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">Failed to load posts: {error}</div>
    );
  }

  return (
    <ul className="space-y-4">
      {posts.map((p) => (
        <li key={p.id} className="p-3 border rounded-md flex gap-3">
          <Link
            href={`/posts/${p.id}`}
            className="shrink-0"
            aria-label={`Open ${p.title}`}
          >
            <img
              src={`https://picsum.photos/id/${p.id}/200/300`}
              alt={p.title}
              width={96}
              height={96}
              className="rounded object-cover w-24 h-24 bg-[#f2f2f2] dark:bg-[#1a1a1a]"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">
              <Link href={`/posts/${p.id}`} className="hover:underline">
                {p.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">{p.body}</p>
            <div className="mt-2">
              <Link
                href={`/posts/${p.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
