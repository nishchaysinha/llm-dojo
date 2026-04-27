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
  const description = `${stage.belt}: ${stage.description} — ${stage.notebooks.length} hands-on Google Colab notebooks.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/stage/${stageId}` },
    twitter: { title, description },
    alternates: { canonical: `/stage/${stageId}` },
  };
}

export default async function StagePage({ params }: Props) {
  const { stageId } = await params;
  const stage = allStages.find((s) => s.id === stageId);
  if (!stage) notFound();

  const stageIdx = allStages.findIndex((s) => s.id === stageId);
  const prevStage = stageIdx > 0 ? allStages[stageIdx - 1] : null;
  const nextStage = stageIdx < allStages.length - 1 ? allStages[stageIdx + 1] : null;

  const totalDuration = stage.notebooks.reduce((sum, n) => {
    const mins = parseInt(n.duration);
    return sum + (isNaN(mins) ? 0 : mins);
  }, 0);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li><Link href="/" className="hover:text-slate-300">Home</Link></li>
          <li>/</li>
          <li className="text-slate-300">{stage.title}</li>
        </ol>
      </nav>

      {/* Stage header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${stage.beltColor}`}>
                {stage.belt}
              </span>
              <span className="text-slate-500 text-sm">Stage {stage.number}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              {stage.title}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {stage.description}
            </p>
          </div>
          <div className="shrink-0 grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-white">{stage.notebooks.length}</div>
              <div className="text-xs text-slate-500">Notebooks</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-white">{Math.round(totalDuration / 60)}h</div>
              <div className="text-xs text-slate-500">Total Time</div>
            </div>
          </div>
        </div>
      </header>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner adSlot="2345678901" adFormat="horizontal" fullWidth />
      </div>

      {/* Notebooks grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">
          {stage.notebooks.length} Notebooks in This Stage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stage.notebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} stage={stage} />
          ))}
        </div>
      </section>

      {/* Stage navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col sm:flex-row justify-between gap-4">
        {prevStage ? (
          <Link
            href={`/stage/${prevStage.id}`}
            className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-colors"
          >
            <span className="text-2xl">←</span>
            <div>
              <div className="text-xs text-slate-500">Previous</div>
              <div className="text-white font-semibold">{prevStage.title}</div>
            </div>
          </Link>
        ) : <div />}
        {nextStage && (
          <Link
            href={`/stage/${nextStage.id}`}
            className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-colors text-right"
          >
            <div>
              <div className="text-xs text-slate-500">Next</div>
              <div className="text-white font-semibold">{nextStage.title}</div>
            </div>
            <span className="text-2xl">→</span>
          </Link>
        )}
      </div>

      {/* JSON-LD: ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: stage.title,
            description: stage.description,
            numberOfItems: stage.notebooks.length,
            itemListElement: stage.notebooks.map((nb, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: nb.title,
              url: `${SITE_CONFIG.url}/notebook/${nb.slug}`,
              description: nb.description,
            })),
          }),
        }}
      />
    </>
  );
}
