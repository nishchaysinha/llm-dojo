import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allStages, getNotebookBySlug, SITE_CONFIG } from "@/data/curriculum";
import AdBanner from "@/components/AdBanner";
import { getNotebookContent } from "@/lib/notebookContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allStages.flatMap((s) => s.notebooks.map((n) => ({ slug: n.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getNotebookBySlug(slug);
  if (!result) return {};
  const { notebook, stage } = result;
  const title = `${notebook.title} — ${stage.title} | ${SITE_CONFIG.name}`;
  const description = `${notebook.description} Key concepts: ${notebook.concepts.join(", ")}.`;
  return {
    title,
    description,
    keywords: [...notebook.concepts, ...SITE_CONFIG.keywords.slice(0, 5)],
    openGraph: { title, description, url: `/notebook/${slug}` },
    twitter: { title, description },
    alternates: { canonical: `/notebook/${slug}` },
  };
}

export default async function NotebookPage({ params }: Props) {
  const { slug } = await params;
  const result = getNotebookBySlug(slug);
  if (!result) notFound();
  const { notebook, stage } = result;

  const content = getNotebookContent(slug);

  // Sibling notebooks
  const idx = stage.notebooks.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? stage.notebooks[idx - 1] : null;
  const next = idx < stage.notebooks.length - 1 ? stage.notebooks[idx + 1] : null;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <ol className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <li><Link href="/" className="hover:text-slate-300">Home</Link></li>
          <li>/</li>
          <li><Link href={`/stage/${stage.id}`} className="hover:text-slate-300">{stage.title}</Link></li>
          <li>/</li>
          <li className="text-slate-300">{notebook.title}</li>
        </ol>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Header */}
        <header className="py-10 border-b border-slate-800 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-orange-400 bg-orange-400/10 px-2.5 py-1 rounded-lg text-sm font-bold">
              #{notebook.number}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${stage.beltColor}`}>
              {stage.belt}
            </span>
            <span className="text-slate-500 text-sm">{notebook.duration}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {notebook.title}
          </h1>
          <p className="text-xl text-slate-400 mb-6 leading-relaxed max-w-3xl">
            {notebook.description}
          </p>

          {/* Concept tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {notebook.concepts.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-sm bg-slate-800 text-slate-300 border border-slate-700"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            {notebook.colabUrl && (
              <a
                href={notebook.colabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold transition-colors shadow-lg shadow-orange-500/25"
              >
                <span>🚀</span> Open in Google Colab
              </a>
            )}
            <a
              href={`https://github.com/YOUR_GITHUB_USERNAME/llm-dojo`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-white font-semibold transition-colors"
            >
              <span>⭐</span> Star on GitHub
            </a>
          </div>
        </header>

        {/* Ad before content */}
        <AdBanner adSlot="3456789012" adFormat="horizontal" fullWidth />

        {/* Main content */}
        <article className="prose prose-invert prose-slate max-w-none mt-10">
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </article>

        {/* Mid-article ad */}
        <AdBanner adSlot="4567890123" adFormat="rectangle" className="my-12" />

        {/* Key Takeaways */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            {content.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <span className="text-orange-400 mt-0.5 shrink-0">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Concept deep-dives */}
        {content.concepts.length > 0 && (
          <div className="mt-8 grid gap-4">
            <h2 className="text-2xl font-bold text-white">📚 Core Concepts</h2>
            {content.concepts.map((c) => (
              <div key={c.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-orange-400 mb-2">{c.name}</h3>
                <p className="text-slate-400 leading-relaxed">{c.explanation}</p>
                {c.code && (
                  <pre className="mt-4 p-4 bg-slate-950 rounded-lg overflow-x-auto text-sm">
                    <code className="text-green-300 font-mono">{c.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Notebook navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
          {prev ? (
            <Link
              href={`/notebook/${prev.slug}`}
              className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-colors"
            >
              <span className="text-xl">←</span>
              <div>
                <div className="text-xs text-slate-500">Previous</div>
                <div className="text-white font-semibold">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <Link
              href={`/stage/${stage.id}`}
              className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-colors"
            >
              <span className="text-xl">←</span>
              <div>
                <div className="text-xs text-slate-500">Back to Stage</div>
                <div className="text-white font-semibold">{stage.title}</div>
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={`/notebook/${next.slug}`}
              className="flex items-center justify-end gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-colors text-right"
            >
              <div>
                <div className="text-xs text-slate-500">Next Notebook</div>
                <div className="text-white font-semibold">{next.title}</div>
              </div>
              <span className="text-xl">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* JSON-LD: LearningResource */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: notebook.title,
            description: notebook.description,
            url: `${SITE_CONFIG.url}/notebook/${slug}`,
            educationalLevel: stage.belt,
            timeRequired: `PT${notebook.duration.replace(" min", "M")}`,
            keywords: notebook.concepts.join(", "),
            learningResourceType: "Jupyter Notebook",
            isAccessibleForFree: true,
            inLanguage: "en",
            isPartOf: {
              "@type": "Course",
              name: stage.title,
              url: `${SITE_CONFIG.url}/stage/${stage.id}`,
            },
            provider: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          }),
        }}
      />
    </>
  );
}
