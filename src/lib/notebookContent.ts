// Generates rich, SEO-friendly content for each notebook page.
// In production, this would parse the actual .ipynb files.
// Currently provides structured content derived from the notebook curriculum.

type ConceptEntry = { name: string; explanation: string; code?: string };
type NotebookContentResult = {
  html: string;
  takeaways: string[];
  concepts: ConceptEntry[];
};

const notebookData: Record<string, NotebookContentResult> = {
  "00-environment-setup": {
    takeaways: [
      "Verify CUDA availability with torch.cuda.is_available() before any training",
      "bitsandbytes and trl are NOT pre-installed on Colab — always pip install them",
      "Use HuggingFace token for gated models like LLaMA-2 and Mistral",
      "GPU memory monitoring prevents OOM crashes during training",
      "Project directory structure prevents notebook clutter and model confusion",
    ],
    concepts: [
      {
        name: "CUDA & GPU Detection",
        explanation:
          "CUDA (Compute Unified Device Architecture) is NVIDIA's parallel computing platform. PyTorch uses CUDA to offload tensor operations to the GPU, enabling training speeds 50-100x faster than CPU. Always check torch.cuda.is_available() and inspect compute capability — Flash Attention requires CC ≥ 8.0 (Ampere or newer).",
        code: `import torch\nprint(f"CUDA: {torch.cuda.is_available()}")\nprint(f"GPU: {torch.cuda.get_device_name(0)}")\nprint(f"VRAM: {torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")`,
      },
      {
        name: "Key Libraries for LLM Training",
        explanation:
          "transformers provides pre-trained models and training utilities. datasets enables fast, memory-mapped data loading. peft implements LoRA/QLoRA. bitsandbytes provides 4-bit/8-bit quantization. trl contains PPO and DPO trainers for alignment. accelerate handles multi-GPU and mixed precision transparently.",
        code: `pip install transformers datasets peft bitsandbytes trl accelerate evaluate`,
      },
    ],
    html: `
<h2>Why Environment Setup Matters</h2>
<p>The most common cause of failed LLM training runs is not the algorithm — it's the environment. Wrong CUDA version, missing libraries, or insufficient GPU memory can silently corrupt results or cause cryptic errors hours into a training run.</p>

<h3>GPU Requirements by Task</h3>
<table>
<thead><tr><th>Task</th><th>Minimum VRAM</th><th>Recommended</th></tr></thead>
<tbody>
<tr><td>Fine-tune 7B (QLoRA)</td><td>12 GB</td><td>24 GB</td></tr>
<tr><td>Fine-tune 13B (QLoRA)</td><td>16 GB</td><td>40 GB</td></tr>
<tr><td>Full fine-tune GPT-2</td><td>4 GB</td><td>8 GB</td></tr>
<tr><td>Inference 7B (4-bit)</td><td>6 GB</td><td>8 GB</td></tr>
</tbody>
</table>

<h3>Colab GPU Tiers</h3>
<p>Google Colab provides free access to NVIDIA T4 (15 GB VRAM) GPUs. Colab Pro adds A100 (40/80 GB) access. For this curriculum, a T4 is sufficient through Stage 4. Stage 5 kernels benefit from A100 for Flash Attention and TensorRT-LLM.</p>

<h3>Essential Checks Before Every Session</h3>
<pre><code class="language-python">import torch

# 1. Verify GPU
assert torch.cuda.is_available(), "No GPU — switch to GPU runtime"

# 2. Check VRAM
free, total = torch.cuda.mem_get_info()
print(f"Free: {free/1e9:.1f} GB / {total/1e9:.1f} GB")

# 3. Clear stale memory
torch.cuda.empty_cache()
import gc; gc.collect()</code></pre>

<h2>HuggingFace Authentication</h2>
<p>Models like LLaMA-2, Mistral, and Gemma are "gated" — you must accept the license on HuggingFace Hub before downloading. Set your token as a Colab secret named <code>HF_TOKEN</code> to avoid exposing it in notebook cells.</p>
`,
  },

  "01-transformer-basics": {
    takeaways: [
      "Attention computes a weighted sum of values, where weights come from query-key similarity",
      "Multi-head attention runs h parallel attention heads and concatenates results",
      "Positional encoding injects sequence order since attention is permutation-invariant",
      "Transformer compute scales as O(N²·d) with sequence length N — the core bottleneck",
      "Flash Attention reduces memory from O(N²) to O(N) via tiling — essential for long context",
    ],
    concepts: [
      {
        name: "Scaled Dot-Product Attention",
        explanation:
          "The core operation: Attention(Q,K,V) = softmax(QK^T / √d_k) · V. The √d_k scaling prevents softmax saturation for large embedding dimensions. Without scaling, the dot products grow large, pushing softmax into regions with near-zero gradients.",
        code: `def attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = Q @ K.transpose(-2, -1) / d_k**0.5\n    return F.softmax(scores, dim=-1) @ V`,
      },
      {
        name: "Multi-Head Attention",
        explanation:
          "Instead of one attention function, run h attention heads in parallel on projected subspaces. Each head can attend to different positional relationships. Outputs are concatenated and linearly projected: MultiHead(Q,K,V) = Concat(head_1,...,head_h) · W_O.",
        code: `# h=8 heads, d_model=512, d_k = d_model/h = 64\nQ = W_q(x).view(B, T, h, d_k).transpose(1, 2)  # (B, h, T, d_k)\nK = W_k(x).view(B, T, h, d_k).transpose(1, 2)\nV = W_v(x).view(B, T, h, d_k).transpose(1, 2)`,
      },
    ],
    html: `
<h2>The Attention Mechanism — The Heart of Every LLM</h2>
<p>Before transformers, sequential models (RNNs, LSTMs) processed text one token at a time. This made parallelization impossible and caused vanishing gradients over long sequences. The 2017 paper <em>"Attention is All You Need"</em> replaced recurrence entirely with self-attention.</p>

<h3>Self-Attention Intuition</h3>
<p>In the sentence <em>"The animal didn't cross the street because it was too tired"</em> — what does "it" refer to? A human reads the whole sentence and connects "it" to "animal." Self-attention gives the model a mechanism to do exactly this: every token attends to every other token and computes a context-aware representation.</p>

<h3>The Attention Formula</h3>
<pre><code class="language-python">import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    # Compute similarity scores
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    # Apply causal mask for autoregressive generation
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Softmax over key dimension
    attn_weights = F.softmax(scores, dim=-1)

    # Weighted sum of values
    return torch.matmul(attn_weights, V), attn_weights</code></pre>

<h3>Why Positional Encoding?</h3>
<p>Attention is permutation-invariant — "cat sat mat" and "mat sat cat" produce identical attention patterns without positional information. Positional encodings inject absolute or relative position information using sinusoidal functions (original transformer) or learned embeddings (BERT, GPT). Modern LLMs use Rotary Position Embeddings (RoPE) which enable length generalization.</p>

<h2>Encoder vs Decoder Architectures</h2>
<ul>
<li><strong>Encoder-only</strong> (BERT, RoBERTa): Bidirectional attention — each token sees all others. Best for classification, NER, embeddings.</li>
<li><strong>Decoder-only</strong> (GPT, LLaMA): Causal attention — each token only sees previous tokens. Best for text generation.</li>
<li><strong>Encoder-Decoder</strong> (T5, BART): Full attention in encoder, cross-attention in decoder. Best for seq2seq tasks like translation and summarization.</li>
</ul>
`,
  },

  "20-lora-theory": {
    takeaways: [
      "LoRA decomposes weight updates as ΔW = BA where B ∈ R^(d×r), A ∈ R^(r×k), r ≪ min(d,k)",
      "Typical LoRA trains only 0.1–1% of parameters vs full fine-tuning",
      "Alpha scaling (α/r) controls the magnitude of LoRA updates",
      "B is initialized to zero so LoRA starts as identity — stable training from pretrained weights",
      "Target attention layers (q_proj, v_proj) for best quality/parameter tradeoff",
    ],
    concepts: [
      {
        name: "Low-Rank Decomposition",
        explanation:
          "The core insight: pre-trained model weight matrices W₀ are high-rank but the task-specific update ΔW has low intrinsic rank. LoRA constrains ΔW = BA where rank r ≪ d, reducing parameters from d×k to (d+k)×r. For a 4096×4096 matrix with r=8: 16M → 65K parameters (99.6% reduction).",
        code: `# Standard linear: W ∈ R^(4096×4096) = 16M params\n# LoRA: B ∈ R^(4096×8), A ∈ R^(8×4096) = 65K params\nclass LoRALinear(nn.Module):\n    def __init__(self, d, k, r=8, alpha=16):\n        super().__init__()\n        self.W0 = nn.Parameter(torch.randn(d, k), requires_grad=False)  # frozen\n        self.A = nn.Parameter(torch.randn(r, k) * 0.01)  # trainable\n        self.B = nn.Parameter(torch.zeros(d, r))           # zero init\n        self.scale = alpha / r\n    def forward(self, x):\n        return x @ self.W0.T + (x @ self.A.T @ self.B.T) * self.scale`,
      },
    ],
    html: `
<h2>The Problem LoRA Solves</h2>
<p>Full fine-tuning a 7B parameter model requires storing: the model itself (~14 GB in FP16), gradients (~14 GB), optimizer state (~56 GB for AdamW). Total: ~84 GB — beyond most single-GPU setups. LoRA reduces trainable parameters by 10,000x while matching full fine-tuning quality.</p>

<h3>Mathematical Intuition</h3>
<p>The hypothesis: the fine-tuning weight update ΔW lives in a low-dimensional subspace of the full weight space. Even for a 4096×4096 weight matrix, the actual <em>meaningful</em> change during fine-tuning has an intrinsic rank much lower than 4096. LoRA exploits this by parameterizing ΔW = BA where both B and A are thin matrices.</p>

<h3>Why B=0 Initialization?</h3>
<p>B is initialized to zero so that at the start of training, the LoRA update ΔW = BA = 0, leaving the pre-trained model unchanged. This ensures stable training from a good initialization point rather than a random perturbation.</p>

<h3>Applying LoRA with HuggingFace PEFT</h3>
<pre><code class="language-python">from peft import LoraConfig, get_peft_model, TaskType

config = LoraConfig(
    r=8,                          # rank — higher = more capacity
    lora_alpha=16,                # scaling factor α
    target_modules=["q_proj", "v_proj"],  # which layers to adapt
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
)

model = get_peft_model(base_model, config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 6,742,609,920 || trainable%: 0.0622</code></pre>

<h3>Rank Selection Guide</h3>
<ul>
<li><strong>r=4</strong>: Minimal capacity. Good for simple style/format adaptation.</li>
<li><strong>r=8</strong>: Standard. Best quality/parameter tradeoff for most tasks.</li>
<li><strong>r=16-32</strong>: Higher capacity. For complex task adaptation or small datasets.</li>
<li><strong>r=64+</strong>: Approaches full fine-tuning. Use if LoRA quality is insufficient.</li>
</ul>
`,
  },

  "42-dpo": {
    takeaways: [
      "DPO eliminates the need for a separate reward model and PPO training loop",
      "DPO directly optimizes the policy from preference pairs (chosen, rejected)",
      "The implicit reward is defined as r(x,y) = β·log(π(y|x)/π_ref(y|x))",
      "β controls the KL divergence penalty — higher β = stay closer to reference model",
      "DPO requires a frozen reference model (copy of SFT model) during training",
    ],
    concepts: [
      {
        name: "DPO Loss Function",
        explanation:
          "DPO (Rafailov et al. 2023) shows that the RLHF objective has a closed-form solution. The optimal policy can be found directly by optimizing: L_DPO = -E[log σ(β·(log π(y_w|x)/π_ref(y_w|x) - log π(y_l|x)/π_ref(y_l|x)))] where y_w is the preferred response and y_l is the rejected response.",
        code: `def dpo_loss(policy_chosen_logps, policy_rejected_logps,\n            ref_chosen_logps, ref_rejected_logps, beta=0.1):\n    pi_logratios = policy_chosen_logps - policy_rejected_logps\n    ref_logratios = ref_chosen_logps - ref_rejected_logps\n    return -F.logsigmoid(beta * (pi_logratios - ref_logratios)).mean()`,
      },
    ],
    html: `
<h2>Why DPO Instead of RLHF/PPO?</h2>
<p>Traditional RLHF requires three steps: (1) train a reward model on preferences, (2) use PPO to optimize the policy against the reward model, (3) carefully tune KL penalties to prevent reward hacking. This is complex, unstable, and requires 3 models in memory simultaneously. DPO collapses this to a single supervised step.</p>

<h3>RLHF vs DPO Comparison</h3>
<table>
<thead><tr><th></th><th>RLHF/PPO</th><th>DPO</th></tr></thead>
<tbody>
<tr><td>Reward model needed?</td><td>Yes (separate training)</td><td>No</td></tr>
<tr><td>Models in memory</td><td>4 (actor, critic, ref, reward)</td><td>2 (policy + reference)</td></tr>
<tr><td>Training stability</td><td>Difficult</td><td>Straightforward</td></tr>
<tr><td>Data needed</td><td>Reward model data + preference data</td><td>Preference pairs only</td></tr>
</tbody>
</table>

<h3>DPO Training Setup</h3>
<pre><code class="language-python">from trl import DPOTrainer, DPOConfig

# Dataset format: {"prompt": ..., "chosen": ..., "rejected": ...}
training_args = DPOConfig(
    beta=0.1,              # KL penalty coefficient
    output_dir="./dpo-out",
    num_train_epochs=1,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=8,
    learning_rate=5e-7,    # much lower than SFT — fine-grained alignment
    fp16=True,
)

trainer = DPOTrainer(
    model=policy_model,
    ref_model=reference_model,  # frozen copy of SFT model
    args=training_args,
    train_dataset=preference_dataset,
    tokenizer=tokenizer,
)
trainer.train()</code></pre>
`,
  },
};

