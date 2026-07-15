import React from 'react';
import Section from '../atoms/Section';
import { FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectLinksGroup from '../molecules/ProjectLinksGroup';
import TagBadgeList from '../molecules/TagBadgeList';
import type { ProjectItem } from '../../types/project';
import type { PersonaType } from '../../types/persona';

interface ProjectsPresenterProps {
  projects: ProjectItem[];
  activePersona: PersonaType;
}

const ProjectsPresenter: React.FC<ProjectsPresenterProps> = ({ projects, activePersona }) => {
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
    <Section id="projects-grid">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="space-y-12 max-w-4xl mx-auto"
        >
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              variants={itemVariants}
              className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft hover:border-border-focus transition-colors text-left"
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
                <ProjectLinksGroup githubUrl={project.links.github} demoUrl={project.links.demo} />
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

                <TagBadgeList tags={project.techStack} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default ProjectsPresenter;
