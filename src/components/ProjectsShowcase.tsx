import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Code2, Layers } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

type FilterCategory = 'All' | 'NLP' | 'CV' | 'ML/MLOps';

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<FilterCategory>('All');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === 'All') return true;
    return p.categoryShort === filter;
  });

  return (
    <section id="projects" className="py-20 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-2">
              <span>Selected Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Production Systems & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display [text-wrap:balance]">
              Deep learning across language, vision & scale.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Engineered end-to-end architectures operating in high-concurrency enterprise and edge environments.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg shrink-0 self-start md:self-auto">
            {(['All', 'NLP', 'CV', 'ML/MLOps'] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat === 'NLP' ? 'Language & LLMs' : cat === 'CV' ? 'Computer Vision' : 'Machine Learning & MLOps'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const isWide = project.featured && idx === 0 && filter === 'All';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group cursor-pointer rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Media Viewport Container */}
                  <div className={`relative overflow-hidden bg-zinc-950 ${isWide ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Scrim for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />

                    {/* Overlay Badging in Clean Typography (No pill badges!) */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 font-mono">
                      <span>{project.clientOrOrg}</span>
                      <span>{project.timeframe}</span>
                    </div>

                    {/* Bottom metric highlight banner inside media frame */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                          <span className="text-white font-bold font-mono text-sm sm:text-base tabular-nums">
                            {metric.value}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Unboxed Metadata Line (Zero-Pill Discipline §1.A) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 mb-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Production Deployed</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors font-display">
                      {project.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Tech Stack (Clean unboxed inline text) & Action */}
                <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono truncate max-w-[75%]">
                    {project.techStack.slice(0, 4).join(' · ')}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
