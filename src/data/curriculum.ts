export type Notebook = {
  id: string;
  number: string;
  title: string;
  description: string;
  concepts: string[];
  colabUrl?: string;
  slug: string;
  duration: string;
};

export type Stage = {
  id: string;
  number: number;
  title: string;
  
  
  description: string;
  notebooks: Notebook[];
};

export const COLAB_BASE =
  "https://colab.research.google.com/github/nishchaysinha/llm-dojo/blob/main/";

export const stages: Stage[] = [
  {
    id: "stage-0",
    number: 0,
    title: "Foundations & Environment",
    description:
      "Set up your environment, understand transformers from scratch, and master data preparation fundamentals.",
    notebooks: [
      {
        id: "00",
        number: "00",
        title: "Environment Setup",
        slug: "00-environment-setup",
        duration: "30 min",
        description:
          "Configure your GPU environment, install PyTorch and HuggingFace libraries, verify CUDA, and set up HuggingFace authentication.",
        concepts: ["CUDA", "PyTorch", "HuggingFace", "GPU Setup", "bitsandbytes"],
        colabUrl: COLAB_BASE + "notebooks/00_environment_setup.ipynb",
      },
      {
        id: "01",
        number: "01",
        title: "Transformer Basics",
        slug: "01-transformer-basics",
        duration: "45 min",
        description:
          "Build multi-head self-attention from scratch, implement positional encodings, and understand why Attention is All You Need.",
        concepts: ["Self-Attention", "Multi-Head Attention", "Positional Encoding", "Transformer Architecture"],
        colabUrl: COLAB_BASE + "notebooks/01_transformer_basics.ipynb",
      },
      {
        id: "02",
        number: "02",
        title: "Tokenization Deep Dive",
        slug: "02-tokenization-deep-dive",
        duration: "40 min",
        description:
          "Explore BPE, WordPiece, and SentencePiece tokenization. Compare GPT-2 and BERT tokenizers side-by-side.",
        concepts: ["BPE", "WordPiece", "SentencePiece", "Vocabulary", "Subword Units"],
        colabUrl: COLAB_BASE + "notebooks/02_tokenization_deep_dive.ipynb",
      },
      {
        id: "03",
        number: "03",
        title: "Dataset Preparation Basics",
        slug: "03-dataset-preparation",
        duration: "35 min",
        description:
          "Load, split, and preprocess NLP datasets with HuggingFace Datasets. Train/val/test splitting strategies.",
        concepts: ["HuggingFace Datasets", "Train/Val/Test Split", "Tokenization", "DataLoader"],
        colabUrl: COLAB_BASE + "notebooks/03_dataset_preparation_basics.ipynb",
      },
      {
        id: "04",
        number: "04",
        title: "Data Quality Analysis",
        slug: "04-data-quality",
        duration: "35 min",
        description:
          "Detect duplicates, class imbalance, outliers, and PII in datasets. Build reusable EDA pipelines.",
        concepts: ["EDA", "Duplicate Detection", "PII", "Class Imbalance", "Data Quality"],
        colabUrl: COLAB_BASE + "notebooks/04_data_quality_analysis.ipynb",
      },
      {
        id: "05",
        number: "05",
        title: "Handling Class Imbalance",
        slug: "05-class-imbalance",
        duration: "30 min",
        description:
          "Oversampling, undersampling, class weights, focal loss, and WeightedRandomSampler techniques.",
        concepts: ["Class Weights", "Focal Loss", "WeightedRandomSampler", "SMOTE", "Oversampling"],
        colabUrl: COLAB_BASE + "notebooks/05_handling_class_imbalance.ipynb",
      },
      {
        id: "06",
        number: "06",
        title: "Data Augmentation for NLP",
        slug: "06-data-augmentation",
        duration: "35 min",
        description:
          "Synonym replacement, back-translation, random deletion/swap, and synthetic data generation.",
        concepts: ["Back-Translation", "Synonym Replacement", "EDA Augmentation", "Synthetic Data"],
        colabUrl: COLAB_BASE + "notebooks/06_data_augmentation_nlp.ipynb",
      },
    ],
  },
  {
    id: "stage-1",
    number: 1,
    title: "Full Model Fine-Tuning",
    description:
      "Fine-tune complete transformer models for classification and generation. Build custom training loops with mixed precision.",
    notebooks: [
      {
        id: "10",
        number: "10",
        title: "Full Fine-Tuning: Classification",
        slug: "10-full-finetuning-classification",
        duration: "50 min",
        description:
          "Fine-tune DistilBERT on IMDB sentiment with HuggingFace Trainer. Understand the full classification pipeline.",
        concepts: ["DistilBERT", "Sequence Classification", "HuggingFace Trainer", "evaluate"],
        colabUrl: COLAB_BASE + "notebooks/10_full_finetuning_classification.ipynb",
      },
      {
        id: "11",
        number: "11",
        title: "Full Fine-Tuning: Generation",
        slug: "11-full-finetuning-generation",
        duration: "50 min",
        description:
          "Fine-tune GPT-2 for causal language modeling. Implement greedy, beam search, and sampling decoding strategies.",
        concepts: ["GPT-2", "Causal LM", "Greedy Decoding", "Beam Search", "Top-p Sampling"],
        colabUrl: COLAB_BASE + "notebooks/11_full_finetuning_generation.ipynb",
      },
      {
        id: "12",
        number: "12",
        title: "Custom Training Loop",
        slug: "12-custom-training-loop",
        duration: "45 min",
        description:
          "Build a manual training loop with gradient clipping, mixed precision (AMP), and checkpoint saving.",
        concepts: ["AMP", "Gradient Clipping", "Checkpointing", "Manual Training Loop"],
        colabUrl: COLAB_BASE + "notebooks/12_training_loop_explained.ipynb",
      },
      {
        id: "13",
        number: "13",
        title: "Custom Loss Functions",
        slug: "13-custom-loss-functions",
        duration: "40 min",
        description:
          "Implement weighted cross-entropy, focal loss, and label smoothing. Understand when to use each.",
        concepts: ["Weighted CE", "Focal Loss", "Label Smoothing", "Loss Engineering"],
        colabUrl: COLAB_BASE + "notebooks/13_custom_loss_functions.ipynb",
      },
      {
        id: "14",
        number: "14",
        title: "Imbalanced Classification",
        slug: "14-imbalanced-classification",
        duration: "40 min",
        description:
          "Threshold tuning, class-weighted loss, and evaluation metrics for heavily imbalanced datasets.",
        concepts: ["Threshold Tuning", "PR Curve", "Class Weights", "F1 Score"],
        colabUrl: COLAB_BASE + "notebooks/14_handling_imbalanced_classification.ipynb",
      },
      {
        id: "15",
        number: "15",
        title: "Mixed Precision Training",
        slug: "15-mixed-precision",
        duration: "35 min",
        description:
          "FP16/BF16 training with GradScaler. Understand loss scaling and numerical stability.",
        concepts: ["FP16", "BF16", "GradScaler", "Mixed Precision", "Loss Scaling"],
        colabUrl: COLAB_BASE + "notebooks/15_mixed_precision_training.ipynb",
      },
      {
        id: "16",
        number: "16",
        title: "Gradient Accumulation",
        slug: "16-gradient-accumulation",
        duration: "30 min",
        description:
          "Train with effective large batch sizes on limited GPU memory using gradient accumulation.",
        concepts: ["Gradient Accumulation", "Effective Batch Size", "Memory Efficiency"],
        colabUrl: COLAB_BASE + "notebooks/16_gradient_accumulation.ipynb",
      },
      {
        id: "17",
        number: "17",
        title: "Regularization Techniques",
        slug: "17-regularization",
        duration: "35 min",
        description:
          "Dropout, weight decay, early stopping, and learning rate scheduling to prevent overfitting.",
        concepts: ["Dropout", "Weight Decay", "Early Stopping", "Regularization"],
        colabUrl: COLAB_BASE + "notebooks/17_regularization_techniques.ipynb",
      },
      {
        id: "18",
        number: "18",
        title: "Evaluation Metrics",
        slug: "18-evaluation-metrics",
        duration: "40 min",
        description:
          "Perplexity, BLEU, ROUGE, F1, precision/recall. Build a comprehensive evaluation harness.",
        concepts: ["Perplexity", "BLEU", "ROUGE", "F1", "Evaluation"],
        colabUrl: COLAB_BASE + "notebooks/18_evaluation_metrics.ipynb",
      },
      {
        id: "19",
        number: "19",
        title: "Curriculum Learning",
        slug: "19-curriculum-learning",
        duration: "35 min",
        description:
          "Train on easy examples first, gradually introducing harder ones. Improves convergence and generalization.",
        concepts: ["Curriculum Learning", "Difficulty Scoring", "Training Schedule"],
        colabUrl: COLAB_BASE + "notebooks/19_curriculum_learning.ipynb",
      },
    ],
  },
  {
    id: "stage-2",
    number: 2,
    title: "Parameter-Efficient Fine-Tuning",
    description:
      "Master LoRA, QLoRA, adapters, and prompt tuning — train LLMs with 100x fewer parameters.",
    notebooks: [
      {
        id: "20",
        number: "20",
        title: "LoRA Theory",
        slug: "20-lora-theory",
        duration: "45 min",
        description:
          "Understand LoRA's low-rank matrix decomposition: W = W₀ + BA·(α/r). Implement from scratch.",
        concepts: ["LoRA", "Low-Rank Decomposition", "Rank", "Alpha Scaling"],
        colabUrl: COLAB_BASE + "notebooks/20_lora_theory.ipynb",
      },
      {
        id: "21",
        number: "21",
        title: "LoRA on LLaMA-2 7B",
        slug: "21-lora-llama2",
        duration: "60 min",
        description:
          "Apply LoRA to LLaMA-2 7B using HuggingFace PEFT. Train with 0.65% of parameters.",
        concepts: ["LLaMA-2", "PEFT", "LoRA", "Instruction Tuning"],
        colabUrl: COLAB_BASE + "notebooks/21_lora_llama2_7b.ipynb",
      },
      {
        id: "22",
        number: "22",
        title: "QLoRA Implementation",
        slug: "22-qlora",
        duration: "60 min",
        description:
          "4-bit NF4 quantization + LoRA. Train 7B models on a single consumer GPU with bitsandbytes.",
        concepts: ["QLoRA", "NF4", "4-bit Quantization", "bitsandbytes", "Double Quantization"],
        colabUrl: COLAB_BASE + "notebooks/22_qlora_implementation.ipynb",
      },
      {
        id: "23",
        number: "23",
        title: "LoRA Target Modules",
        slug: "23-lora-target-modules",
        duration: "40 min",
        description:
          "Ablation study: which layers to apply LoRA to? q_proj, v_proj, all attention, or FFN?",
        concepts: ["Target Modules", "Ablation Study", "Layer Selection", "Parameter Budget"],
        colabUrl: COLAB_BASE + "notebooks/23_lora_target_modules.ipynb",
      },
      {
        id: "24",
        number: "24",
        title: "Custom Loss with LoRA",
        slug: "24-custom-loss-lora",
        duration: "40 min",
        description:
          "Combine custom loss functions (focal, weighted CE) with LoRA training. Verify gradient flow.",
        concepts: ["Custom Loss", "Gradient Flow", "LoRA Trainer", "WeightedCELoRATrainer"],
        colabUrl: COLAB_BASE + "notebooks/24_custom_loss_with_lora.ipynb",
      },
      {
        id: "25",
        number: "25",
        title: "Adapter Layers",
        slug: "25-adapter-layers",
        duration: "35 min",
        description:
          "Classic bottleneck adapter architecture — residual connection with down/up projection.",
        concepts: ["Adapters", "Bottleneck", "Residual Connection", "PEFT"],
        colabUrl: COLAB_BASE + "notebooks/25_adapter_layers.ipynb",
      },
      {
        id: "26",
        number: "26",
        title: "Prompt Tuning",
        slug: "26-prompt-tuning",
        duration: "35 min",
        description:
          "Optimize soft prompt embeddings while freezing the entire model. Only 0.01% parameters trained.",
        concepts: ["Prompt Tuning", "Soft Prompts", "Virtual Tokens", "Prefix Tuning"],
        colabUrl: COLAB_BASE + "notebooks/26_prompt_tuning.ipynb",
      },
      {
        id: "27",
        number: "27",
        title: "PEFT Method Comparison",
        slug: "27-peft-comparison",
        duration: "45 min",
        description:
          "Benchmark LoRA, QLoRA, adapters, and prompt tuning on accuracy, parameters, and speed.",
        concepts: ["PEFT Comparison", "Benchmarking", "Parameter Efficiency", "Quality Tradeoffs"],
        colabUrl: COLAB_BASE + "notebooks/27_peft_comparison.ipynb",
      },
      {
        id: "28",
        number: "28",
        title: "LoRA Merging",
        slug: "28-lora-merging",
        duration: "40 min",
        description:
          "Merge LoRA adapters back into base weights with merge_and_unload(). Combine multiple adapters.",
        concepts: ["LoRA Merging", "merge_and_unload", "TIES Merging", "DARE"],
        colabUrl: COLAB_BASE + "notebooks/28_lora_merging.ipynb",
      },
      {
        id: "29",
        number: "29",
        title: "Advanced LoRA Variants",
        slug: "29-advanced-lora",
        duration: "50 min",
        description:
          "DoRA (magnitude-direction decomposition), AdaLoRA (adaptive rank), and LoRA+ (optimized learning rates).",
        concepts: ["DoRA", "AdaLoRA", "LoRA+", "Adaptive Rank", "Magnitude-Direction"],
        colabUrl: COLAB_BASE + "notebooks/29_advanced_lora_variants.ipynb",
      },
    ],
  },
  {
    id: "stage-3",
    number: 3,
    title: "Advanced Optimization",
    description:
      "FlashAttention, DeepSpeed ZeRO, FSDP, gradient checkpointing, and instruction tuning at scale.",
    notebooks: [
      { id: "30", number: "30", title: "Flash Attention", slug: "30-flash-attention", duration: "40 min", description: "FlashAttention vs standard attention: IO-aware CUDA kernel that reduces memory from O(N²) to O(N).", concepts: ["FlashAttention", "IO-Aware", "Memory Efficiency", "CUDA Kernels"], colabUrl: COLAB_BASE + "notebooks/30_flash_attention.ipynb" },
      { id: "31", number: "31", title: "DeepSpeed ZeRO", slug: "31-deepspeed-zero", duration: "50 min", description: "ZeRO Stage 1/2/3: partition optimizer state, gradients, and parameters across GPUs.", concepts: ["DeepSpeed", "ZeRO", "Distributed Training", "Memory Partitioning"], colabUrl: COLAB_BASE + "notebooks/31_deepspeed_zero.ipynb" },
      { id: "32", number: "32", title: "FSDP PyTorch", slug: "32-fsdp", duration: "45 min", description: "PyTorch native Fully Sharded Data Parallel — the open-source alternative to DeepSpeed ZeRO-3.", concepts: ["FSDP", "Sharding", "Distributed Training", "PyTorch DDP"], colabUrl: COLAB_BASE + "notebooks/32_fsdp_pytorch.ipynb" },
      { id: "33", number: "33", title: "Gradient Checkpointing", slug: "33-gradient-checkpointing", duration: "35 min", description: "Trade compute for memory: recompute activations during backward pass instead of storing them.", concepts: ["Gradient Checkpointing", "Activation Recomputation", "Memory-Compute Tradeoff"], colabUrl: COLAB_BASE + "notebooks/33_gradient_checkpointing.ipynb" },
      { id: "34", number: "34", title: "Optimizer Comparison", slug: "34-optimizers", duration: "40 min", description: "AdamW vs Lion vs Sophia. Understanding adaptive vs non-adaptive optimizers for LLM training.", concepts: ["AdamW", "Lion", "Sophia", "Optimizer", "Learning Rate"], colabUrl: COLAB_BASE + "notebooks/34_optimizer_comparison.ipynb" },
      { id: "35", number: "35", title: "LR Schedules", slug: "35-lr-schedules", duration: "35 min", description: "Warmup + cosine decay, linear decay, and cyclical schedules. Why warmup is essential for LLMs.", concepts: ["Cosine Decay", "Linear Warmup", "Cyclical LR", "LR Schedule"], colabUrl: COLAB_BASE + "notebooks/35_lr_schedules.ipynb" },
      { id: "36", number: "36", title: "Advanced Data Loading", slug: "36-data-loading", duration: "40 min", description: "Sequence packing, dynamic batching, and streaming datasets for memory-efficient training.", concepts: ["Sequence Packing", "Dynamic Batching", "Streaming", "Data Pipeline"], colabUrl: COLAB_BASE + "notebooks/36_advanced_data_loading.ipynb" },
      { id: "37", number: "37", title: "Instruction Tuning", slug: "37-instruction-tuning", duration: "45 min", description: "Alpaca, Dolly, and ShareGPT data formats. Fine-tune models to follow instructions.", concepts: ["Instruction Tuning", "Alpaca Format", "ChatML", "FLAN"], colabUrl: COLAB_BASE + "notebooks/37_instruction_tuning.ipynb" },
      { id: "38", number: "38", title: "Long Context Training", slug: "38-long-context", duration: "45 min", description: "RoPE scaling and YaRN for extending context length beyond the original training window.", concepts: ["RoPE Scaling", "YaRN", "Long Context", "Position Encoding"], colabUrl: COLAB_BASE + "notebooks/38_long_context_training.ipynb" },
      { id: "39", number: "39", title: "Contrastive Learning", slug: "39-contrastive-learning", duration: "40 min", description: "SimCSE, triplet loss, and hard negative mining for embedding models and retrieval.", concepts: ["SimCSE", "Triplet Loss", "Hard Negatives", "Embeddings", "Contrastive"], colabUrl: COLAB_BASE + "notebooks/39_contrastive_learning.ipynb" },
    ],
  },
  {
    id: "stage-4",
    number: 4,
    title: "Alignment & Specialized Techniques",
    description:
      "RLHF, DPO, Constitutional AI, reward models, and safety evaluation for aligned LLMs.",
    notebooks: [
      { id: "40", number: "40", title: "Reward Model Training", slug: "40-reward-model", duration: "50 min", description: "Build a reward model using pairwise ranking loss. The backbone of RLHF pipelines.", concepts: ["Reward Model", "Pairwise Ranking", "RLHF", "Preference Data"], colabUrl: COLAB_BASE + "notebooks/40_reward_model_training.ipynb" },
      { id: "41", number: "41", title: "RLHF with PPO", slug: "41-rlhf-ppo", duration: "60 min", description: "Full RLHF pipeline with Proximal Policy Optimization using TRL library.", concepts: ["RLHF", "PPO", "TRL", "Policy Gradient", "Clip Objective"], colabUrl: COLAB_BASE + "notebooks/41_rlhf_ppo.ipynb" },
      { id: "42", number: "42", title: "DPO Implementation", slug: "42-dpo", duration: "50 min", description: "Direct Preference Optimization — alignment without a reward model. Simpler than RLHF.", concepts: ["DPO", "Direct Preference Optimization", "Preference Learning", "Rafailov 2023"], colabUrl: COLAB_BASE + "notebooks/42_dpo_implementation.ipynb" },
      { id: "43", number: "43", title: "Constitutional AI", slug: "43-constitutional-ai", duration: "45 min", description: "Anthropic's self-critique and revision approach: use the model to evaluate and improve its own outputs.", concepts: ["Constitutional AI", "Self-Critique", "Harmlessness", "CAI"], colabUrl: COLAB_BASE + "notebooks/43_constitutional_ai.ipynb" },
      { id: "44", number: "44", title: "Domain Adaptation", slug: "44-domain-adaptation", duration: "45 min", description: "Continued pre-training on domain corpora (medical, legal, code) before task-specific fine-tuning.", concepts: ["Domain Adaptation", "Continued Pre-training", "Domain Shift", "Specialization"], colabUrl: COLAB_BASE + "notebooks/44_domain_adaptation.ipynb" },
      { id: "45", number: "45", title: "Multi-Task Fine-Tuning", slug: "45-multitask", duration: "45 min", description: "Train one model on multiple tasks simultaneously with task mixing and loss balancing.", concepts: ["Multi-Task Learning", "Task Mixing", "Loss Balancing", "Multi-Head"], colabUrl: COLAB_BASE + "notebooks/45_multitask_finetuning.ipynb" },
      { id: "46", number: "46", title: "Catastrophic Forgetting", slug: "46-catastrophic-forgetting", duration: "40 min", description: "EWC (Elastic Weight Consolidation) and replay buffers to preserve performance on old tasks.", concepts: ["Catastrophic Forgetting", "EWC", "Continual Learning", "Replay Buffers"], colabUrl: COLAB_BASE + "notebooks/46_catastrophic_forgetting.ipynb" },
      { id: "47", number: "47", title: "Negative Sampling Strategies", slug: "47-negative-sampling", duration: "35 min", description: "In-batch negatives, hard negative mining, and curriculum negatives for retrieval models.", concepts: ["Hard Negatives", "In-Batch Negatives", "Retrieval", "Bi-Encoder"], colabUrl: COLAB_BASE + "notebooks/47_negative_sampling_strategies.ipynb" },
      { id: "48", number: "48", title: "Safety Evaluation", slug: "48-safety-evaluation", duration: "40 min", description: "Toxicity detection, bias benchmarks, and jailbreak testing for responsible AI deployment.", concepts: ["Toxicity", "Bias", "Jailbreak", "Safety", "Responsible AI"], colabUrl: COLAB_BASE + "notebooks/48_safety_evaluation.ipynb" },
      { id: "49", number: "49", title: "Mixture of Experts", slug: "49-moe", duration: "50 min", description: "MoE architecture: sparse gating, top-k routing, and expert load balancing.", concepts: ["MoE", "Sparse MoE", "Top-k Routing", "Expert Parallelism", "Mixtral"], colabUrl: COLAB_BASE + "notebooks/49_mixture_of_experts.ipynb" },
    ],
  },
  {
    id: "stage-5",
    number: 5,
    title: "Custom Kernels & Production",
    description:
      "Write CUDA/Triton kernels, master quantization, implement speculative decoding, and deploy with vLLM.",
    notebooks: [
      { id: "50", number: "50", title: "CUDA Basics", slug: "50-cuda-basics", duration: "60 min", description: "Writing CUDA kernels in Python with torch.cuda. Understand warps, blocks, shared memory, and roofline analysis.", concepts: ["CUDA", "Warps", "Shared Memory", "Roofline Model", "TFLOPS"], colabUrl: COLAB_BASE + "notebooks/50_cuda_basics.ipynb" },
      { id: "51", number: "51", title: "Triton Kernels", slug: "51-triton-kernels", duration: "60 min", description: "Write GPU kernels in pure Python with OpenAI Triton. Fuse operations for speed.", concepts: ["Triton", "Kernel Fusion", "GPU Programming", "torch.compile"], colabUrl: COLAB_BASE + "notebooks/51_triton_kernels.ipynb" },
      { id: "52", number: "52", title: "Custom Attention Kernel", slug: "52-custom-attention", duration: "55 min", description: "Implement an optimized causal attention kernel with FlashAttention memory tiling pattern.", concepts: ["Attention Kernel", "Causal Mask", "SDPA", "Memory Tiling"], colabUrl: COLAB_BASE + "notebooks/52_custom_attention_kernel.ipynb" },
      { id: "53", number: "53", title: "Fused Operations", slug: "53-fused-ops", duration: "40 min", description: "Fuse LayerNorm + Linear, GELU + Linear into single kernels. Eliminate memory round-trips.", concepts: ["Kernel Fusion", "LayerNorm Fusion", "Memory Bandwidth", "Operator Fusion"], colabUrl: COLAB_BASE + "notebooks/53_fused_operations.ipynb" },
      { id: "54", number: "54", title: "Quantization Methods", slug: "54-quantization", duration: "55 min", description: "GPTQ, AWQ, and GGUF quantization compared. INT4/INT8 weight compression with quality analysis.", concepts: ["GPTQ", "AWQ", "GGUF", "INT4", "INT8", "Quantization"], colabUrl: COLAB_BASE + "notebooks/54_quantization_methods.ipynb" },
      { id: "55", number: "55", title: "KV Cache Optimization", slug: "55-kv-cache", duration: "45 min", description: "PagedAttention, MQA, GQA — strategies to reduce KV cache memory and increase throughput.", concepts: ["KV Cache", "PagedAttention", "MQA", "GQA", "Memory Efficiency"], colabUrl: COLAB_BASE + "notebooks/55_kv_cache_optimization.ipynb" },
      { id: "56", number: "56", title: "Speculative Decoding", slug: "56-speculative-decoding", duration: "50 min", description: "Use a small draft model to propose tokens, verify with the large model. 2-3x generation speedup.", concepts: ["Speculative Decoding", "Draft Model", "Token Verification", "Throughput"], colabUrl: COLAB_BASE + "notebooks/56_speculative_decoding.ipynb" },
      { id: "57", number: "57", title: "vLLM Serving", slug: "57-vllm-serving", duration: "55 min", description: "Deploy LLMs in production with vLLM's continuous batching and PagedAttention.", concepts: ["vLLM", "Continuous Batching", "PagedAttention", "Production Serving"], colabUrl: COLAB_BASE + "notebooks/57_vllm_serving.ipynb" },
      { id: "58", number: "58", title: "TensorRT-LLM", slug: "58-tensorrt-llm", duration: "55 min", description: "NVIDIA's TensorRT-LLM for maximum throughput on A100/H100 GPUs.", concepts: ["TensorRT", "TensorRT-LLM", "NVIDIA", "INT8 Inference", "Engine Building"], colabUrl: COLAB_BASE + "notebooks/58_tensorrt_llm.ipynb" },
      { id: "59", number: "59", title: "Continuous Batching", slug: "59-continuous-batching", duration: "45 min", description: "Dynamic batch scheduling for production LLM serving — replace finished sequences without stopping.", concepts: ["Continuous Batching", "Dynamic Scheduling", "Orca", "Iteration-Level Batching"], colabUrl: COLAB_BASE + "notebooks/59_continuous_batching.ipynb" },
    ],
  },
];

