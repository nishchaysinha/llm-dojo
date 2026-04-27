import Link from "next/link";
import { Notebook, Stage } from "@/data/curriculum";

export default function NotebookCard({ notebook, stage }: { notebook: Notebook; stage: Stage }) {
  return (
    <div className="card p-5 group flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
          {notebook.number}
        </span>
        <span className="text-xs" style={{ color: "var(--dim)" }}>{notebook.duration}</span>
      </div>

      <h3 className="text-sm font-bold mb-2" style={{ color: "var(--bright)" }}>
        {notebook.title}
      </h3>

      <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "var(--muted)" }}>
        {notebook.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {notebook.concepts.slice(0, 4).map((c) => (
          <span key={c} className="tag">{c}</span>
        ))}
        {notebook.concepts.length > 4 && (
          <span className="tag">+{notebook.concepts.length - 4}</span>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <Link href={`/notebook/${notebook.slug}`} className="card-btn-study">
          Study
        </Link>
        {notebook.colabUrl && (
          <a href={notebook.colabUrl} target="_blank" rel="noopener noreferrer" className="card-btn-colab">
            Colab
          </a>
        )}
      </div>
    </div>
  );
}
