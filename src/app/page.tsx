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

const stats = [
  { value: "83", label: "Notebooks" },
  { value: "7", label: "Stages" },
  { value: "Free", label: "Forever" },
  { value: "GPU", label: "Ready" },
];

const features = [
  {
    icon: "⚡",
    title: "Run on Google Colab",
    desc: "Every notebook runs free on Colab T4 GPU. No setup, no credit card.",
  },
  {
    icon: "🎯",
    title: "Concept-First Learning",
    desc: "Each notebook explains WHY before HOW — historical context, math intuition, then code.",
  },
  {
    icon: "🔧",
    title: "Production-Ready Code",
    desc: "Code patterns from real LLM training pipelines. Not toy examples.",
  },
  {
    icon: "📈",
    title: "Progressive Difficulty",
    desc: "White belt to black belt — each stage builds on the last. No gaps.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm text-orange-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Free & Open Source — 83 Colab Notebooks
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
            <span className="text-6xl sm:text-7xl lg:text-8xl">🥋</span>
            <br />
            Master{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              LLM Fine-Tuning
            </span>
            <br />& Inference
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            From transformer basics to CUDA kernels. LoRA, QLoRA, DPO, RLHF, vLLM —
            everything you need to train and deploy large language models.{" "}
            <strong className="text-white">Free forever.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/stage/stage-0"
              className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg transition-colors shadow-lg shadow-orange-500/25"
            >
              Start Training Free →
            </Link>
            <Link
              href="/roadmap"
              className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-white font-semibold text-lg transition-colors"
            >
              View Full Roadmap
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad banner */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner adSlot="1234567890" adFormat="horizontal" fullWidth />
      </div>

      {/* Belt progression */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Your Belt Progression
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Each stage unlocks new techniques. Complete notebooks in order, or jump to what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allStages.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Why LLM Dojo?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AdBanner adSlot="0987654321" adFormat="rectangle" className="mb-12" />

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to earn your Black Belt? 🖤
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            83 notebooks. 7 stages. Zero cost. Start from the foundations and work your way up to custom CUDA kernels.
          </p>
          <Link
            href="/stage/stage-0"
            className="inline-block px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg transition-colors"
          >
            Begin Your Journey →
          </Link>
        </div>
      </section>

      {/* JSON-LD: Course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "LLM Fine-Tuning & Inference Mastery",
            description: SITE_CONFIG.description,
            provider: { "@type": "Organization", name: "LLM Dojo", sameAs: SITE_CONFIG.url },
            url: SITE_CONFIG.url,
            isAccessibleForFree: true,
            inLanguage: "en",
            coursePrerequisites: "Basic Python and PyTorch knowledge",
            educationalLevel: "Intermediate to Advanced",
            teaches: [
              "LLM fine-tuning with LoRA and QLoRA",
              "RLHF and DPO alignment techniques",
              "Inference optimization with vLLM",
              "Quantization with GPTQ and AWQ",
              "Custom CUDA kernels with Triton",
            ],
          }),
        }}
      />
    </>
  );
}
