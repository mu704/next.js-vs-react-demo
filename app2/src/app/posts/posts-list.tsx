type Post = { id: number; title: string; body: string };

type Props = {
  posts: Post[];
};

export default function PostsList({ posts }: Props) {
  return (
    <ul className="space-y-3">
      {posts.map((p) => (
        <li key={p.id} className="p-3 border rounded-md">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
