import React from 'react';
import { BookOpen, ExternalLink, Quote } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ResearchPublications: React.FC = () => {
  const { publications } = PORTFOLIO_DATA;

  return (
    <section id="publications" className="py-20 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-2">
              <span>Scientific Rigor</span>
              <span aria-hidden="true">·</span>
              <span>Publications & Preprints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display [text-wrap:balance]">
              Peer-reviewed research & technical papers.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Focusing on low-latency token verification, edge Vision Transformer distillation, and equivariant geometric graph neural networks.
            </p>
          </div>
        </div>

        {/* 3-Column Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((pub, idx) => (
            <div
              key={pub.id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
            >
              <div>
                {/* Unboxed Metadata Line with separators (§1.A) */}
                <div className="flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400 mb-3">
                  <span>{pub.year}</span>
                  <span className="text-zinc-400 dark:text-zinc-500 tabular-nums">
                    {pub.citations} Citations
                  </span>
                </div>

                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                  {pub.venue}
                </div>

                <h3 className="text-base font-bold text-zinc-950 dark:text-white leading-snug font-display">
                  {pub.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-3 leading-relaxed">
                  {pub.tldr}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 truncate max-w-[65%]">
                  {pub.authors.join(', ')}
                </span>

                <a
                  href={pub.arxivId ? `https://arxiv.org/abs/${pub.arxivId}` : pub.doi ? `https://doi.org/${pub.doi}` : '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
