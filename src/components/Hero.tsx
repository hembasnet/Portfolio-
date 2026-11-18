import React from 'react';
import { ArrowUpRight, Play, Terminal, Download, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenDemos: () => void;
  onOpenAIAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenContact,
  onOpenDemos,
  onOpenAIAssistant,
}) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Kicker with Typographic Separators */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-4">
              <span>AI Developer & Research Engineer</span>
              <span aria-hidden="true">·</span>
              <span>NLP & LLMs</span>
              <span aria-hidden="true">·</span>
              <span>Edge Computer Vision</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] mb-6 font-display [text-wrap:balance]">
              Architecting production intelligence from raw tensors to scale.
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-2xl">
              Specialized in production foundation models, sub-50ms multilingual RAG architectures, and 120 FPS INT8 Vision Transformers on edge hardware. Turning state-of-the-art deep learning research into robust, distributed inference fleets.
            </p>

            {/* Status metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-8 font-mono">
              <span>San Francisco, CA / Remote</span>
              <span aria-hidden="true">·</span>
              <span>Open to Senior AI Roles & High-Impact Advisory</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${profile.email}`} className="text-zinc-700 dark:text-zinc-300 underline underline-offset-4 hover:text-amber-500">
                {profile.email}
              </a>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDemos}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Launch Interactive AI Lab</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </button>

              <button
                onClick={onOpenAIAssistant}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ask AI Twin</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Developer Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl aspect-square">
                <img
                  src="/src/assets/images/developer_hero_portrait_1793719112545.jpg"
                  alt="Sidil Basnet - AI Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Resilient fallback container if image asset cannot be loaded
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add('bg-zinc-900', 'flex', 'items-center', 'justify-center');
                    }
                  }}
                />

                {/* Subdued overlay telemetry strip (grounded, real) */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-zinc-950/90 via-zinc-950/60 to-transparent text-white">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300">Sidil Basnet</span>
                    <span className="text-amber-400">Production Systems</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    PyTorch · TensorRT · vLLM · CUDA C++ · Ray
                  </div>
                </div>
              </div>

              {/* Floating Architectural Proof Capsule */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                      120 FPS Inference
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Vision Transformer on Jetson Orin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Row: Full-width row directly below the hero split */}
        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {profile.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
