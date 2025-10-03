"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
              {error?.message || "An unexpected error occurred."}
            </p>
            {error?.digest && (
              <p className="text-xs text-gray-400 mb-4">Ref: {error.digest}</p>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => reset()}
                className="rounded border px-4 py-2 text-sm hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
              >
                Try again
              </button>
              <Link
                href="/"
                className="rounded border px-4 py-2 text-sm hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
