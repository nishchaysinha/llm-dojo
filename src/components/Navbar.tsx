"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/roadmap",       label: "Roadmap" },
  { href: "/stage/stage-0", label: "Foundations" },
  { href: "/stage/stage-2", label: "PEFT" },
  { href: "/stage/stage-4", label: "Alignment" },
  { href: "/stage/inference", label: "Inference" },
  { href: "/mcp",           label: "MCP" },
  { href: "/about",         label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--line)", background: "rgba(8,8,8,0.95)", backdropFilter: "blur(8px)" }}>
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold tracking-tight text-sm flicker" style={{ color: "var(--white)", letterSpacing: "0.05em" }}>
          LLM_DOJO<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="underline-slide text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--muted)" }}>
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/nishchaysinha/llm-dojo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest border px-3 py-1 transition-colors"
            style={{ borderColor: "var(--dim)", color: "var(--sub)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--dim)"; (e.currentTarget as HTMLElement).style.color = "var(--sub)"; }}
          >
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-xs" style={{ color: "var(--muted)" }} aria-label="menu">
          {open ? "[ close ]" : "[ menu ]"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
