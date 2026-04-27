import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "About LLM Dojo",
  description:
    "LLM Dojo is a free, open-source curriculum for mastering LLM fine-tuning and inference. 83 hands-on Google Colab notebooks, 7 stages, zero cost.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <span className="text-7xl">🥋</span>
        <h1 className="text-4xl font-black text-white mt-4 mb-4">About LLM Dojo</h1>
        <p className="text-xl text-slate-400">
          Free, open-source mastery curriculum for large language models.
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none">
        <h2>What is LLM Dojo?</h2>
        <p>
          LLM Dojo is a structured, hands-on curriculum for learning large language model
          fine-tuning and inference optimization. It&apos;s built around 83 Google Colab notebooks
          that you can run for free using a T4 GPU.
        </p>
        <p>
          The curriculum is organized as a martial arts belt system — each stage builds
          progressively on the last. Start with transformer fundamentals, advance through
          full fine-tuning and LoRA, master alignment techniques like RLHF and DPO, and
          eventually write custom CUDA kernels and deploy production inference systems.
        </p>

        <h2>Who Is This For?</h2>
        <ul>
          <li>ML engineers who want to fine-tune LLMs for production use cases</li>
          <li>Researchers building on top of pre-trained models</li>
          <li>Students transitioning from basic deep learning to LLM specialization</li>
          <li>Anyone who wants to understand what&apos;s actually happening inside tools like LoRA, vLLM, or GPTQ</li>
        </ul>

        <h2>Prerequisites</h2>
        <p>Basic Python and PyTorch familiarity. You should be comfortable with tensors,
        autograd, and neural network layers. No prior LLM experience required.</p>

        <h2>The Belt System</h2>
        <ul>
          <li>🤍 <strong>White Belt</strong> — Foundations & Environment (Stage 0)</li>
          <li>💛 <strong>Yellow Belt</strong> — Full Fine-Tuning (Stage 1)</li>
          <li>💚 <strong>Green Belt</strong> — LoRA & PEFT (Stage 2)</li>
          <li>💙 <strong>Blue Belt</strong> — Advanced Optimization (Stage 3)</li>
          <li>🤎 <strong>Brown Belt</strong> — Alignment & RLHF (Stage 4)</li>
          <li>🖤 <strong>Black Belt</strong> — Custom Kernels & Production (Stage 5)</li>
          <li>❤️ <strong>Red Belt</strong> — Inference Optimization (Inference Track)</li>
        </ul>

        <h2>Open Source</h2>
        <p>
          All notebooks, website source, and curriculum content are MIT licensed.
          Contributions are welcome — open a PR to add notebooks, fix bugs, or improve explanations.
        </p>
      </div>

      <div className="mt-12 flex gap-4 justify-center">
        <Link
          href="/stage/stage-0"
          className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold transition-colors"
        >
          Start Learning →
        </Link>
        <a
          href="https://github.com/nishchaysinha/llm-dojo"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-white font-semibold transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