export const inferenceStage: Stage = {
  id: "inference",
  number: 6,
  title: "LLM Inference Optimization",
  description:
    "Profile, optimize, and deploy LLM inference at scale — from KV cache to quantization to multi-GPU serving.",
  notebooks: [
    { id: "inf00", number: "INF-00", title: "Inference Basics", slug: "inf-00-inference-basics", duration: "30 min", description: "Prefill vs decode phases, throughput vs latency, and the inference performance landscape.", concepts: ["Prefill", "Decode", "Throughput", "Latency", "Autoregressive"], colabUrl: COLAB_BASE + "inference_notebooks/00_inference_basics.ipynb" },
    { id: "inf01", number: "INF-01", title: "Profiling Inference", slug: "inf-01-profiling", duration: "35 min", description: "Profile GPU utilization, memory bandwidth, and compute using PyTorch profiler.", concepts: ["Profiling", "GPU Utilization", "Memory Bandwidth", "torch.profiler"], colabUrl: COLAB_BASE + "inference_notebooks/01_profiling_inference.ipynb" },
    { id: "inf02", number: "INF-02", title: "Prefill vs Decode", slug: "inf-02-prefill-decode", duration: "35 min", description: "Deep dive into the two-phase inference process and how to optimize each independently.", concepts: ["Prefill Latency", "Decode Throughput", "TTFT", "TBT"], colabUrl: COLAB_BASE + "inference_notebooks/02_prefill_vs_decode.ipynb" },
    { id: "inf03", number: "INF-03", title: "Baseline Benchmarking", slug: "inf-03-benchmarking", duration: "30 min", description: "Build a reproducible inference benchmark: tokens/sec, latency P50/P95/P99.", concepts: ["Benchmarking", "Tokens/sec", "Latency Percentiles", "Reproducibility"], colabUrl: COLAB_BASE + "inference_notebooks/03_baseline_benchmarking.ipynb" },
    { id: "inf10", number: "INF-10", title: "KV Cache Implementation", slug: "inf-10-kv-cache", duration: "40 min", description: "Implement manual KV cache from scratch. Understand why it gives 5-10x decode speedup.", concepts: ["KV Cache", "Past Key Values", "Cache Management", "Memory"], colabUrl: COLAB_BASE + "inference_notebooks/10_kv_cache_implementation.ipynb" },
    { id: "inf11", number: "INF-11", title: "Mixed Precision Inference", slug: "inf-11-mixed-precision", duration: "35 min", description: "FP16/BF16 inference: 2x memory reduction, minimal quality loss.", concepts: ["FP16", "BF16", "Half Precision", "Memory Reduction"], colabUrl: COLAB_BASE + "inference_notebooks/11_mixed_precision_inference.ipynb" },
    { id: "inf12", number: "INF-12", title: "Static Batching", slug: "inf-12-static-batching", duration: "30 min", description: "Batch multiple requests together for 2-8x throughput improvement.", concepts: ["Static Batching", "Throughput", "Padding", "Batch Size"], colabUrl: COLAB_BASE + "inference_notebooks/12_static_batching.ipynb" },
    { id: "inf13", number: "INF-13", title: "torch.compile", slug: "inf-13-torch-compile", duration: "35 min", description: "Use torch.compile for 1.2-1.5x additional speedup through kernel fusion and graph optimization.", concepts: ["torch.compile", "Dynamo", "Inductor", "Graph Optimization"], colabUrl: COLAB_BASE + "inference_notebooks/13_torch_compile.ipynb" },
    { id: "inf14", number: "INF-14", title: "INT8 Quantization", slug: "inf-14-int8-quant", duration: "40 min", description: "Post-training INT8 quantization: 4x memory reduction vs FP32 with <1% quality loss.", concepts: ["INT8", "PTQ", "Dynamic Quantization", "LLM.int8()"], colabUrl: COLAB_BASE + "inference_notebooks/14_int8_quantization.ipynb" },
    { id: "inf20", number: "INF-20", title: "Flash Attention Explained", slug: "inf-20-flash-attention", duration: "45 min", description: "IO-aware FlashAttention: why it's fast, how it tiles computation, and when to use it.", concepts: ["FlashAttention", "IO-Aware", "Tiling", "HBM Bandwidth"], colabUrl: COLAB_BASE + "inference_notebooks/20_flash_attention_explained.ipynb" },
    { id: "inf21", number: "INF-21", title: "MQA & GQA", slug: "inf-21-mqa-gqa", duration: "40 min", description: "Multi-Query Attention and Grouped-Query Attention: reduce KV cache size while maintaining quality.", concepts: ["MQA", "GQA", "KV Heads", "LLaMA-2", "Mistral"], colabUrl: COLAB_BASE + "inference_notebooks/21_mqa_gqa_implementation.ipynb" },
    { id: "inf23", number: "INF-23", title: "Long Context Inference", slug: "inf-23-long-context", duration: "45 min", description: "RoPE scaling, YaRN, and sliding window attention for inference beyond training context.", concepts: ["RoPE", "YaRN", "Sliding Window", "Long Context", "ALiBi"], colabUrl: COLAB_BASE + "inference_notebooks/23_long_context_inference.ipynb" },
    { id: "inf24", number: "INF-24", title: "Memory Optimization", slug: "inf-24-memory-optimization", duration: "40 min", description: "Compare FP32 vs FP16 vs BF16 vs INT8 vs INT4 memory and quality tradeoffs.", concepts: ["Memory Optimization", "Quantization", "Dtype", "Model Size"], colabUrl: COLAB_BASE + "inference_notebooks/24_memory_optimization_comparison.ipynb" },
    { id: "inf30", number: "INF-30", title: "Continuous Batching", slug: "inf-30-continuous-batching", duration: "40 min", description: "Orca-style iteration-level batching: insert and remove sequences without stopping the engine.", concepts: ["Continuous Batching", "Orca", "Request Scheduling", "Serving"], colabUrl: COLAB_BASE + "inference_notebooks/30_continuous_batching_explained.ipynb" },
    { id: "inf31", number: "INF-31", title: "PagedAttention", slug: "inf-31-paged-attention", duration: "45 min", description: "vLLM's PagedAttention: virtual memory paging for KV cache — near-zero waste.", concepts: ["PagedAttention", "vLLM", "Memory Pages", "KV Blocks"], colabUrl: COLAB_BASE + "inference_notebooks/31_paged_attention_explained.ipynb" },
    { id: "inf33", number: "INF-33", title: "Prefix Caching", slug: "inf-33-prefix-caching", duration: "35 min", description: "Cache KV states for repeated system prompts. Eliminate redundant computation across requests.", concepts: ["Prefix Caching", "System Prompt", "Cache Hit Rate", "Reuse"], colabUrl: COLAB_BASE + "inference_notebooks/33_prefix_caching.ipynb" },
    { id: "inf34", number: "INF-34", title: "Multi-GPU Serving", slug: "inf-34-multi-gpu", duration: "50 min", description: "Tensor parallelism and pipeline parallelism for serving models larger than a single GPU.", concepts: ["Tensor Parallelism", "Pipeline Parallelism", "Multi-GPU", "Serving"], colabUrl: COLAB_BASE + "inference_notebooks/34_multi_gpu_serving.ipynb" },
    { id: "inf41", number: "INF-41", title: "GPTQ Quantization", slug: "inf-41-gptq", duration: "50 min", description: "GPTQ: layer-wise INT4 quantization with Hessian-based optimal rounding. <2% quality loss.", concepts: ["GPTQ", "INT4", "Hessian", "AutoGPTQ"], colabUrl: COLAB_BASE + "inference_notebooks/41_gptq_quantization.ipynb" },
    { id: "inf42", number: "INF-42", title: "AWQ Quantization", slug: "inf-42-awq", duration: "50 min", description: "Activation-Aware Weight Quantization: scale weights by activation magnitude for better quality.", concepts: ["AWQ", "Activation-Aware", "Weight Scaling", "AutoAWQ"], colabUrl: COLAB_BASE + "inference_notebooks/42_awq_quantization.ipynb" },
    { id: "inf43", number: "INF-43", title: "GGUF & CPU Inference", slug: "inf-43-gguf", duration: "45 min", description: "GGUF format and llama.cpp for CPU inference. Run 7B models on a MacBook.", concepts: ["GGUF", "llama.cpp", "CPU Inference", "Q4_0", "Q5_K_M"], colabUrl: COLAB_BASE + "inference_notebooks/43_gguf_cpu_inference.ipynb" },
  ],
};

