export const revalidate = 60; // ISR: regenerate up to once per 60s

import Link from "next/link";

type Post = { id: number; title: string; body: string };

async function getPostsStatic(): Promise<Post[]> {
  // Default fetch behavior in Next.js App Router is cacheable (force-cache) for GET
  // We also set route-level revalidate above for ISR.
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
    // For ISR
    // {
    //   next: {revalidate,}
    // }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function SSGPage() {
  const posts = await getPostsStatic();
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
      <h1 className="text-2xl font-bold mb-2">Static (ISR) Posts</h1>
      <p className="text-sm text-gray-600 mb-4">
        This page is statically generated with incremental revalidation every 60
        seconds.
      </p>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="p-3 border rounded-md">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
