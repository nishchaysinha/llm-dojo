import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "Use with Claude Code | LLM Dojo",
  description:
    "Connect LLM Dojo to Claude Code as an MCP server. Query the full curriculum knowledge base from any Claude Code session.",
  alternates: { canonical: "/mcp" },
};

const MCP_URL = `${SITE_CONFIG.url}/api/mcp`;

export default function MCPPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b pb-8" style={{ borderColor: "var(--line)" }}>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>MCP Server</div>
        <h1 className="font-bold mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", letterSpacing: "-0.02em" }}>
          Use with Claude Code
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          LLM Dojo exposes a knowledge base MCP server. Connect it to Claude Code and any agent
          can query the full curriculum — finding the right notebook, concept, or Colab link for any LLM question.
        </p>
      </div>

      <div className="space-y-12">
        {/* Install */}
        <div>
          <h2 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--sub)" }}>
            01 — Install
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Run this once in your terminal. Works globally across all Claude Code sessions.
          </p>
          <pre className="text-sm p-5" style={{ background: "var(--bg1)", border: "1px solid var(--line)", color: "var(--accent)" }}>
            <code>{`claude mcp add llm-dojo --transport http ${MCP_URL} -s user`}</code>
          </pre>
          <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
            Requires Claude Code CLI. Install at{" "}
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer"
               className="underline-slide" style={{ color: "var(--sub)" }}>claude.ai/code</a>
          </p>
        </div>

        {/* What it does */}
        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--sub)" }}>
            02 — What it does
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
            Three tools are exposed. Claude uses them automatically when you ask LLM-related questions.
          </p>
          <div className="space-y-0 border-t" style={{ borderColor: "var(--line)" }}>
            {[
              {
                name: "search_curriculum",
                sig: 'search_curriculum("how to implement GRPO")',
                desc: "Semantic search over all 101 notebooks. Returns ranked results with descriptions, concept tags, and direct Colab links.",
              },
              {
                name: "list_stages",
                sig: "list_stages()",
                desc: "Returns all 8 curriculum stages with notebook counts and descriptions. Useful for understanding what's covered.",
              },
              {
                name: "get_notebook",
                sig: 'get_notebook("62-grpo-reasoning")',
                desc: "Full details for a specific notebook — description, concepts, duration, Colab link.",
              },
            ].map((t) => (
              <div key={t.name} className="py-6 border-b" style={{ borderColor: "var(--line)" }}>
                <div className="font-mono text-xs mb-2" style={{ color: "var(--accent)" }}>{t.name}</div>
                <pre className="text-xs mb-3 p-3" style={{ background: "var(--bg1)", border: "1px solid var(--line)", color: "var(--text)" }}>
                  <code>{t.sig}</code>
                </pre>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example session */}
        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--sub)" }}>
            03 — Example session
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            After connecting, Claude automatically queries the knowledge base when relevant:
          </p>
          <div className="space-y-3">
            {[
              { role: "you", text: "How do I train a reasoning model like DeepSeek-R1?" },
              { role: "claude", text: '→ calls search_curriculum("reasoning model DeepSeek GRPO")\n→ returns: Notebook 62 — GRPO: Reasoning Model Training\n   Group Relative Policy Optimization with verifiable rewards\n   Colab: github.com/nishchaysinha/llm-dojo/blob/main/notebooks/62_grpo_reasoning.ipynb' },
              { role: "you", text: "What's the difference between DPO, ORPO, and KTO?" },
              { role: "claude", text: "→ calls search_curriculum(\"DPO ORPO KTO comparison\")\n→ returns: Notebook 63 — Preference Algorithm Comparison\n   Side-by-side DPO vs ORPO vs KTO vs IPO on same dataset" },
            ].map((msg, i) => (
              <div key={i} className="p-4" style={{ background: "var(--bg1)", border: "1px solid var(--line)" }}>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: msg.role === "you" ? "var(--sub)" : "var(--accent)" }}>
                  {msg.role === "you" ? "you" : "claude code"}
                </div>
                <pre className="text-xs whitespace-pre-wrap font-mono" style={{ color: msg.role === "you" ? "var(--text)" : "var(--muted)" }}>
                  {msg.text}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Manual config */}
        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--sub)" }}>
            04 — Manual config (optional)
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Or add directly to <code>~/.claude/settings.json</code> for project-scoped use:
          </p>
          <pre className="text-xs p-5 overflow-x-auto" style={{ background: "var(--bg1)", border: "1px solid var(--line)", color: "var(--text)" }}>
            <code>{`{
  "mcpServers": {
    "llm-dojo": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`}</code>
          </pre>
        </div>

        {/* API */}
        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--sub)" }}>
            05 — Direct API
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            The search endpoint is also available as a plain HTTP API:
          </p>
          <pre className="text-xs p-4" style={{ background: "var(--bg1)", border: "1px solid var(--line)", color: "var(--text)" }}>
            <code>{`GET ${SITE_CONFIG.url}/api/search?q=LoRA+fine-tuning&k=5`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
