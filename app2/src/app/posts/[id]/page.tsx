import { notFound } from "next/navigation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    // Avoid caching to always get the latest (you can switch this to 'force-cache' or ISR if preferred)
    cache: "force-cache",
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">Post ID: {post.id}</p>
      <p className="text-gray-800">{post.body}</p>
    </div>
  );
}
