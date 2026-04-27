import type { Metadata } from "next";
import Link from "next/link";
import { allStages, SITE_CONFIG } from "@/data/curriculum";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "LLM Fine-Tuning & Inference Roadmap",
  description:
    "Complete visual roadmap for mastering LLM fine-tuning and inference optimization. 83 notebooks across 7 stages from transformer basics to production deployment.",
  keywords: [
    "LLM learning roadmap",
    "fine-tuning curriculum",
    "LLM course structure",
    ...SITE_CONFIG.keywords.slice(0, 6),
  ],
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  const totalNotebooks = allStages.reduce((s, st) => s + st.notebooks.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white mb-4">
          The LLM Dojo Roadmap
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          {totalNotebooks} notebooks, 7 stages. Go from zero to production LLM engineer.
          Each stage builds on the last.
        </p>
      </div>

      <AdBanner adSlot="5678901234" adFormat="horizontal" fullWidth />

      {/* Timeline */}
      <div className="relative mt-12">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-slate-700 hidden sm:block" />

        <div className="space-y-12">
          {allStages.map((stage, i) => (
            <div key={stage.id} className="relative sm:pl-24">
              {/* Belt indicator */}
              <div className="hidden sm:flex absolute left-0 w-16 h-16 rounded-full border-2 border-slate-700 bg-slate-900 items-center justify-center text-2xl z-10">
                {["🤍", "💛", "💚", "💙", "🤎", "🖤", "❤️"][i] ?? "📘"}
              </div>

              {/* Stage card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${stage.beltColor}`}>
                        {stage.belt}
                      </span>
                      <span className="text-slate-500 text-sm">Stage {stage.number}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{stage.title}</h2>
                    <p className="text-slate-400 mt-1 max-w-xl">{stage.description}</p>
                  </div>
                  <Link
                    href={`/stage/${stage.id}`}
                    className="shrink-0 px-4 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold text-sm border border-orange-500/20 transition-colors"
                  >
                    {stage.notebooks.length} notebooks →
                  </Link>
                </div>

                {/* Notebook pills */}
                <div className="flex flex-wrap gap-2">
                  {stage.notebooks.map((nb) => (
                    <Link
                      key={nb.id}
                      href={`/notebook/${nb.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                    >
                      <span className="text-orange-400 font-mono">#{nb.number}</span>
                      {nb.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdBanner adSlot="6789012345" adFormat="rectangle" className="mt-16" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "LLM Dojo Learning Roadmap",
            description: "Complete roadmap for mastering LLM fine-tuning and inference",
            numberOfItems: allStages.length,
            itemListElement: allStages.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `${SITE_CONFIG.url}/stage/${s.id}`,
            })),
          }),
        }}
      />
    </div>
  );
}
