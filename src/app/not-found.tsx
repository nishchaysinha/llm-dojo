import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="font-mono text-xs mb-6" style={{ color: "var(--dim)" }}>ERROR_404</div>
      <h1 className="font-bold mb-4" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--white)", letterSpacing: "-0.03em" }}>
        Not found<span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>
        This page doesn&apos;t exist.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="btn-accent"
        >
          Home →
        </Link>
        <Link
          href="/roadmap"
          className="btn-dim"
        >
          Roadmap
        </Link>
      </div>
    </div>
  );
}
