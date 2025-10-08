"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t border-gray-200/20 bg-background/50">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500 sm:px-6 lg:px-8">
        <p>
          © {year} Next.js vs React Demo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
