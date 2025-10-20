import Link from "next/link";
import Image from "next/image";

type Post = { id: number; title: string; body: string };

type Props = {
  posts: Post[];
};

export default function PostsList({ posts }: Props) {
  return (
    <ul className="space-y-3">
      {posts.map((p) => (
        <li key={p.id} className="p-3 border rounded-md flex gap-3">
          <Link
            href={`/posts/${p.id}`}
            className="shrink-0"
            aria-label={`Open ${p.title}`}
          >
            <Image
              src={`https://picsum.photos/id/${p.id}/200/300`}
              alt={p.title}
              width={96}
              height={96}
              sizes="96px"
              className="rounded object-cover w-24 h-24 bg-[#f2f2f2] dark:bg-[#1a1a1a]"
              priority={false}
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
