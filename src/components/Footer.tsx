import Link from "next/link";
import { SITE_CONFIG } from "@/data/curriculum";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🥋</span>
              <span className="font-bold text-lg bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                LLM Dojo
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Free, open-source curriculum for mastering LLM fine-tuning and inference optimization.
              83 hands-on Google Colab notebooks.
            </p>
            <p className="text-slate-600 text-xs mt-4">
              © {new Date().getFullYear()} LLM Dojo. MIT License.
            </p>
          </div>

          {/* Stages */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Curriculum</h3>
            <ul className="space-y-2">
              {[
                ["White Belt — Foundations", "/stage/stage-0"],
                ["Yellow Belt — Full Fine-Tuning", "/stage/stage-1"],
                ["Green Belt — LoRA / PEFT", "/stage/stage-2"],
                ["Blue Belt — Advanced Optimization", "/stage/stage-3"],
                ["Brown Belt — Alignment", "/stage/stage-4"],
                ["Black Belt — Kernels & Production", "/stage/stage-5"],
                ["Red Belt — Inference", "/stage/inference"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Links</h3>
            <ul className="space-y-2">
              {[
                ["Full Roadmap", "/roadmap"],
                ["About", "/about"],
                ["GitHub", "https://github.com/nishchaysinha/llm-dojo"],
                ["Open Colab", "https://colab.research.google.com"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-600 text-xs">
          Built with Next.js · Tailwind CSS · Open Source ·{" "}
          <a href={SITE_CONFIG.url} className="hover:text-slate-400">
            {SITE_CONFIG.url}
          </a>
        </div>
      </div>
    </footer>
  );
}
