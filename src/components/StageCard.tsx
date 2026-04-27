import Link from "next/link";
import { Stage } from "@/data/curriculum";

export default function StageCard({ stage }: { stage: Stage }) {
  const icons = ["🤍", "💛", "💚", "💙", "🤎", "🖤", "❤️"];
  return (
    <Link
      href={`/stage/${stage.id}`}
      className="group block bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/5"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl mb-2">{icons[stage.number] ?? "📘"}</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Stage {stage.number}
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
            {stage.title}
          </h3>
        </div>
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${stage.beltColor}`}
        >
          {stage.belt}
        </span>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        {stage.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {stage.notebooks.length} notebooks
        </span>
        <span className="text-orange-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
          Start training →
        </span>
      </div>
    </Link>
  );
}
