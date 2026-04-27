# 🥋 LLM Dojo

**Master LLM Fine-Tuning & Inference — From White Belt to Black Belt**

Free, open-source curriculum for mastering large language models. 83 hands-on Google Colab notebooks across 7 stages — from transformer basics to custom CUDA kernels and production inference.

---

## Curriculum

| Stage | Belt | Topics | Notebooks |
|-------|------|--------|-----------|
| 0 | 🤍 White | Foundations, Transformers, Tokenization, Data | 7 |
| 1 | 💛 Yellow | Full Fine-Tuning, Custom Loss, AMP, Evaluation | 10 |
| 2 | 💚 Green | LoRA, QLoRA, Adapters, Prompt Tuning, DoRA | 10 |
| 3 | 💙 Blue | FlashAttention, DeepSpeed, FSDP, Instruction Tuning | 10 |
| 4 | 🤎 Brown | RLHF, DPO, Constitutional AI, MoE, Safety | 10 |
| 5 | 🖤 Black | CUDA Kernels, Triton, Quantization, vLLM, TRT-LLM | 10 |
| Inf | ❤️ Red | Inference Optimization, KV Cache, GPTQ, AWQ, GGUF | 23 |

## Run Locally

```bash
npm install && npm run dev
```

Open http://localhost:3000

## Before Pushing to Git

1. Replace `YOUR_GITHUB_USERNAME` everywhere with your GitHub username
2. Update `SITE_CONFIG.url` in `src/data/curriculum.ts`
3. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your AdSense publisher ID in `src/app/layout.tsx` and `src/components/AdBanner.tsx`
4. Replace ad slot placeholder IDs with real ad unit IDs

## Deploy to Vercel

```bash
npx vercel --prod
```

## SEO

- Per-page metadata, OG tags, Twitter cards
- JSON-LD: WebSite, Course, LearningResource, ItemList
- Auto-generated sitemap.xml (92 URLs)
- robots.txt
- All 92 pages statically pre-rendered

## License

MIT
