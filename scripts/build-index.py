"""
Build-time script: parse notebooks → chunk → embed → write public/search-index.json
Run once before deploying: python3 scripts/build-index.py
"""
import json, re, math, os, sys, time
from pathlib import Path

ROOT = Path(__file__).parent.parent
NB_DIRS = [ROOT / "notebooks", ROOT / "inference_notebooks"]
CURRICULUM = ROOT / "src/data/curriculum.ts"
OUT = ROOT / "public/search-index.json"

# ── Parse curriculum.ts for metadata ──────────────────────────
curriculum_text = CURRICULUM.read_text()

def extract_meta():
    result = {}
    for m in re.finditer(
        r'slug:\s*"([^"]+)"[^}]*?title:\s*"([^"]+)"[^}]*?description:\s*"([^"]+)"[^}]*?concepts:\s*\[([^\]]+)\]',
        curriculum_text, re.DOTALL
    ):
        slug, title, desc, conc_raw = m.groups()
        result[slug] = {
            "title": title, "description": desc,
            "concepts": re.findall(r'"([^"]+)"', conc_raw),
        }
    return result

meta = extract_meta()
print(f"Curriculum: {len(meta)} notebooks")

# ── Read notebooks ─────────────────────────────────────────────
def nb_text(path):
    nb = json.loads(Path(path).read_text())
    return "\n\n".join("".join(c.get("source", [])) for c in nb.get("cells", []) if "".join(c.get("source", [])).strip())

def chunks(text, size=300, overlap=50):
    words = text.split()
    out = []
    i = 0
    while i < len(words):
        out.append(" ".join(words[i:i+size]))
        i += size - overlap
    return out

# Map filename stems to slugs
def find_slug(stem):
    num = stem.split("_")[0]
    for slug in meta:
        if num in slug or stem.replace("_", "-") in slug:
            return slug
    return stem.replace("_", "-")

corpus = []
for nb_dir in NB_DIRS:
    if not nb_dir.exists(): continue
    for nb_file in sorted(nb_dir.glob("*.ipynb")):
        stem = nb_file.stem
        slug = find_slug(stem)
        m = meta.get(slug, {})
        title = m.get("title", stem.replace("_"," ").title())
        desc = m.get("description", "")
        concepts = m.get("concepts", [])
        text = nb_text(nb_file)
        if not text.strip(): continue
        # Header chunk (metadata-rich, always included)
        corpus.append({"id":f"{stem}__h","slug":slug,"title":title,
                        "text":f"{title}. {desc} Topics: {', '.join(concepts)}",
                        "concepts":concepts,"chunk":0})
        # Content chunks
        for i, ch in enumerate(chunks(text)[:5]):
            corpus.append({"id":f"{stem}__c{i}","slug":slug,"title":title,
                           "text":ch[:600],"concepts":concepts,"chunk":i+1})

print(f"Corpus: {len(corpus)} chunks from {len(set(c['slug'] for c in corpus))} notebooks")

# ── Embed ──────────────────────────────────────────────────────
print("Embedding with all-MiniLM-L6-v2...")
t0 = time.time()
try:
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    embs = model.encode([c["text"] for c in corpus], batch_size=64,
                         show_progress_bar=True, normalize_embeddings=True).tolist()
except Exception as e:
    print(f"sentence-transformers failed ({e}), using TF-IDF hash fallback")
    import hashlib
    def hash_embed(text, dim=384):
        words = text.lower().split()
        vec = [0.0]*dim
        for w in words:
            h = int(hashlib.md5(w.encode()).hexdigest(), 16)
            for shift in range(min(len(w), 4)):
                vec[(h >> (shift*8)) % dim] += 1.0
        n = math.sqrt(sum(x*x for x in vec)) or 1.0
        return [x/n for x in vec]
    embs = [hash_embed(c["text"]) for c in corpus]

print(f"Done in {time.time()-t0:.1f}s | dim={len(embs[0])}")

# ── Write ──────────────────────────────────────────────────────
index = {"version":1,"dim":len(embs[0]),"chunks":len(corpus),
         "entries":[{**c,"embedding":embs[i]} for i,c in enumerate(corpus)]}
OUT.parent.mkdir(parents=True, exist_ok=True)
with open(OUT, "w") as f:
    json.dump(index, f, separators=(",",":"))
print(f"✅ {OUT} — {OUT.stat().st_size/1024:.0f} KB, {len(corpus)} chunks")
