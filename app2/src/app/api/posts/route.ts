import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "5";

  const upstreamUrl = `https://jsonplaceholder.typicode.com/posts?_page=${encodeURIComponent(
    page
  )}&_limit=${encodeURIComponent(limit)}`;

  const upstream = await fetch(upstreamUrl, { cache: "no-store" });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: upstream.status }
    );
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
