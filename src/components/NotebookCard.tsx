import Link from "next/link";
import { Notebook, Stage } from "@/data/curriculum";

export default function NotebookCard({
  notebook,
  stage,
}: {
  notebook: Notebook;
  stage: Stage;
}) {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-orange-500/40 transition-all duration-200 hover:bg-slate-800/60">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono font-semibold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
          #{notebook.number}
        </span>
        <span className="text-xs text-slate-500">{notebook.duration}</span>
      </div>

      <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
        {notebook.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {notebook.description}
      </p>

      {/* Concept tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {notebook.concepts.slice(0, 4).map((c) => (
          <span
            key={c}
            className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700"
          >
            {c}
          </span>
        ))}
        {notebook.concepts.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-500">
            +{notebook.concepts.length - 4}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/notebook/${notebook.slug}`}
          className="flex-1 text-center text-sm py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-medium transition-colors"
        >
          Study
        </Link>
        {notebook.colabUrl && (
          <a
            href={notebook.colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm py-2 px-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.9 4.8C14.9 2.8 12.4 1.8 9.8 1.8c-2.6 0-5 1-6.9 2.8C1 6.5 0 9 0 11.5s1 5 2.8 6.9c1.9 1.9 4.4 2.8 6.9 2.8 2.6 0 5-1 6.9-2.8l-1.4-1.4c-1.5 1.5-3.4 2.3-5.5 2.3-2.1 0-4-.8-5.5-2.3C2.8 15.5 2 13.6 2 11.5s.8-4 2.3-5.5C5.8 4.5 7.7 3.7 9.8 3.7c2.1 0 4 .8 5.5 2.3l1.6-1.2z"/>
              <path d="M22 11.5c0-2.1-.8-4-2.3-5.5l-1.4 1.4c1.5 1.5 2.3 3.4 2.3 5.5s-.8 4-2.3 5.5l1.4 1.4C21.2 17.4 22 14.9 22 12.5v-1z"/>
            </svg>
            Colab
          </a>
        )}
      </div>
    </div>
  );
}
