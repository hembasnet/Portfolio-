import React from 'react';
import { Sun, Moon, FileText, Send, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenResume,
  onOpenContact,
  onOpenAIAssistant,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/85 dark:bg-zinc-950/85 bg-white/85 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="font-display">{PORTFOLIO_DATA.profile.name}</span>
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 hidden sm:inline">
            / AI Systems
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="#projects"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Projects
          </a>
          <a
            href="#demos"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Interactive Demos
          </a>
          <a
            href="#experience"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Work Experience
          </a>
          <a
            href="#skills"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Tech Stack
          </a>
          <a
            href="#publications"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Publications
          </a>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle and resume action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle visual theme"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          <button
            onClick={onOpenAIAssistant}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Explorer</span>
          </button>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </header>
  );
};
