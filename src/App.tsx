import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDemos } from './components/InteractiveDemos';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TechStack } from './components/TechStack';
import { ResearchPublications } from './components/ResearchPublications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);

  // Sync dark class on root document element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenDemo = () => {
    const elem = document.getElementById('demos');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectById = (id: string) => {
    const found = PORTFOLIO_DATA.projects.find((p) => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={handleOpenContact}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
          onOpenDemos={handleOpenDemo}
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        />

        {/* Live Interactive Browser AI Simulator Lab */}
        <InteractiveDemos />

        {/* Deep Learning Projects Showcase (NLP, Computer Vision, MLOps) */}
        <ProjectsShowcase onSelectProject={(project) => setSelectedProject(project)} />

        {/* Detailed Work Experience */}
        <ExperienceTimeline />

        {/* Core Systems Stack & Taxonomy */}
        <TechStack />

        {/* Peer-Reviewed Publications & Preprints */}
        <ResearchPublications />

        {/* Direct Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Modals & Drawers */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenDemo={handleOpenDemo}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AIAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onSelectProjectById={handleSelectProjectById}
      />
    </div>
  );
}
