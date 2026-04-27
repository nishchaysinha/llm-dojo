import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allStages, SITE_CONFIG } from "@/data/curriculum";
import NotebookCard from "@/components/NotebookCard";
import AdBanner from "@/components/AdBanner";

type Props = { params: Promise<{ stageId: string }> };

export async function generateStaticParams() {
  return allStages.map((s) => ({ stageId: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stageId } = await params;
  const stage = allStages.find((s) => s.id === stageId);
  if (!stage) return {};
  const title = `${stage.title} | ${SITE_CONFIG.name}`;
  const description = `${stage.description} ${stage.notebooks.length} hands-on Google Colab notebooks.`;
  return {
    title, description,
    openGraph: { title, description, url: `/stage/${stageId}` },
    alternates: { canonical: `/stage/${stageId}` },
  };
}

export default async function StagePage({ params }: Props) {
  const { stageId } = await params;
  const stage = allStages.find((s) => s.id === stageId);
  if (!stage) notFound();

  const idx = allStages.findIndex((s) => s.id === stageId);
  const prev = idx > 0 ? allStages[idx - 1] : null;
  const next = idx < allStages.length - 1 ? allStages[idx + 1] : null;
  const totalMins = stage.notebooks.reduce((s, n) => s + (parseInt(n.duration) || 0), 0);

  return (
    <>
      <nav className="max-w-7xl mx-auto px-6 pt-6">
        <div className="text-xs" style={{ color: "var(--dim)" }}>
          <Link href="/" className="underline-slide" style={{ color: "var(--muted)" }}>home</Link>
          <span className="mx-2">/</span>
          <span style={{ color: "var(--sub)" }}>{stage.id}</span>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 pt-12 pb-12 border-b" style={{ borderColor: "var(--line)" }}>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
          Stage {String(stage.number).padStart(2, "0")}
        </div>
        <h1 className="font-bold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", color: "var(--white)", letterSpacing: "-0.02em" }}>
          {stage.title}
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
          {stage.description}
        </p>
        <div className="flex gap-8 text-xs" style={{ color: "var(--muted)" }}>
          <div><span style={{ color: "var(--sub)" }}>{stage.notebooks.length}</span><span className="ml-2 uppercase tracking-widest">notebooks</span></div>
          <div><span style={{ color: "var(--sub)" }}>{Math.round(totalMins / 60)}h</span><span className="ml-2 uppercase tracking-widest">estimated</span></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <AdBanner adSlot="2345678901" adFormat="horizontal" fullWidth />
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--line)" }}>
          {stage.notebooks.map((nb) => (
            <div key={nb.id} style={{ background: "var(--bg)" }}>
              <NotebookCard notebook={nb} stage={stage} />
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
        {prev ? (
          <Link href={`/stage/${prev.id}`} className="p-5 transition-colors group" style={{ background: "var(--bg)" }} >
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--dim)" }}>← Previous</div>
            <div className="text-sm" style={{ color: "var(--text)" }}>{prev.title}</div>
          </Link>
        ) : <div style={{ background: "var(--bg)" }} />}
        {next ? (
          <Link href={`/stage/${next.id}`} className="p-5 text-right transition-colors" style={{ background: "var(--bg)" }} >
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--dim)" }}>Next →</div>
            <div className="text-sm" style={{ color: "var(--text)" }}>{next.title}</div>
          </Link>
        ) : <div style={{ background: "var(--bg)" }} />}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: stage.title, numberOfItems: stage.notebooks.length,
        itemListElement: stage.notebooks.map((nb, i) => ({
          "@type": "ListItem", position: i + 1, name: nb.title,
          url: `${SITE_CONFIG.url}/notebook/${nb.slug}`,
        })),
      })}} />
    </>
  );
}
