import { useEffect, useRef, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 10;

  const fetchPosts = async (pageToFetch: number) => {
    if (pageToFetch === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      setError(null);
      const url = `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${pageToFetch}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: Post[] = await res.json();

      setPosts((prev) => (pageToFetch === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === LIMIT);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (page === 0) return;
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && !loadingMore && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, loadingMore, hasMore]);

  if (loading && page === 1)
    return (
      <div style={{ display: "grid", gap: "12px" }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 72,
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              background: "#f3f4f6",
            }}
          />
        ))}
      </div>
    );

  if (error) return <p style={{ color: "tomato" }}>Error: {error}</p>;

  return (
    <div style={{ textAlign: "left", marginTop: "1rem" }}>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
          margin: 0,
          display: "grid",
          gap: "12px",
        }}
      >
        {posts.map((p) => (
          <li
            key={p.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "12px 14px",
              background: "#ffffff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1rem", lineHeight: 1.3 }}>
              {p.title}
            </h3>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: "0.95rem",
                color: "#4b5563",
              }}
            >
              {p.body}
            </p>
          </li>
        ))}
      </ul>

      <div ref={sentinelRef} style={{ height: 1 }} />

      <div style={{ textAlign: "center", padding: "8px 0", color: "#6b7280" }}>
        {loadingMore && posts.length > 0 && <span>Loading more…</span>}
        {!hasMore && <span>— End of list —</span>}
      </div>
    </div>
  );
}
