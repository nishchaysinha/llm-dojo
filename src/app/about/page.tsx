import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | LLM Dojo",
  description: "Free, open-source curriculum for mastering LLM fine-tuning and inference. 83 notebooks, 7 stages, zero cost.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12 border-b pb-8" style={{ borderColor: "var(--line)" }}>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>About</div>
        <h1 className="font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", letterSpacing: "-0.02em" }}>
          LLM Dojo
        </h1>
      </div>

      <div className="space-y-12 text-sm" style={{ color: "var(--muted)" }}>
        <div>
          <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--sub)" }}>What</h2>
          <p className="leading-relaxed">
            An open-source curriculum for learning large language model fine-tuning and inference optimization from scratch.
            83 Jupyter notebooks organized into 7 stages. Every notebook runs on Google Colab free tier (T4 GPU, 15 GB VRAM).
          </p>
        </div>

        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--sub)" }}>Coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
            {[
              ["Stage 00", "Foundations — transformers, tokenization, datasets"],
              ["Stage 01", "Full fine-tuning — classification, generation, custom loss"],
              ["Stage 02", "PEFT — LoRA, QLoRA, adapters, prompt tuning, DoRA"],
              ["Stage 03", "Optimization — FlashAttention, DeepSpeed, FSDP"],
              ["Stage 04", "Alignment — RLHF, DPO, Constitutional AI, MoE"],
              ["Stage 05", "Production — CUDA, Triton, quantization, vLLM"],
              ["Inference", "KV cache, speculative decoding, GPTQ, AWQ, GGUF"],
            ].map(([stage, desc]) => (
              <div key={stage} className="px-5 py-4" style={{ background: "var(--bg)" }}>
                <div className="font-mono text-xs mb-1" style={{ color: "var(--accent)" }}>{stage}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--sub)" }}>Prerequisites</h2>
          <p className="leading-relaxed">
            Basic Python and PyTorch. You should know what a tensor is and how autograd works.
            No prior LLM experience required.
          </p>
        </div>

        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--sub)" }}>License</h2>
          <p className="leading-relaxed">MIT. Fork it, extend it, use it commercially.</p>
        </div>
      </div>

      <div className="mt-16 flex gap-4">
        <Link
          href="/stage/stage-0"
          className="btn-accent"
        >
          Start →
        </Link>
        <a
          href="https://github.com/nishchaysinha/llm-dojo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dim"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
