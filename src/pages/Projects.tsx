import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import projectsData from '../data/projects.json';
import { FiGithub, FiExternalLink, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../types/project';

const Projects: React.FC = () => {
  const { activePersona } = usePersona();

  // Filter projects by active recruiter track
  const filteredProjects = (projectsData as unknown as ProjectItem[]).filter((p) =>
    p.personas.includes(activePersona),
  );

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  };

  return (
    <PageWrapper>
      <Section id="projects-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Projects Showcase</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Case studies representing technical engineering solutions matching the active profile.
        </p>
      </Section>

      <Section id="projects-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="space-y-12 max-w-4xl mx-auto"
          >
            {filteredProjects.map((project) => (
              <motion.article
                key={project.slug}
                variants={itemVariants}
                className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft hover:border-border-focus transition-colors"
              >
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-primary pb-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-text-primary">
                      {project.title}
                    </h2>
                    <div className="flex items-center space-x-2 text-2xs text-text-muted">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-text-secondary">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition"
                      aria-label="View Code"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition"
                      aria-label="View Live Demo"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-text-secondary">
                  <div className="space-y-1">
                    <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
                      The Problem
                    </h3>
                    <p className="leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
                      The Solution
                    </h3>
                    <p className="leading-relaxed">{project.solution}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
                      Technical Challenges
                    </h3>
                    <p className="leading-relaxed">{project.challenges}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
                      Lessons Learned
                    </h3>
                    <p className="leading-relaxed">{project.lessonsLearned}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border-primary">
                  <div className="space-y-2">
                    <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
                      Future Improvements
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {project.futureImprovements}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-3xs px-2 py-0.5 rounded bg-bg-primary border border-border-primary text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
    </PageWrapper>
  );
};

export default Projects;
