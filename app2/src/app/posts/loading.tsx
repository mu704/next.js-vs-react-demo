export default function Loading() {
  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-2 text-gray-600">
        <span className="animate-spin inline-block w-5 h-5 rounded-full border-2 border-gray-300 border-t-transparent" />
        Loading posts...
      </div>
    </div>
  );
}
