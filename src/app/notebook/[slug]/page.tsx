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
  const description = `${notebook.description} Concepts: ${notebook.concepts.join(", ")}.`;
  return {
    title, description,
    keywords: [...notebook.concepts, ...SITE_CONFIG.keywords.slice(0, 5)],
    openGraph: { title, description, url: `/notebook/${slug}` },
    alternates: { canonical: `/notebook/${slug}` },
  };
}

export default async function NotebookPage({ params }: Props) {
  const { slug } = await params;
  const result = getNotebookBySlug(slug);
  if (!result) notFound();
  const { notebook, stage } = result;
  const content = getNotebookContent(slug);
  const idx = stage.notebooks.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? stage.notebooks[idx - 1] : null;
  const next = idx < stage.notebooks.length - 1 ? stage.notebooks[idx + 1] : null;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto px-6 pt-6">
        <div className="text-xs" style={{ color: "var(--dim)" }}>
          <Link href="/" className="underline-slide" style={{ color: "var(--muted)" }}>home</Link>
          <span className="mx-2">/</span>
          <Link href={`/stage/${stage.id}`} className="underline-slide" style={{ color: "var(--muted)" }}>{stage.id}</Link>
          <span className="mx-2">/</span>
          <span style={{ color: "var(--sub)" }}>{notebook.slug}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* Header */}
        <header className="pt-10 pb-10 border-b mb-10" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{notebook.number}</span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>Stage {String(stage.number).padStart(2, "0")}</span>
            <span className="text-xs" style={{ color: "var(--dim)" }}>{notebook.duration}</span>
          </div>

          <h1 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", color: "var(--white)", letterSpacing: "-0.02em" }}>
            {notebook.title}
          </h1>
          <p className="text-sm leading-relaxed mb-6 max-w-3xl" style={{ color: "var(--muted)" }}>
            {notebook.description}
          </p>

          {/* Concept tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {notebook.concepts.map((c) => <span key={c} className="tag">{c}</span>)}
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            {notebook.colabUrl && (
              <a
                href={notebook.colabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Open in Colab →
              </a>
            )}
            <a
              href="https://github.com/nishchaysinha/llm-dojo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dim"
            >
              GitHub
            </a>
          </div>
        </header>

        <AdBanner adSlot="3456789012" adFormat="horizontal" fullWidth />

        {/* Content */}
        <article className="prose prose-invert max-w-none mt-10">
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </article>

        <AdBanner adSlot="4567890123" adFormat="rectangle" className="my-12" />

        {/* Takeaways */}
        <div className="mt-12 border p-8" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--sub)" }}>Key Takeaways</h2>
          <ul className="space-y-3">
            {content.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Concepts */}
        {content.concepts.length > 0 && (
          <div className="mt-8 space-y-0 border-t" style={{ borderColor: "var(--line)" }}>
            <h2 className="text-xs uppercase tracking-widest pt-8 mb-5" style={{ color: "var(--sub)" }}>Core Concepts</h2>
            {content.concepts.map((c) => (
              <div key={c.name} className="border-b py-6" style={{ borderColor: "var(--line)" }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: "var(--bright)" }}>{c.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{c.explanation}</p>
                {c.code && (
                  <pre className="text-xs" style={{ color: "var(--text)" }}>
                    <code>{c.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Nav */}
        <div className="mt-12 grid grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
          {prev ? (
            <Link href={`/notebook/${prev.slug}`} className="p-5 transition-colors" style={{ background: "var(--bg)" }} >
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--dim)" }}>← Previous</div>
              <div className="text-sm" style={{ color: "var(--text)" }}>{prev.title}</div>
            </Link>
          ) : (
            <Link href={`/stage/${stage.id}`} className="p-5 transition-colors" style={{ background: "var(--bg)" }} >
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--dim)" }}>← Stage</div>
              <div className="text-sm" style={{ color: "var(--text)" }}>{stage.title}</div>
            </Link>
          )}
          {next ? (
            <Link href={`/notebook/${next.slug}`} className="p-5 text-right transition-colors" style={{ background: "var(--bg)" }} >
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--dim)" }}>Next →</div>
              <div className="text-sm" style={{ color: "var(--text)" }}>{next.title}</div>
            </Link>
          ) : <div style={{ background: "var(--bg)" }} />}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LearningResource",
        name: notebook.title, description: notebook.description,
        url: `${SITE_CONFIG.url}/notebook/${slug}`,
        keywords: notebook.concepts.join(", "),
        isAccessibleForFree: true, inLanguage: "en",
        provider: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
      })}} />
    </>
  );
}
