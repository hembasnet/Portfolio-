import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, FileCode2, Copy, Check } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenDemo?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenDemo }) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.clientOrOrg}</span>
            <span aria-hidden="true">·</span>
            <span>{project.timeframe}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              {project.title}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-300 mt-2">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white font-mono tabular-nums">
                  {m.value}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Media Viewport */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-[16/9] bg-zinc-950 relative">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                The Engineering Problem
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                The Architectural Solution
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Pipeline & System Architecture */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500" />
              <span>Pipeline & Execution Stages</span>
            </h3>
            <div className="space-y-2">
              {project.architecture.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300 font-mono text-xs"
                >
                  <span className="text-amber-500 font-bold shrink-0">Stage 0{sIdx + 1}:</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Innovations */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-white uppercase tracking-wider mb-3">
              Key Technical Innovations
            </h3>
            <ul className="space-y-2">
              {project.innovations.map((inv, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Highlight */}
          {project.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
              <div className="px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-amber-400" />
                  <span className="text-zinc-200">{project.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Unboxed Tags */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-white">Stack:</span>
            {project.techStack.map((tech, tIdx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {tIdx < project.techStack.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="sticky bottom-0 z-10 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read Paper</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
