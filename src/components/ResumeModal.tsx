import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, MapPin, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { profile, experience, skillCategories, publications } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
SIDIL BASNET
AI Developer & Machine Learning Engineer
Email: ${profile.email} | Location: ${profile.location} | GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}

PROFESSIONAL SUMMARY
${profile.bio}

CORE TECHNICAL SKILLS
- Machine Learning & Deep Learning: PyTorch, CUDA C++, TensorRT, DistributedDataParallel, DeepSpeed, Ray Train, ONNX
- Natural Language Processing: Large Language Models, Fine-Tuning (LoRA/QLoRA), RAG, vLLM, Qdrant, ColBERT, Tokenizers
- Computer Vision: YOLOv8/v10, Vision Transformers (ViT), Segment Anything (SAM), OpenCV, 3D Gaussian Splatting, NeRF
- MLOps & Infrastructure: Docker, Kubernetes, Triton Inference Server, MLflow, Prometheus, AWS SageMaker, GCP Vertex AI

PROFESSIONAL EXPERIENCE
${experience
  .map(
    (exp) => `
${exp.role} | ${exp.company}
${exp.period} | ${exp.location}
${exp.summary}
Key Deliverables:
${exp.achievements.map((a) => `• ${a}`).join('\n')}
Stack: ${exp.technologies.join(', ')}
`
  )
  .join('\n')}

SELECTED PUBLICATIONS
${publications
  .map(
    (pub) => `• "${pub.title}", ${pub.venue} (${pub.year}). Citations: ${pub.citations}`
  )
  .join('\n')}

EDUCATION
Master of Science in Computer Science (Artificial Intelligence Specialization)
Center for Machine Perception & Learning | Honors & Graduate Research Fellow
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white text-zinc-900 border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Actions Bar */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-zinc-200 bg-white/95 backdrop-blur-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
            <span>ATS-Ready Resume</span>
            <span aria-hidden="true">·</span>
            <span>Sidil Basnet</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="overflow-y-auto p-8 sm:p-12 font-sans text-zinc-900 space-y-8 bg-white print:p-0 print:m-0">
          {/* Header */}
          <div className="border-b border-zinc-200 pb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 font-display">
              {profile.name}
            </h1>
            <div className="text-sm font-semibold text-zinc-700 mt-1">
              {profile.displayTitle}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-600 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profile.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
              <span>·</span>
              <span>linkedin.com/in/sidil-basnet</span>
              <span>·</span>
              <span>github.com/sidilbasnet</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-zinc-700">
              {profile.bio}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
              Core Technical Competencies
            </h2>
            <div className="space-y-1.5 text-xs text-zinc-700">
              <div>
                <strong className="text-zinc-950">Deep Learning & Systems:</strong> PyTorch, CUDA C++, TensorRT, DeepSpeed ZeRO-3, Ray Train, TorchScript, ONNX Runtime, DistributedDataParallel.
              </div>
              <div>
                <strong className="text-zinc-950">Natural Language Processing:</strong> LLM Fine-Tuning (LoRA, QLoRA, DPO), vLLM High-Throughput Serving, Multi-Lingual RAG, ColBERTv2, Qdrant, Speculative Decoding.
              </div>
              <div>
                <strong className="text-zinc-950">Computer Vision:</strong> YOLOv8/v10, Vision Transformers (ViT), Segment Anything (SAM), OpenCV, 3D Gaussian Splatting, NeRF, INT8 Quantization.
              </div>
              <div>
                <strong className="text-zinc-950">MLOps & Cloud Infrastructure:</strong> Docker, Kubernetes, Triton Inference Server, MLflow, Prometheus, GPU Cluster Management, Linux, Python, C++, TypeScript.
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-3">
              Professional Work Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-bold text-zinc-950">{exp.role}</span>
                      <span className="text-xs text-zinc-600"> — {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 tabular-nums">{exp.period}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mb-1.5">{exp.location}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-zinc-500 font-mono mt-1.5">
                    <strong>Tech:</strong> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peer-Reviewed Publications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
              Selected Research Publications
            </h2>
            <div className="space-y-2">
              {publications.map((pub) => (
                <div key={pub.id} className="text-xs text-zinc-700">
                  <div className="font-semibold text-zinc-950">"{pub.title}"</div>
                  <div className="text-zinc-600 font-mono text-[11px]">
                    {pub.venue} ({pub.year}) · Citations: {pub.citations} · Authors: {pub.authors.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
              Education & Honors
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <strong className="text-zinc-950">Master of Science in Computer Science (Artificial Intelligence)</strong>
                <div className="text-zinc-600">Specialization in Computer Vision & Neural Architectures · Graduate Research Fellow</div>
              </div>
              <span className="font-mono text-zinc-500">2018 - 2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
