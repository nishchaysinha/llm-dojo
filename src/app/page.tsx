import type { Metadata } from "next";
import Link from "next/link";
import { allStages, SITE_CONFIG } from "@/data/curriculum";
import StageCard from "@/components/StageCard";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const totalNotebooks = allStages.reduce((s, st) => s + st.notebooks.length, 0);
  return (
    <>
      <div className="scanline" aria-hidden />
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 border-b" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-center gap-3 mb-16 text-xs" style={{ color: "var(--muted)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="uppercase tracking-widest">System online</span>
          <span style={{ color: "var(--dim)" }}>—</span>
          <span>{totalNotebooks} notebooks loaded</span>
        </div>
        <div className="mb-12">
          <h1 className="font-bold leading-none flicker" style={{ fontSize: "clamp(3rem, 10vw, 7rem)", color: "var(--white)", letterSpacing: "-0.02em" }}>
            LLM<br />DOJO<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            A structured curriculum for understanding and training large language models. Foundations to production. No prerequisites beyond Python and PyTorch.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-10" style={{ background: "var(--line)" }}>
          {[["83","Notebooks"],["7","Stages"],["Free","Forever"],["T4 GPU","Tested"]].map(([val, label]) => (
            <div key={label} className="px-6 py-5" style={{ background: "var(--bg)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--bright)" }}>{val}</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--muted)" }}>{label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap">
          <Link href="/stage/stage-0" className="btn-accent">Start from zero →</Link>
          <Link href="/roadmap" className="btn-dim">View roadmap</Link>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <AdBanner adSlot="1234567890" adFormat="horizontal" fullWidth />
      </div>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8 border-b pb-4" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest" style={{ color: "var(--sub)" }}>Curriculum — {allStages.length} stages</h2>
          <Link href="/roadmap" className="underline-slide text-xs" style={{ color: "var(--muted)" }}>Full roadmap</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ background: "var(--line)" }}>
          {allStages.map((stage) => (
            <div key={stage.id} style={{ background: "var(--bg)" }}><StageCard stage={stage} /></div>
          ))}
        </div>
      </section>
      <section className="border-t border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--sub)" }}>What this is</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>An open-source curriculum for learning LLM fine-tuning and inference optimization end-to-end. Every notebook runs on Google Colab free tier (T4 GPU, 15 GB VRAM).</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>Starts with transformer architecture from scratch. Ends with CUDA kernels, GPTQ/AWQ quantization, and production inference with vLLM.</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--sub)" }}>What this isn&apos;t</h2>
            <ul className="space-y-3 text-sm">
              {["Not hand-holding","Not paid","Not pseudocode — every cell runs","Not theory-only — every concept has a working implementation"].map(s => (
                <li key={s} className="flex items-start gap-3" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--dim)" }}>—</span><span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AdBanner adSlot="0987654321" adFormat="rectangle" className="mb-16" />
        <div className="border p-12 text-center" style={{ borderColor: "var(--line)" }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>Start anywhere. Go as deep as you need.</p>
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--bright)" }}>83 notebooks. 0 cost.</h2>
          <Link href="/stage/stage-0" className="btn-accent">Begin →</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: "LLM Fine-Tuning & Inference Mastery", description: SITE_CONFIG.description, provider: { "@type": "Organization", name: "LLM Dojo", sameAs: SITE_CONFIG.url }, url: SITE_CONFIG.url, isAccessibleForFree: true }) }} />
    </>
  );
}