export const allStages = [...stages, inferenceStage];

export function getNotebookBySlug(slug: string): { notebook: Notebook; stage: Stage } | null {
  for (const stage of allStages) {
    const notebook = stage.notebooks.find((n) => n.slug === slug);
    if (notebook) return { notebook, stage };
  }
  return null;
}

export const SITE_CONFIG = {
  name: "LLM Dojo",
  tagline: "Master LLM Fine-Tuning & Inference — From White Belt to Black Belt",
  description:
    "83 hands-on notebooks covering everything from transformer basics to CUDA kernels, LoRA, QLoRA, DPO, RLHF, vLLM serving, and production deployment. Free, open-source, and built to run on Google Colab.",
  url: "https://llmdojo.dev",
  ogImage: "https://llmdojo.dev/og/default.png",
  twitter: "@llmdojo",
  keywords: [
    "LLM fine-tuning",
    "large language model training",
    "LoRA tutorial",
    "QLoRA guide",
    "transformer fine-tuning",
    "RLHF tutorial",
    "DPO implementation",
    "LLM inference optimization",
    "vLLM serving",
    "GPTQ AWQ quantization",
    "HuggingFace PEFT",
    "free AI course",
    "Google Colab notebooks",
    "PyTorch LLM training",
    "FlashAttention tutorial",
    "DeepSpeed ZeRO",
    "speculative decoding",
    "KV cache optimization",
    "LLM black belt",
  ],
};
