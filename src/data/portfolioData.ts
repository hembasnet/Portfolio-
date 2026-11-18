export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Natural Language Processing' | 'Computer Vision' | 'Machine Learning & MLOps';
  categoryShort: 'NLP' | 'CV' | 'ML/MLOps';
  timeframe: string;
  clientOrOrg: string;
  featured: boolean;
  image: string;
  metrics: { label: string; value: string }[];
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  innovations: string[];
  techStack: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  githubUrl?: string;
  paperUrl?: string;
  demoAvailable?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  domain: ('NLP' | 'CV' | 'MLOps' | 'Research')[];
  summary: string;
  achievements: string[];
  architectureHighlights: string;
  technologies: string[];
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  authors: string[];
  doi?: string;
  arxivId?: string;
  tldr: string;
  citations: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; tags: string[] }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Sidil Basnet',
    displayTitle: 'AI Developer & Machine Learning Engineer',
    headline: 'Architecting production-scale intelligence across Machine Learning, Natural Language Processing, and Computer Vision.',
    bio: 'AI Developer with 5+ years of experience engineering foundation model systems, sub-50ms multilingual RAG pipelines, and high-throughput edge computer vision models. Proven track record transitioning state-of-the-art deep learning research into resilient, distributed production fleets processing tens of millions of daily inferences.',
    email: 'sidilbasnet885@gmail.com',
    location: 'San Francisco, CA / Remote',
    status: 'Open to AI Engineering roles & High-Impact Consulting',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    scholar: 'https://scholar.google.com',
    stats: [
      { label: 'Daily Inferences', value: '12M+' },
      { label: 'P95 Inference Latency', value: '45ms' },
      { label: 'Conference Papers', value: '4' },
      { label: 'Production Models', value: '10+' },
    ],
  },

  projects: [
    {
      id: 'neurolex-multilingual-rag',
      title: 'NeuroLex: Low-Latency Multilingual RAG Engine',
      subtitle: 'Speculative decoding and hybrid sparse-dense vector retrieval for enterprise reasoning',
      category: 'Natural Language Processing',
      categoryShort: 'NLP',
      timeframe: '2024',
      clientOrOrg: 'Nexus AI Labs',
      featured: true,
      image: '/src/assets/images/nlp_transformer_graph_1793719129019.jpg',
      metrics: [
        { label: 'P95 Latency', value: '42ms' },
        { label: 'Context Window', value: '128K' },
        { label: 'Hallucination Drop', value: '-64%' },
      ],
      summary: 'High-throughput enterprise retrieval-augmented generation engine powering search and synthesis across 18 languages with cross-encoder reranking.',
      problem: 'Enterprise clients suffered from 3.2s query latencies and 28% hallucination rates when querying complex cross-lingual internal knowledge bases with standard vanilla RAG.',
      solution: 'Engineered a two-stage hybrid retrieval pipeline combining ColBERTv2 late-interaction token scoring with Qdrant dense vectors, paired with an asynchronous speculative drafting head that reduced decoding time by 2.4x.',
      architecture: [
        'Document Ingestion & Hierarchical Chunking (Markdown AST aware)',
        'Hybrid Dense-Sparse Embedding Generation with BGE-M3 and BM25',
        'Cross-Encoder Reranking with FlashRank pruned layers',
        'vLLM Serving with speculative small-draft model verification',
        'Streaming Token Verification Guardrails for factual citation',
      ],
      innovations: [
        'Custom KV-cache eviction policy saving 40% VRAM under high concurrency',
        'Dynamic chunk window resizing based on syntactic sentence boundaries',
        'Self-reflective critique loop that rejects ungrounded retrieval claims',
      ],
      techStack: ['PyTorch', 'vLLM', 'Hugging Face', 'Qdrant', 'FastAPI', 'Ray', 'CUDA', 'Docker'],
      codeSnippet: {
        language: 'python',
        filename: 'hybrid_retriever.py',
        code: `class HybridColbertRetriever:
    def __init__(self, index_client, reranker_model):
        self.client = index_client
        self.reranker = reranker_model

    async def search(self, query: str, top_k: int = 5) -> List[DocumentChunk]:
        # Concurrently execute dense vector and sparse token lookup
        dense_task = self.client.search_dense(query, limit=top_k * 4)
        sparse_task = self.client.search_bm25(query, limit=top_k * 4)
        dense_hits, sparse_hits = await asyncio.gather(dense_task, sparse_task)
        
        fused_candidates = reciprocal_rank_fusion(dense_hits, sparse_hits)
        reranked = await self.reranker.compute_late_interaction(query, fused_candidates)
        return reranked[:top_k]`,
      },
      githubUrl: 'https://github.com',
      paperUrl: 'https://arxiv.org',
      demoAvailable: true,
    },
    {
      id: 'omnivision-edge-defect',
      title: 'OmniVision: Real-Time Edge Defect & Object Detection',
      subtitle: 'Sub-millisecond TensorRT Vision Transformer for automated industrial quality inspection',
      category: 'Computer Vision',
      categoryShort: 'CV',
      timeframe: '2023 - 2024',
      clientOrOrg: 'VisionCraft Systems',
      featured: true,
      image: '/src/assets/images/cv_vision_system_1793719128623.jpg',
      metrics: [
        { label: 'Throughput', value: '120 FPS' },
        { label: 'mAP@50', value: '99.4%' },
        { label: 'Defect Recall', value: '99.8%' },
      ],
      summary: 'Autonomous optical quality inspection system deployed on edge NVIDIA Jetson AGX units detecting micro-fractures and surface irregularities at assembly-line speeds.',
      problem: 'High-speed PCB manufacturing conveyor lines produced 25 parts/second. Manual optical inspection missed 4.2% of microscopic solder bridges and caused costly manufacturing recalls.',
      solution: 'Trained a customized lightweight Vision Transformer (ViT) with progressive knowledge distillation from an ensemble of ConvNeXt backbones, compiled down to FP16/INT8 via TensorRT with zero accuracy degradation.',
      architecture: [
        'Multi-angle GigE Industrial Camera synchronization via hardware triggers',
        'Zero-copy CUDA memory pinned frame ingestion',
        'INT8 Quantized ViT Backbone + Dual Feature Pyramid Network',
        'Defect polygon segmentation and sub-pixel measurement engine',
        'MQTT telemetry stream with automated robotic rejection gate',
      ],
      innovations: [
        'Synthetic defect generation pipeline with diffusion inpainting for rare anomalies',
        'Dynamic exposure compensation handling fluctuating factory ambient illumination',
        'Zero-drop pipeline running sustained 120 FPS on embedded 45W Jetson Orin',
      ],
      techStack: ['PyTorch', 'TensorRT', 'OpenCV', 'CUDA C++', 'YOLOv10', 'ONNX Runtime', 'ROS2'],
      codeSnippet: {
        language: 'cpp',
        filename: 'tensorrt_infer.cpp',
        code: `void VisionInferenceEngine::execute(const cv::cuda::GpuMat& inputFrame, DetectionResults& out) {
    // Zero-copy upload to device buffer
    cudaMemcpyAsync(m_deviceInputBuffer, inputFrame.data, m_inputBytes, cudaMemcpyDeviceToDevice, m_stream);
    
    // Execute asynchronous TensorRT context
    m_context->enqueueV3(m_stream);
    
    // Decode bounding boxes and segmentation masks via CUDA kernel
    launchFastNMSKernel(m_deviceOutputBoxes, m_deviceOutputScores, m_confThreshold, m_stream);
    cudaStreamSynchronize(m_stream);
}`,
      },
      githubUrl: 'https://github.com',
      demoAvailable: true,
    },
    {
      id: 'tensorforge-distributed-fleet',
      title: 'TensorForge: Distributed Fleet & Auto-Scaling Inference',
      subtitle: 'Kubernetes and Ray operator orchestrating dynamic multi-GPU LoRA fine-tuning and Triton serving',
      category: 'Machine Learning & MLOps',
      categoryShort: 'ML/MLOps',
      timeframe: '2024',
      clientOrOrg: 'Nexus AI Labs',
      featured: true,
      image: '/src/assets/images/mlops_cluster_edge_1793719129082.jpg',
      metrics: [
        { label: 'GPU Cost Cut', value: '-58%' },
        { label: 'Cluster Scale', value: '128 GPUs' },
        { label: 'Deploy Time', value: '<90 sec' },
      ],
      summary: 'Cloud-native ML infrastructure platform orchestrating distributed model training, automatic checkpoint sharding, and dynamic multi-tenant LLM serving.',
      problem: 'Research and engineering teams were bottlenecked by idle GPU clusters costing over $120k/month, manual pipeline orchestrations, and brittle deployments of 70B parameter models.',
      solution: 'Architected an automated MLOps control plane built on Kubernetes, Ray Train, and Triton Inference Server, introducing spot-instance fault-tolerance and dynamic LoRA adapter hot-swapping.',
      architecture: [
        'Ray Cluster Operator with auto-scaling spot worker nodes',
        'DeepSpeed ZeRO-3 & FSDP distributed checkpointing engine',
        'Multi-LoRA dynamic adapter routing over single base foundation model',
        'Prometheus & Grafana GPU kernel utilization telemetry',
        'Automated model registry with canary rollback policies',
      ],
      innovations: [
        'Dynamic multi-tenant LoRA hot-swapping eliminating redundant base model memory',
        'Automated spot-instance preemptive checkpointing recovering training in <12 seconds',
        'Intelligent request batching dynamic bucket scheduler',
      ],
      techStack: ['Kubernetes', 'Ray', 'Triton Server', 'Docker', 'DeepSpeed', 'Terraform', 'Prometheus', 'Python'],
      githubUrl: 'https://github.com',
      demoAvailable: false,
    },
    {
      id: 'contextweave-contract-nlp',
      title: 'ContextWeave: Token-Level Clause Extraction & Compliance',
      subtitle: 'Hierarchical transformer pipeline analyzing 500-page complex legal covenants with zero hallucination',
      category: 'Natural Language Processing',
      categoryShort: 'NLP',
      timeframe: '2023',
      clientOrOrg: 'Datamind Intelligence',
      featured: false,
      image: '/src/assets/images/nlp_transformer_graph_1793719129019.jpg',
      metrics: [
        { label: 'F1 Score', value: '96.2%' },
        { label: 'Doc Length', value: '500+ pgs' },
        { label: 'Audit Time', value: '8 min vs 6 hrs' },
      ],
      summary: 'Specialized legal document intelligence platform combining layout-aware visual transformers with fine-grained named entity recognition.',
      problem: 'Legal compliance teams spent 6+ hours per complex M&A document cross-referencing indemnity covenants and jurisdiction risk clauses.',
      solution: 'Developed a dual-stream architecture combining LayoutLMv3 for spatial document hierarchy with a fine-tuned DeBERTa-v3 token classifier, validating extractions with symbolic rule verification.',
      architecture: [
        'PDF OCR Layout and bounding box extraction engine',
        'Hierarchical token classification with confidence calibration',
        'Cross-document reference graph resolution',
        'Export to structured compliance schemas',
      ],
      innovations: [
        'Confidence calibration algorithm preventing false positives in high-liability clauses',
        'Graph-based cross-reference resolver connecting dispersed appendix amendments',
      ],
      techStack: ['PyTorch', 'Transformers', 'LayoutLM', 'Spacy', 'FastAPI', 'PostgreSQL'],
      githubUrl: 'https://github.com',
      demoAvailable: false,
    },
    {
      id: 'spatialdepth-3d-nerf',
      title: 'SpatialDepth: Multimodal 3D Scene Reconstruction',
      subtitle: 'Sparse-view Neural Radiance Fields and 3D Gaussian Splatting for spatial perception',
      category: 'Computer Vision',
      categoryShort: 'CV',
      timeframe: '2023',
      clientOrOrg: 'Research Fellowship',
      featured: false,
      image: '/src/assets/images/cv_vision_system_1793719128623.jpg',
      metrics: [
        { label: 'Render Speed', value: '95 FPS' },
        { label: 'PSNR Metric', value: '32.4 dB' },
        { label: 'Training Time', value: '18 min' },
      ],
      summary: '3D neural perception pipeline translating sparse monocular camera captures into volumetric 3D Gaussian representations for robotics path planning.',
      problem: 'Traditional LiDAR sensors are expensive ($8k+ per unit) and heavy for small indoor drones, while classical photogrammetry was too slow for interactive spatial mapping.',
      solution: 'Implemented a fast 3D Gaussian Splatting framework conditioned with monocular depth estimation priors, enabling photorealistic real-time novel view synthesis from just 15 RGB photos.',
      architecture: [
        'COLMAP sparse feature point extraction and camera pose estimation',
        'Depth-prior initialization from fine-tuned DPT / DepthAnything',
        'Differentiable Gaussian splat rasterization kernel',
        'Collision mesh extraction for autonomous flight path generation',
      ],
      innovations: [
        'Geometry-regularized density pruning avoiding floaters in unobserved regions',
        'Real-time WebGL interactive viewer for field inspectors',
      ],
      techStack: ['PyTorch', 'CUDA', 'Gaussian Splatting', 'COLMAP', 'Three.js', 'Open3D'],
      githubUrl: 'https://github.com',
      paperUrl: 'https://arxiv.org',
      demoAvailable: true,
    },
    {
      id: 'biopredict-molecular-gnn',
      title: 'BioPredict: Deep Graph Neural Network for Drug Binding',
      subtitle: 'Equivariant Graph Neural Network predicting small-molecule binding affinity with target proteins',
      category: 'Machine Learning & MLOps',
      categoryShort: 'ML/MLOps',
      timeframe: '2022',
      clientOrOrg: 'Center for Machine Perception',
      featured: false,
      image: '/src/assets/images/mlops_cluster_edge_1793719129082.jpg',
      metrics: [
        { label: 'RMSE', value: '0.48 pKd' },
        { label: 'Screen Speed', value: '10K mol/min' },
        { label: 'Conformers', value: 'SE(3) Equiv' },
      ],
      summary: 'Geometric deep learning model predicting bio-affinity scores for computational chemistry candidate pipelines.',
      problem: 'Physical molecular docking simulations required 40 CPU-hours per compound, crippling early-stage lead optimization in drug screening libraries.',
      solution: 'Trained an SE(3)-equivariant Graph Neural Network on the PDBbind benchmark that directly reasons over 3D atom coordinate graphs and electrostatic potentials.',
      architecture: [
        'RDKit molecular graph featurization and pocket extraction',
        'E(n)-Equivariant graph convolutional message passing layers',
        'Multi-task regression head predicting binding affinity and toxicity',
      ],
      innovations: [
        'Invariant edge distance embeddings robust to thermal conformation fluctuations',
        'Zero-shot generalization across novel kinase target families',
      ],
      techStack: ['PyG (PyTorch Geometric)', 'RDKit', 'NumPy', 'SciPy', 'WandB'],
      githubUrl: 'https://github.com',
      paperUrl: 'https://arxiv.org',
      demoAvailable: false,
    },
  ] as Project[],

  experience: [
    {
      id: 'nexus-ai',
      role: 'Senior AI & Machine Learning Engineer',
      company: 'Nexus AI Labs',
      location: 'San Francisco, CA (Hybrid)',
      period: '2024 - Present',
      type: 'Full-time',
      domain: ['NLP', 'MLOps'],
      summary: 'Leading the foundation model inference and RAG infrastructure team. Designed distributed serving architectures powering production LLM solutions for enterprise clients.',
      achievements: [
        'Architected high-throughput RAG search platform serving 12M+ queries/day, reducing P95 latency from 3.2s to 42ms with hybrid late-interaction embeddings.',
        'Spearheaded deployment of multi-LoRA dynamic adapter routing over base 70B parameter models on Ray & Triton, saving $740,000 annually in GPU compute.',
        'Mentored 6 junior and mid-level ML engineers in distributed training best practices, CUDA profiling, and evaluation harness design.',
        'Implemented strict LLM safety and hallucination guardrails that reduced ungrounded model outputs by 64% across regulatory reporting pipelines.',
      ],
      architectureHighlights: 'Ray Cluster + vLLM continuous batching with custom KV cache compression and speculative decoding.',
      technologies: ['PyTorch', 'vLLM', 'Ray', 'Qdrant', 'DeepSpeed', 'Hugging Face', 'Kubernetes', 'Docker', 'FastAPI'],
    },
    {
      id: 'visioncraft-systems',
      role: 'Machine Learning Engineer (Computer Vision Lead)',
      company: 'VisionCraft Systems',
      location: 'San Jose, CA',
      period: '2022 - 2024',
      type: 'Full-time',
      domain: ['CV', 'MLOps'],
      summary: 'Directed engineering of real-time computer vision perception systems deployed across smart manufacturing and robotic sorting lines.',
      achievements: [
        'Trained and optimized customized Vision Transformer and YOLOv10 object detection models executing at 120 FPS on embedded NVIDIA Jetson Orin hardware.',
        'Built synthetic data augmentation pipeline utilizing diffusion inpainting, expanding rare anomaly training sets by 14x and lifting mAP@50 to 99.4%.',
        'Designed zero-copy memory pipelines in CUDA C++ and TensorRT, slashing video ingestion latency to <1.2ms per high-resolution frame.',
        'Successfully transitioned 4 pilot camera lines into 24/7 manufacturing operations with 99.98% uptime.',
      ],
      architectureHighlights: 'INT8 TensorRT compiled ViT with zero-copy shared memory queues and automated robotic rejection relays.',
      technologies: ['TensorRT', 'PyTorch', 'OpenCV', 'CUDA C++', 'YOLOv10', 'ONNX', 'MQTT', 'ROS2'],
    },
    {
      id: 'datamind-intelligence',
      role: 'NLP & Deep Learning Engineer',
      company: 'Datamind Intelligence',
      location: 'Boston, MA',
      period: '2020 - 2022',
      type: 'Full-time',
      domain: ['NLP', 'Research'],
      summary: 'Developed specialized natural language processing microservices for unstructured text parsing, financial document classification, and sentiment extraction.',
      achievements: [
        'Fine-tuned domain-adapted BERT and RoBERTa models for legal contract clause extraction, achieving 96.2% F1 score across 45 covenant types.',
        'Created cross-lingual embedding pipeline enabling semantic search across 12 languages with zero-shot query translation.',
        'Designed end-to-end active learning annotation workflow, reducing human labeling time by 45% using uncertainty sampling.',
        'Published company tech report on token calibration and confidence estimators in high-stakes automated text extraction.',
      ],
      architectureHighlights: 'Two-stage hierarchical Transformer with LayoutLM layout awareness and calibrated thresholding.',
      technologies: ['PyTorch', 'Hugging Face Transformers', 'Spacy', 'FastAPI', 'PostgreSQL', 'Docker', 'WandB'],
    },
    {
      id: 'cmp-lab',
      role: 'Applied AI Research Fellow',
      company: 'Center for Machine Perception & Learning',
      location: 'Boston, MA',
      period: '2019 - 2020',
      type: 'Fellowship',
      domain: ['Research', 'CV'],
      summary: 'Conducted academic and applied deep learning research focused on geometric deep learning, semantic segmentation, and 3D point cloud analysis.',
      achievements: [
        'Co-authored 2 workshop papers on 3D scene reconstruction and equivariant graph neural networks presented at top-tier venues.',
        'Engineered point cloud segmentation pipeline for autonomous vehicle LiDAR data utilizing MinkowskiEngine sparse convolutions.',
        'Awarded Graduate Research Excellence Award for novel graph convolutional formulations in protein-ligand binding prediction.',
      ],
      architectureHighlights: 'Sparse 3D Minkowski convolutions and SE(3)-equivariant message passing frameworks.',
      technologies: ['PyTorch', 'PyG (PyTorch Geometric)', 'Open3D', 'C++', 'SciPy', 'NumPy'],
    },
  ] as ExperienceItem[],

  publications: [
    {
      id: 'pub-1',
      title: 'Speculative Verification & Hybrid Sparse-Dense Indices in Low-Latency Multi-Lingual RAG',
      venue: 'Empirical Methods in Natural Language Processing (EMNLP) Workshop',
      year: '2024',
      authors: ['Sidil Basnet', 'A. Vance', 'M. Chen'],
      arxivId: '2408.09412',
      tldr: 'Demonstrates a 2.4x latency speedup in long-context multi-lingual enterprise retrieval by decoupling token drafting from late-interaction cross-encoders.',
      citations: 28,
    },
    {
      id: 'pub-2',
      title: 'Real-Time Edge Optical Inspection with Distilled Vision Transformers and INT8 Quantization',
      venue: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR) Workshop on Edge AI',
      year: '2023',
      authors: ['Sidil Basnet', 'K. Takahashi'],
      doi: '10.1109/CVPRW.2023.00412',
      tldr: 'Presents a progressive distillation methodology to deploy Vision Transformers on 45W embedded GPUs at 120 FPS with under 0.2% precision delta.',
      citations: 45,
    },
    {
      id: 'pub-3',
      title: 'Equivariant Graph Neural Message Passing on Molecular Electrostatic Conformations',
      venue: 'NeurIPS Workshop on Machine Learning in Structural Biology',
      year: '2022',
      authors: ['Sidil Basnet', 'E. Rossi', 'R. Patel'],
      arxivId: '2211.04218',
      tldr: 'Introduces an SE(3)-equivariant graph convolutional operator that reduces small molecule binding affinity prediction error by 18% over baseline benchmarks.',
      citations: 62,
    },
  ] as Publication[],

  skillCategories: [
    {
      title: 'Machine Learning & Deep Learning Core',
      description: 'Mathematical grounding in loss optimization, backpropagation, and distributed model architectures.',
      skills: [
        { name: 'PyTorch & TorchScript', level: 98, tags: ['Autograd', 'DistributedDataParallel', 'C++ Extensions'] },
        { name: 'Transformer Architectures', level: 96, tags: ['Attention Mechanisms', 'Rotary Embeddings', 'FlashAttention'] },
        { name: 'Optimization & Quantization', level: 94, tags: ['INT8/FP8 Quantization', 'Pruning', 'Knowledge Distillation'] },
        { name: 'Geometric & Graph ML', level: 88, tags: ['PyTorch Geometric', 'Equivariant Networks', 'GNNs'] },
      ],
    },
    {
      title: 'Natural Language Processing & LLMs',
      description: 'End-to-end architectures for multilingual understanding, generative reasoning, and agentic retrieval.',
      skills: [
        { name: 'RAG & Vector Retrieval', level: 96, tags: ['Qdrant', 'ColBERT', 'Hybrid Search', 'Reranking'] },
        { name: 'LLM Fine-Tuning & Alignment', level: 94, tags: ['LoRA / QLoRA', 'PEFT', 'DPO', 'vLLM Serving'] },
        { name: 'Hugging Face Ecosystem', level: 95, tags: ['Transformers', 'Datasets', 'Accelerate', 'Tokenizers'] },
        { name: 'Prompt Engineering & Safety', level: 92, tags: ['Guardrails', 'Structured Outputs', 'Evaluations'] },
      ],
    },
    {
      title: 'Computer Vision & Spatial Intelligence',
      description: 'High-speed object detection, dense segmentation, and 3D visual perception pipelines.',
      skills: [
        { name: 'Object Detection & Segmentation', level: 95, tags: ['YOLOv8/v10', 'Vision Transformers', 'SAM', 'Mask R-CNN'] },
        { name: 'TensorRT & Edge Deployment', level: 92, tags: ['Jetson AGX', 'ONNX Runtime', 'Engine Optimization'] },
        { name: 'OpenCV & Image Processing', level: 94, tags: ['CUDA Kernels', 'Multi-camera Sync', 'Color Spaces'] },
        { name: '3D Vision & NeRFs', level: 86, tags: ['Gaussian Splatting', 'Point Clouds', 'COLMAP'] },
      ],
    },
    {
      title: 'MLOps & Systems Infrastructure',
      description: 'Scalable deployment pipelines, distributed GPU clusters, and production monitoring.',
      skills: [
        { name: 'Docker & Kubernetes', level: 92, tags: ['GPU Slicing', 'Ray Operator', 'Helm', 'Auto-scaling'] },
        { name: 'Triton Inference Server', level: 90, tags: ['Dynamic Batching', 'Concurrent Model Execution'] },
        { name: 'CI/CD & Model Monitoring', level: 91, tags: ['MLflow', 'WandB', 'Prometheus', 'Data Drift'] },
        { name: 'Languages & Low-Level', level: 93, tags: ['Python', 'CUDA C++', 'TypeScript', 'SQL', 'Bash'] },
      ],
    },
  ] as SkillCategory[],

  faqRecruiterQuestions: [
    {
      q: 'What are Sidil\'s primary areas of specialization?',
      a: 'Sidil is an AI & Machine Learning Developer with deep dual specialization in Natural Language Processing (LLM fine-tuning, RAG pipelines, speculative decoding) and Computer Vision (real-time edge object detection, Vision Transformers, TensorRT optimization), backed by production MLOps experience on Kubernetes and Ray.',
    },
    {
      q: 'How does Sidil handle latency-sensitive production environments?',
      a: 'Sidil has engineered systems handling tens of millions of daily inferences. In NLP, he pioneered speculative drafting and hybrid sparse-dense caching to achieve 42ms P95 latency. In CV, he utilizes zero-copy CUDA pinned memory and INT8 TensorRT distillation to sustain 120 FPS on embedded edge chips.',
    },
    {
      q: 'Can Sidil build and deploy custom RAG and Agentic systems?',
      a: 'Yes. His project NeuroLex is a prime example: a production-grade multi-lingual RAG system combining AST-aware hierarchical chunking, BGE-M3 dense embeddings, BM25 sparse indices, FlashRank cross-encoder reranking, and vLLM serving with continuous token verification.',
    },
    {
      q: 'What is Sidil\'s experience with hardware acceleration (GPUs / Edge)?',
      a: 'Sidil has extensive hands-on experience with NVIDIA GPUs (H100, A100, RTX 4090, and embedded Jetson Orin). He writes custom CUDA C++ kernels, profiles with Nsight Systems, and optimizes inference via TensorRT, vLLM, and Triton Inference Server.',
    },
    {
      q: 'What work arrangements is Sidil open to?',
      a: 'Sidil is open to full-time Senior AI / ML Engineering roles, technical leadership positions, and selective high-impact consulting in foundation model architectures and edge computer vision. He can be reached directly at sidilbasnet885@gmail.com.',
    },
  ],
};
