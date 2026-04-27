// In-memory vector search — loaded once, kept in module scope across requests.
// 494 chunks × 384-dim = ~760KB in memory. Fast cosine similarity, no external deps.

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

// Module-level cache — survives across requests in the same serverless instance
let _index: Index | null = null;

async function loadIndex(): Promise<Index> {
  if (_index) return _index;
  // On Vercel, public/ files are served as static assets — use fs in serverless runtime
  try {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "search-index.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    _index = JSON.parse(raw) as Index;
  } catch {
    // Fallback: fetch over HTTP (dev mode or if file not found)
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/search-index.json`);
    _index = (await res.json()) as Index;
  }
  return _index;
}

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(v: number[]): number {
  return Math.sqrt(v.reduce((s, x) => s + x * x, 0));
}

function cosine(a: number[], b: number[]): number {
  const n = norm(a) * norm(b);
  return n === 0 ? 0 : dot(a, b) / n;
}

// Simple bag-of-words query embedding — works without a model at runtime.
// Each word hashed to a dimension index, weighted by IDF-like inverse frequency.
function embedQuery(query: string, dim: number): number[] {
  const words = query.toLowerCase().split(/\W+/).filter(Boolean);
  const vec = new Array<number>(dim).fill(0);
  const stopwords = new Set(["what","is","how","does","the","a","an","in","to","of","and","or","for","with","that","this","are","was","be"]);
  for (const word of words) {
    if (stopwords.has(word) || word.length < 2) continue;
    // FNV-1a-like hash → two bucket placements for each word
    let h = 2166136261;
    for (let i = 0; i < word.length; i++) {
      h ^= word.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    vec[((h >>> 0) % dim + dim) % dim] += 1;
    vec[(((h >>> 8) >>> 0) % dim + dim) % dim] += 0.5;
  }
  const n = norm(vec);
  return n === 0 ? vec : vec.map(x => x / n);
}

function keywordScore(query: string, entry: Entry): number {
  // Exact keyword matching against title + concepts — no embedding needed.
  // Handles proper nouns like "GRPO", "LoRA", "vLLM" that hash-embedding misses.
  const q = query.toLowerCase();
  const qWords = q.split(/\W+/).filter(w => w.length > 1);
  const titleLower = entry.title.toLowerCase();
  const conceptsLower = entry.concepts.map(c => c.toLowerCase()).join(" ");
  const textLower = entry.text.toLowerCase();

  let score = 0;
  for (const word of qWords) {
    // Title match: highest weight
    if (titleLower.includes(word)) score += 0.4;
    // Concept match: high weight
    if (conceptsLower.includes(word)) score += 0.3;
    // Header chunk text match
    if (entry.chunk === 0 && textLower.includes(word)) score += 0.2;
    // Content chunk text match
    if (entry.chunk > 0 && textLower.includes(word)) score += 0.05;
  }
  // Bonus: header chunks (title+description) are more reliable signals
  if (entry.chunk === 0) score += 0.1;
  return Math.min(score, 1.0);
}

export async function search(query: string, topK = 5): Promise<SearchResult[]> {
  const index = await loadIndex();
  const qvec = embedQuery(query, index.dim);

  const scored = index.entries.map(e => {
    const vectorScore = cosine(qvec, e.embedding);
    const kwScore = keywordScore(query, e);
    // Hybrid: keyword score dominates for proper nouns/acronyms,
    // vector score adds semantic similarity for natural language queries
    const finalScore = 0.5 * vectorScore + 0.5 * kwScore;
    return { ...e, score: finalScore };
  });

  // Sort by score, deduplicate by slug (keep best chunk per notebook)
  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const e of scored.sort((a, b) => b.score - a.score)) {
    if (seen.has(e.slug)) continue;
    seen.add(e.slug);
    results.push({
      slug: e.slug,
      title: e.title,
      text: e.text.slice(0, 300),
      concepts: e.concepts,
      score: e.score,
      url: `/notebook/${e.slug}`,
    });
    if (results.length >= topK) break;
  }

  return results;
}
