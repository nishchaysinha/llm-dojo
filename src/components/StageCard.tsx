import Link from "next/link";
import { Stage } from "@/data/curriculum";

export default function StageCard({ stage }: { stage: Stage }) {
  return (
    <Link href={`/stage/${stage.id}`} className="card block p-6 group">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Stage {String(stage.number).padStart(2, "0")}
        </span>
        <span className="text-xs" style={{ color: "var(--dim)" }}>
          {stage.notebooks.length} notebooks
        </span>
      </div>

      <h3 className="text-sm font-bold mb-2 transition-colors" style={{ color: "var(--bright)", letterSpacing: "0.02em" }}>
        {stage.title}
      </h3>

      <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
        {stage.description}
      </p>

      <div className="text-xs transition-colors" style={{ color: "var(--dim)" }}>
        <span className="group-hover:text-[var(--text)] transition-colors">
          open_stage() →
        </span>
      </div>
    </Link>
  );
}