// Default content generator for notebooks without custom content
function generateDefaultContent(slug: string): NotebookContentResult {
  const words = slug.replace(/-/g, " ").replace(/^\d+\s/, "");
  return {
    html: `
<h2>Overview</h2>
<p>This notebook covers ${words} in depth, providing hands-on implementation and conceptual understanding. Open the notebook in Google Colab using the button above to run all code interactively on a free GPU.</p>

<h2>What You'll Build</h2>
<p>By completing this notebook, you'll implement a working version of the concepts from scratch and understand how they connect to the broader LLM training pipeline.</p>

<h2>Prerequisites</h2>
<p>Complete the previous notebook in the stage before starting this one. Each notebook builds on concepts from the previous session.</p>

<h2>Open in Colab</h2>
<p>Click the "Open in Google Colab" button above to launch this notebook. Make sure to switch the runtime to GPU (Runtime → Change runtime type → T4 GPU) before running cells.</p>
`,
    takeaways: [
      `Understand the core concepts behind ${words}`,
      "Implement a working version from scratch in PyTorch",
      "Connect this technique to real-world LLM training pipelines",
      "Know when to use this approach vs alternatives",
      "Debug common errors and edge cases",
    ],
    concepts: [],
  };
}

export function getNotebookContent(slug: string): NotebookContentResult {
  return notebookData[slug] ?? generateDefaultContent(slug);
}
