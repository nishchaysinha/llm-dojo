import type { Metadata } from "next";
import Link from "next/link";
import { allStages, SITE_CONFIG } from "@/data/curriculum";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Roadmap | LLM Dojo",
  description: "Complete LLM fine-tuning and inference optimization curriculum. 83 notebooks across 7 stages.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  const total = allStages.reduce((s, st) => s + st.notebooks.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12 border-b pb-8" style={{ borderColor: "var(--line)" }}>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>Curriculum</div>
        <h1 className="font-bold mb-3" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--white)", letterSpacing: "-0.02em" }}>
          Roadmap
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {total} notebooks. {allStages.length} stages. Sequential or pick your entry point.
        </p>
      </div>

      <AdBanner adSlot="5678901234" adFormat="horizontal" fullWidth />

      <div className="mt-12 space-y-0">
        {allStages.map((stage, i) => (
          <div key={stage.id} className="border-b" style={{ borderColor: "var(--line)" }}>
            {/* Stage row */}
            <div className="py-8">
              <div className="flex items-start justify-between gap-6 mb-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                      {String(stage.number).padStart(2, "0")}
                    </span>
                    <h2 className="font-bold text-lg" style={{ color: "var(--bright)" }}>
                      {stage.title}
                    </h2>
                  </div>
                  <p className="text-xs leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
                    {stage.description}
                  </p>
                </div>
                <Link
                  href={`/stage/${stage.id}`}
                  className="btn-dim"
                >
                  {stage.notebooks.length} notebooks →
                </Link>
              </div>

              {/* Notebook pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {stage.notebooks.map((nb) => (
                  <Link
                    key={nb.id}
                    href={`/notebook/${nb.slug}`}
                    className="nb-pill"
                  >
                    <span className="font-mono mr-1.5" style={{ color: "var(--accent)", opacity: 0.6 }}>{nb.number}</span>
                    {nb.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdBanner adSlot="6789012345" adFormat="rectangle" className="mt-16" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "LLM Dojo Roadmap",
        numberOfItems: allStages.length,
        itemListElement: allStages.map((s, i) => ({
          "@type": "ListItem", position: i + 1,
          name: s.title, url: `${SITE_CONFIG.url}/stage/${s.id}`,
        })),
      })}} />
    </div>
  );
}
