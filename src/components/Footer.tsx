import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenContact }) => {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="text-base font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              {profile.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              AI Developer & Machine Learning Engineer · NLP · Computer Vision · MLOps
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
            <a
              href="#projects"
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#demos"
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Live Demos
            </a>
            <a
              href="#experience"
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Tech Stack
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Resume
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 font-mono gap-3">
          <div>
            © {new Date().getFullYear()} Sidil Basnet. All rights reserved.
          </div>
          <div>
            Designed with anti-slop typography & mathematical precision.
          </div>
        </div>
      </div>
    </footer>
  );
};
