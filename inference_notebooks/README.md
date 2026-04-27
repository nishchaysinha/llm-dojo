# Stage 4: Advanced Optimization Notebooks

This directory contains production-ready notebooks covering advanced LLM inference optimization techniques (Stage 4 of the learning roadmap).

## Stage 4 Notebooks (Advanced Quantization)

### 41_gptq_quantization.ipynb
**GPTQ: Accurate Post-Training Quantization**
- INT4 quantization with minimal quality loss (<1%)
- How GPTQ works (Hessian-aware quantization)
- Using AutoGPTQ library for quantization
- Calibration data requirements (128-512 samples)
- Quantizing Llama 2 7B to INT4
- Quality evaluation and benchmarks
- 4x memory reduction, 2-2.5x speed improvement
- Integration with vLLM, TensorRT-LLM, Transformers

**Key Insights**:
- Achieves 4x memory reduction with <2% quality loss
- Uses layer-wise Hessian to identify important weights
- Production-viable quality at INT4
- Best for: NVIDIA GPUs, production serving

### 42_awq_quantization.ipynb
**AWQ: Activation-Aware Weight Quantization**
- Advanced quantization technique (better than GPTQ)
- Activation-aware weight importance
- Salient weight identification and protection
- Using AutoAWQ library
- Quality comparison vs GPTQ (20-40% better)
- Speed and memory benchmarks
- When to use AWQ vs GPTQ

**Key Insights**:
- 0.5-1.5% quality loss (vs 1-2% for GPTQ)
- 2x faster quantization time than GPTQ
- Same memory reduction (4x)
- Best for: Quality-critical applications, new projects

### 43_gguf_cpu_inference.ipynb
**GGUF Format and CPU Inference with llama.cpp**
- GGUF format explained (successor to GGML)
- Different quantization levels (Q4_0, Q5_0, Q8_0, Q2_K, etc.)
- Installing and using llama.cpp
- Converting models to GGUF format
- CPU performance benchmarks (5-40 tokens/sec)
- Apple Silicon (Metal) optimization
- When CPU inference makes sense

**Key Insights**:
- Enables LLM inference on consumer hardware without GPUs
- Memory-mapped loading (instant startup)
- Apple Silicon 2-5x faster than x86 CPUs
- Best for: Local/privacy-first apps, development, consumer hardware

## Notebook Organization

All notebooks follow a consistent structure:
1. **Introduction**: What problem does this solve?
2. **Theory**: How does the technique work?
3. **Implementation**: Working code with detailed explanations
4. **Benchmarking**: Performance comparisons
5. **Best Practices**: When to use and production tips
6. **Resources**: Links to papers, libraries, documentation

## Quick Start

### For GPU Quantization (Production)
1. Start with **42_awq_quantization.ipynb** (better quality)
2. Or use **41_gptq_quantization.ipynb** (more ecosystem support)
3. Both achieve 4x memory reduction with <2% quality loss

### For CPU Inference (Local/Development)
1. Use **43_gguf_cpu_inference.ipynb**
2. Download pre-converted models from TheBloke
3. Start with Q4_K_M quantization level
4. Works on any modern laptop (8GB+ RAM)

## Performance Summary

### Memory Reduction (Llama 2 7B)
- FP16: 14 GB (baseline)
- GPTQ INT4: 3.6 GB (3.9x reduction)
- AWQ INT4: 3.6 GB (3.9x reduction)
- GGUF Q4_K_M: 4.1 GB (3.4x reduction)

### Quality Loss (from FP16 baseline)
- GPTQ INT4: 1-2%
- AWQ INT4: 0.5-1.5% (better!)
- GGUF Q4_K_M: 0.6%
- GGUF Q8_0: <0.1%

### Speed (Llama 2 7B)
- GPTQ/AWQ (A100 GPU): 100-200 tokens/sec
- GGUF (M3 Max CPU): 40-50 tokens/sec
- GGUF (Intel i7 CPU): 10-15 tokens/sec

## Comparison Matrix

| Method | Hardware | Memory | Quality | Speed | Best For |
|--------|----------|--------|---------|-------|----------|
| GPTQ | NVIDIA GPU | 3.6GB | -1.5% | 150 tok/s | Production, ecosystem |
| AWQ | NVIDIA GPU | 3.6GB | -0.8% | 150 tok/s | Production, quality |
| GGUF | Any CPU | 4.1GB | -0.6% | 10-40 tok/s | Local, development |

## Decision Guide

### Choose GPTQ if:
- Using vLLM or TensorRT-LLM (excellent support)
- Pre-quantized model available (1000+ models on HuggingFace)
- Production serving on NVIDIA GPUs

### Choose AWQ if:
- Quality is critical (every 0.5% matters)
- Want faster quantization (2x faster than GPTQ)
- Starting a new project (best default)

### Choose GGUF if:
- No GPU available (CPU-only)
- Local/privacy-first applications
- Development and experimentation
- Apple Silicon (excellent performance with Metal)
- Cost-sensitive deployments

## Related Resources

- **Reference**: [LLM_INFERENCE_ROADMAP.md](../LLM_INFERENCE_ROADMAP.md) - Complete learning roadmap
- **Notebook 56**: [speculative_decoding.ipynb](../notebooks/56_speculative_decoding.ipynb) - 2-3x speed improvement
- **Stage 0-3**: Other stages in `inference_notebooks/` directory

## Papers and Libraries

### GPTQ
- Paper: "GPTQ: Accurate Post-Training Quantization for GPT" (Frantar et al., 2023)
- Library: https://github.com/AutoGPTQ/AutoGPTQ
- Models: https://huggingface.co/TheBloke (search "GPTQ")

### AWQ
- Paper: "AWQ: Activation-aware Weight Quantization" (Lin et al., 2023)
- Library: https://github.com/mit-han-lab/llm-awq
- Models: https://huggingface.co/models?search=awq

### GGUF/llama.cpp
- Repository: https://github.com/ggerganov/llama.cpp
- Python bindings: https://github.com/abetlen/llama-cpp-python
- Models: https://huggingface.co/TheBloke (search "GGUF")

## Getting Help

- Review the [LLM_INFERENCE_ROADMAP.md](../LLM_INFERENCE_ROADMAP.md) for context
- Each notebook has detailed explanations and working examples
- Check decision trees in each notebook for guidance
- Benchmark on your specific hardware and use case

## Next Steps

After completing Stage 4:
1. **Stage 5**: Production infrastructure (TensorRT-LLM, custom kernels)
2. Combine techniques: AWQ + vLLM + speculative decoding
3. Deploy to production with monitoring
4. A/B test different quantization methods

---

**Created**: 2026-04-26  
**Stage**: 4 (Advanced Optimization)  
**Focus**: Quantization techniques for production deployment
