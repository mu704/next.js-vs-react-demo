import Link from "next/link";
import { headers } from "next/headers";
import PostsList from "./posts-list";

type Post = { id: number; title: string; body: string };

const LIMIT = 5;

async function getPosts(page: number): Promise<Post[]> {
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const apiUrl = `${base}/api/posts?page=${page}&limit=${LIMIT}`;

  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function PostsPage({
  searchParams = { page: "1" },
}: {
  searchParams?: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const posts = await getPosts(currentPage);
  const hasPrev = currentPage > 1;
  const hasNext = posts.length === LIMIT;

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
      <h1 className="mb-3 text-sm text-gray-700">Page {currentPage}</h1>

      <PostsList posts={posts} />

      <div className="mt-6 flex items-center justify-between">
        {hasPrev ? (
          <Link
            href={`/posts?page=${currentPage - 1}`}
            className="rounded border px-3 py-2 text-sm hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            ← Prev
          </Link>
        ) : (
          <span className="opacity-50 text-sm">← Prev</span>
        )}

        {hasNext ? (
          <Link
            href={`/posts?page=${currentPage + 1}`}
            className="rounded border px-3 py-2 text-sm hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Next →
          </Link>
        ) : (
          <span className="opacity-50 text-sm">Next →</span>
        )}
      </div>
    </div>
  );
}
