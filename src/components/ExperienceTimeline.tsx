import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Cpu, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolioData';

type DomainFilter = 'All' | 'NLP' | 'CV' | 'MLOps' | 'Research';

export const ExperienceTimeline: React.FC = () => {
  const [filter, setFilter] = useState<DomainFilter>('All');
  const [expandedId, setExpandedId] = useState<string | null>(PORTFOLIO_DATA.experience[0].id);

  const filteredExperience = PORTFOLIO_DATA.experience.filter((item) => {
    if (filter === 'All') return true;
    return item.domain.includes(filter);
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-2">
              <span>Track Record</span>
              <span aria-hidden="true">·</span>
              <span>Engineering History</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display [text-wrap:balance]">
              Professional work experience.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              5+ years shipping deep learning systems to high-concurrency production and leading specialized AI infrastructure initiatives.
            </p>
          </div>

          {/* Domain Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-zinc-200/80 dark:bg-zinc-800 rounded-lg shrink-0 self-start md:self-auto">
            {(['All', 'NLP', 'CV', 'MLOps', 'Research'] as DomainFilter[]).map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  filter === d
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {d === 'All' ? 'All Roles' : d === 'NLP' ? 'NLP / LLM' : d === 'CV' ? 'Computer Vision' : d === 'MLOps' ? 'MLOps' : 'Research'}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {filteredExperience.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-4">
                    {/* Natural Numbering (§1.B) */}
                    <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-1">
                      0{index + 1}.
                    </span>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 mb-1">
                        <span>{item.company}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.domain.join(' / ')}</span>
                      </div>

                      <h3 className="text-xl font-bold text-zinc-950 dark:text-white font-display">
                        {item.role}
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 max-w-3xl">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right Meta Info & Toggle Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 text-left md:text-right">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{item.period}</div>
                      <div>{item.location}</div>
                    </div>

                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30">
                    {/* Key Engineering Deliverables */}
                    <div className="mt-4">
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                        Key Engineering Deliverables & Impact
                      </div>
                      <ul className="space-y-2.5">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architectural Highlight */}
                    <div className="mt-5 p-3.5 rounded-xl bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="font-semibold text-zinc-950 dark:text-white flex items-center gap-2 mb-1">
                        <Cpu className="w-3.5 h-3.5 text-amber-500" />
                        <span>System Architecture Highlight</span>
                      </div>
                      <p className="font-mono text-zinc-600 dark:text-zinc-300">
                        {item.architectureHighlights}
                      </p>
                    </div>

                    {/* Technologies (Clean unboxed inline text) */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Technologies:</span>
                      {item.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {tIdx < item.technologies.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
