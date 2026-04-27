// In-memory vector search using real MiniLM embeddings at query time.
// Uses @huggingface/transformers (Transformers.js v3) — same model as the index,
// runs in Node.js serverless functions on Vercel with no Python required.

type Entry = {
  id: string;
  slug: string;
  title: string;
  text: string;
  concepts: string[];
  chunk: number;
  embedding: number[];
};

type Index = {
  version: number;
  dim: number;
  chunks: number;
  entries: Entry[];
};

export type SearchResult = {
  slug: string;
  title: string;
  text: string;
  concepts: string[];
  score: number;
  url: string;
};

// Module-level caches — survive across requests in the same serverless instance
let _index: Index | null = null;
let _extractor: ((text: string, opts: object) => Promise<{ data: Float32Array }>) | null = null;

async function loadIndex(): Promise<Index> {
  if (_index) return _index;
  try {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "search-index.json");
    _index = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Index;
  } catch {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    _index = await fetch(`${base}/search-index.json`).then(r => r.json());
  }
  return _index!;
}

async function loadExtractor() {
  if (_extractor) return _extractor;
  // Dynamic import keeps Transformers.js out of the client bundle
  const { pipeline, env } = await import("@huggingface/transformers");
  // Cache model files in /tmp on Vercel (writable, persists within warm instance)
  env.cacheDir = "/tmp/transformers-cache";
  env.allowRemoteModels = true;
  const pipe = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
    dtype: "fp32",
  });
  // Wrap to match our simple interface
  _extractor = async (text: string, opts: object) => {
    const out = await (pipe as (text: string, opts: object) => Promise<{ data: Float32Array }>)(text, opts);
    return out;
  };
  return _extractor;
}

async function embedQuery(query: string): Promise<number[]> {
  try {
    const extractor = await loadExtractor();
    const out = await extractor(query, { pooling: "mean", normalize: true });
    return Array.from(out.data);
  } catch {
    // Fallback to keyword hash if model load fails
    return hashEmbed(query, 384);
  }
}

function hashEmbed(query: string, dim: number): number[] {
  const words = query.toLowerCase().split(/\W+/).filter(w => w.length > 1);
  const vec = new Array<number>(dim).fill(0);
  for (const word of words) {
    let h = 2166136261;
    for (let i = 0; i < word.length; i++) { h ^= word.charCodeAt(i); h = Math.imul(h, 16777619); }
    vec[((h >>> 0) % dim + dim) % dim] += 1;
    vec[(((h >>> 8) >>> 0) % dim + dim) % dim] += 0.5;
  }
  const n = Math.sqrt(vec.reduce((s, x) => s + x * x, 0));
  return n === 0 ? vec : vec.map(x => x / n);
}

function dot(a: number[], b: number[]) { return a.reduce((s, x, i) => s + x * b[i], 0); }
function norm(v: number[]) { return Math.sqrt(v.reduce((s, x) => s + x * x, 0)); }
function cosine(a: number[], b: number[]) { const n = norm(a) * norm(b); return n === 0 ? 0 : dot(a, b) / n; }

function keywordBoost(query: string, entry: Entry): number {
  const q = query.toLowerCase();
  const qWords = q.split(/\W+/).filter(w => w.length > 1);
  const title = entry.title.toLowerCase();
  const concepts = entry.concepts.map(c => c.toLowerCase()).join(" ");
  let score = 0;
  for (const word of qWords) {
    if (title.includes(word)) score += 0.3;
    if (concepts.includes(word)) score += 0.2;
  }
  if (entry.chunk === 0) score += 0.05; // slight header preference
  return Math.min(score, 0.8);
}

export async function search(query: string, topK = 5): Promise<SearchResult[]> {
  const [index, qvec] = await Promise.all([loadIndex(), embedQuery(query)]);

  const scored = index.entries.map(e => ({
    ...e,
    score: cosine(qvec, e.embedding) + keywordBoost(query, e),
  }));

  const seen = new Set<string>();
  const results: SearchResult[] = [];
  for (const e of scored.sort((a, b) => b.score - a.score)) {
    if (seen.has(e.slug)) continue;
    seen.add(e.slug);
    results.push({ slug: e.slug, title: e.title, text: e.text.slice(0, 300), concepts: e.concepts, score: e.score, url: `/notebook/${e.slug}` });
    if (results.length >= topK) break;
  }
  return results;
}
