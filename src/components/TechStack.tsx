import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code2, Terminal, Cpu, Database, Server } from 'lucide-react';

export const TechStack: React.FC = () => {
  const { skillCategories } = PORTFOLIO_DATA;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const icons = [Cpu, MessageSquareIcon, EyeIcon, Server];

  function MessageSquareIcon(props: any) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    );
  }

  function EyeIcon(props: any) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );
  }

  return (
    <section id="skills" className="py-20 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-2">
              <span>Technical Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Systems Taxonomy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display [text-wrap:balance]">
              Core stack & architectural proficiencies.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              From low-level CUDA kernels and TensorRT optimization to distributed multi-node LLM serving fleets.
            </p>
          </div>
        </div>

        {/* 4 Category Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = icons[idx] || Cpu;

            return (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-display">
                    {category.title}
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills List with Tabular Levels */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                          <span className="text-zinc-900 dark:text-zinc-100">{skill.name}</span>
                          <span className="font-mono text-zinc-400 dark:text-zinc-500 tabular-nums">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Level Bar */}
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1 overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {/* Tags as unboxed text with separators */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-1.5">
                          {skill.tags.map((tag, tIdx) => (
                            <React.Fragment key={tag}>
                              <span>{tag}</span>
                              {tIdx < skill.tags.length - 1 && <span aria-hidden="true">·</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono text-zinc-400">
                  <span>Verified in Production</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
