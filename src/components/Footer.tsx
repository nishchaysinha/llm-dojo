import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="text-sm font-bold mb-3" style={{ color: "var(--white)", letterSpacing: "0.05em" }}>
              LLM_DOJO<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              Open-source curriculum for LLM fine-tuning and inference optimization.
              83 notebooks. Free.
            </p>
            <p className="text-xs mt-4" style={{ color: "var(--dim)" }}>
              MIT — {new Date().getFullYear()}
            </p>
          </div>

          {/* Curriculum */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--sub)" }}>Curriculum</div>
            <ul className="space-y-2">
              {[
                ["00 — Foundations", "/stage/stage-0"],
                ["01 — Full Fine-Tuning", "/stage/stage-1"],
                ["02 — PEFT / LoRA", "/stage/stage-2"],
                ["03 — Advanced Optimization", "/stage/stage-3"],
                ["04 — Alignment", "/stage/stage-4"],
                ["05 — Kernels & Production", "/stage/stage-5"],
                ["06 — Inference", "/stage/inference"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-xs underline-slide" style={{ color: "var(--muted)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--sub)" }}>Links</div>
            <ul className="space-y-2">
              {[
                ["Full Roadmap", "/roadmap"],
                ["Use with Claude Code", "/mcp"],
                ["About", "/about"],
                ["GitHub", "https://github.com/nishchaysinha/llm-dojo"],
                ["Google Colab", "https://colab.research.google.com"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                     rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                     className="text-xs underline-slide" style={{ color: "var(--muted)" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
