import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🥋</div>
      <h1 className="text-4xl font-black text-white mb-4">404 — Wrong Dojo</h1>
      <p className="text-slate-400 mb-8 max-w-md">
        This page doesn&apos;t exist. Perhaps you took a wrong turn on the path to black belt.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold transition-colors"
        >
          Back to Dojo
        </Link>
        <Link
          href="/roadmap"
          className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-white transition-colors"
        >
          View Roadmap
        </Link>
      </div>
    </div>
  );
}
