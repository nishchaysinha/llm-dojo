# Stage 0: Data Preparation and Fundamentals

This directory contains comprehensive educational notebooks covering the fundamentals of LLM fine-tuning, with a strong focus on data preparation and quality.

## Notebooks Overview

### 00_environment_setup.ipynb
**Focus**: Setting up your development environment
- GPU detection and CUDA setup
- Installing required libraries (PyTorch, Transformers, etc.)
- HuggingFace authentication
- Testing model loading
- Memory profiling utilities
- Project directory structure

### 01_transformer_basics.ipynb
**Focus**: Understanding transformer architecture
- Self-attention mechanism deep dive
- Multi-head attention
- Positional encoding (sinusoidal vs learned)
- Feed-forward networks
- Complete transformer block
- Architecture variants (Encoder, Decoder, Encoder-Decoder)

### 02_tokenization_deep_dive.ipynb
**Focus**: Text tokenization algorithms and best practices
- BPE (Byte Pair Encoding)
- WordPiece (BERT's tokenizer)
- SentencePiece (modern multilingual)
- Special tokens ([CLS], [SEP], [PAD], etc.)
- Vocabulary size trade-offs
- Tokenizer comparison (BERT vs GPT vs Llama)
- Common tokenization bugs and fixes
- Adding custom tokens

### 03_dataset_preparation_basics.ipynb
**Focus**: Loading and preparing datasets
- Loading from various formats (CSV, JSON, JSONL, Parquet)
- Dataset formats for different tasks
- Train/val/test splitting strategies
- Stratified splits for imbalanced data
- Dataset streaming for large files
- Building preprocessing pipelines
- Efficient saving and loading

### 04_data_quality_analysis.ipynb
**Focus**: Analyzing and ensuring data quality
- Exploratory Data Analysis (EDA) for text
- Length distribution analysis
- Duplicate detection (exact and near-duplicates with SimHash)
- Outlier detection (Z-score, IQR methods)
- Label consistency checking
- PII (Personally Identifiable Information) detection
- Text quality metrics
- Data leakage detection

### 05_handling_class_imbalance.ipynb
**Focus**: Techniques for imbalanced classification
- Understanding and detecting imbalance
- Random oversampling
- Random undersampling
- Class weighting (best for deep learning)
- Stratified sampling (always use!)
- Hybrid approaches
- Method comparison and decision tree
- Evaluation metrics for imbalanced data

### 06_data_augmentation_nlp.ipynb
**Focus**: Creating synthetic training data
- Synonym replacement (WordNet)
- EDA techniques (insert, delete, swap)
- Contextual replacement with BERT
- Back-translation for paraphrasing
- LLM-based generation
- Quality filtering augmented data
- When augmentation helps (dataset size guidelines)
- Method comparison

## Key Learning Outcomes

By completing Stage 0, you will:

1. **Understand Transformers**: Deep knowledge of architecture and components
2. **Master Tokenization**: Choose and configure tokenizers correctly
3. **Prepare Data Properly**: Load, split, and preprocess datasets efficiently
4. **Ensure Data Quality**: Detect and fix common data issues
5. **Handle Imbalance**: Apply appropriate techniques for imbalanced datasets
6. **Augment Strategically**: Know when and how to create synthetic data

## Recommended Order

Follow notebooks in numerical order (00 → 06). Each notebook builds on concepts from previous ones.

## Estimated Time

- **Quick review** (already familiar): 3-4 hours
- **Learning mode** (new to concepts): 8-12 hours
- **Deep dive** (running all code, experimenting): 15-20 hours

## Prerequisites

- Python 3.8+
- Basic understanding of machine learning
- Familiarity with PyTorch (helpful but not required)
- 16GB+ RAM recommended
- GPU with 8GB+ VRAM (for hands-on experiments)

## Historical Context

Each notebook includes historical context explaining:
- **What problem existed** before this technique
- **How it was solved** and by whom
- **Evolution** of the approach over time
- **Modern best practices** based on research

This helps you understand not just *how* to do things, but *why* they work and when to apply them.

## Common Pitfalls Covered

- Tokenizer mismatches
- Data leakage in splits
- Ignoring attention masks
- Using accuracy for imbalanced data
- Low-quality augmented data
- PII in training data
- And many more...

## Next Steps

After completing Stage 0, you'll be ready for:
- **Stage 1**: Basic Fine-Tuning Techniques
- **Stage 2**: Parameter-Efficient Fine-Tuning (LoRA, QLoRA)
- **Stage 3**: Advanced Techniques (Long context, multi-task, etc.)

---

**Note**: These notebooks are designed to be educational and comprehensive. They include detailed comments, historical context, and best practices. Feel free to skip sections you're already familiar with, but we recommend at least skimming them for the insights and tips.
