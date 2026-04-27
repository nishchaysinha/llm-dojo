"use client";

interface HoverButtonProps {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
  external?: boolean;
  className?: string;
}

export default function HoverButton({ href, children, accent = false, external = false, className = "" }: HoverButtonProps) {
  const baseStyle: React.CSSProperties = accent
    ? { borderColor: "var(--accent)", color: "var(--accent)", background: "transparent" }
    : { borderColor: "var(--dim)", color: "var(--sub)" };

  const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (accent) { el.style.background = "var(--accent)"; el.style.color = "#000"; }
    else { el.style.borderColor = "var(--muted)"; el.style.color = "var(--text)"; }
  };
  const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (accent) { el.style.background = "transparent"; el.style.color = "var(--accent)"; }
    else { el.style.borderColor = "var(--dim)"; el.style.color = "var(--sub)"; }
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`text-xs uppercase tracking-widest px-5 py-2.5 border transition-colors ${className}`}
      style={baseStyle}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {children}
    </a>
  );
}
