/**
 * HTTP MCP endpoint — implements the MCP protocol over HTTP POST.
 * Agents add this to their settings:
 *   { "mcpServers": { "llm-dojo": { "url": "https://llm-dojo-five.vercel.app/api/mcp", "transport": "http" } } }
 */
import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search";
import { SITE_CONFIG, allStages } from "@/data/curriculum";

export const runtime = "nodejs";

// MCP tool definitions
const TOOLS = [
  {
    name: "search_curriculum",
    description:
      "Search the LLM Dojo curriculum for notebooks, concepts, and techniques. " +
      "Returns the most relevant notebooks with descriptions, concept tags, and Colab links. " +
      "Use this to find how to implement specific LLM techniques (LoRA, GRPO, DPO, vLLM, etc.).",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "What you want to learn or find. E.g. 'how to implement GRPO', 'LoRA vs QLoRA', 'inference optimization'",
        },
        k: {
          type: "number",
          description: "Number of results to return (1-10, default 5)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "list_stages",
    description: "List all curriculum stages with their notebook counts and descriptions.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_notebook",
    description: "Get details about a specific notebook by its slug.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Notebook slug, e.g. '62-grpo-reasoning'" },
      },
      required: ["slug"],
    },
  },
];

type MCPRequest = {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
};

function ok(id: string | number, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function err(id: string | number | null, code: number, message: string) {
  return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } });
}

export async function POST(req: NextRequest) {
  let body: MCPRequest;
  try {
    body = await req.json();
  } catch {
    return err(null, -32700, "Parse error");
  }

  const { id, method, params } = body;

  // ── MCP protocol handlers ────────────────────────────────────
  if (method === "initialize") {
    return ok(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "llm-dojo", version: "1.0.0" },
    });
  }

  if (method === "tools/list") {
    return ok(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const toolName = (params as { name: string; arguments: Record<string, unknown> }).name;
    const args = (params as { name: string; arguments: Record<string, unknown> }).arguments ?? {};

    if (toolName === "search_curriculum") {
      const query = args.query as string;
      const k = Math.min(Math.max((args.k as number) || 5, 1), 10);
      const results = await search(query, k);

      const text = results.length === 0
        ? "No results found for that query."
        : results.map((r, i) =>
            `${i + 1}. **${r.title}** (slug: \`${r.slug}\`)\n` +
            `   ${r.text.slice(0, 200)}\n` +
            `   Concepts: ${r.concepts.slice(0, 5).join(", ")}\n` +
            `   URL: ${SITE_CONFIG.url}${r.url}\n` +
            `   Colab: https://colab.research.google.com/github/nishchaysinha/llm-dojo/blob/main/notebooks/${r.slug.replace(/-/g, "_").replace(/^(\d+)_/, "$1_")}.ipynb`
          ).join("\n\n");

      return ok(id, {
        content: [{ type: "text", text }],
      });
    }

    if (toolName === "list_stages") {
      const text = allStages.map(s =>
        `**Stage ${s.number}: ${s.title}** — ${s.notebooks.length} notebooks\n${s.description}`
      ).join("\n\n");
      return ok(id, { content: [{ type: "text", text }] });
    }

    if (toolName === "get_notebook") {
      const slug = args.slug as string;
      for (const stage of allStages) {
        const nb = stage.notebooks.find(n => n.slug === slug);
        if (nb) {
          const text =
            `**${nb.title}** (${stage.title})\n` +
            `${nb.description}\n\n` +
            `Concepts: ${nb.concepts.join(", ")}\n` +
            `Duration: ${nb.duration}\n` +
            `URL: ${SITE_CONFIG.url}/notebook/${nb.slug}\n` +
            `Colab: ${nb.colabUrl ?? "N/A"}`;
          return ok(id, { content: [{ type: "text", text }] });
        }
      }
      return ok(id, { content: [{ type: "text", text: `Notebook '${slug}' not found.` }] });
    }

    return err(id, -32601, `Unknown tool: ${toolName}`);
  }

  // notifications/initialized — no response needed
  if (method === "notifications/initialized") {
    return new NextResponse(null, { status: 204 });
  }

  return err(id, -32601, `Method not found: ${method}`);
}

// Health check
export async function GET() {
  return NextResponse.json({
    name: "llm-dojo MCP",
    tools: TOOLS.map(t => t.name),
    notebooks: allStages.reduce((s, st) => s + st.notebooks.length, 0),
  });
}
