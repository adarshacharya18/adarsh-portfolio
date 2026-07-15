import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../atoms/Section';
import { FiClock, FiArrowRight, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TagBadgeList from '../molecules/TagBadgeList';
import type { ProjectItem } from '../../types/project';
import type { PersonaType } from '../../types/persona';

interface ProjectsPresenterProps {
  projects: ProjectItem[];
  activePersona: PersonaType;
}

const ProjectsPresenter: React.FC<ProjectsPresenterProps> = ({ projects, activePersona }) => {
  const shouldReduceMotion = useReducedMotion();
  const yVal = shouldReduceMotion ? 0 : 8;

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
    hidden: { opacity: 0, y: yVal },
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              variants={itemVariants}
              className="border border-border-primary bg-bg-secondary p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-soft hover:border-border-focus transition-colors text-left"
            >
              <div className="space-y-3">
                <header className="space-y-1.5">
                  <h2 className="text-base font-bold tracking-tight text-text-primary">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-3xs text-text-muted font-mono">
                    <div className="flex items-center space-x-1">
                      <FiUser className="w-3.5 h-3.5" />
                      <span>{project.role}</span>
                    </div>
                    <span>&bull;</span>
                    <div className="flex items-center space-x-1">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                </header>

                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border-primary">
                <TagBadgeList tags={project.techStack} />

                <div className="flex justify-end pt-1">
                  <Link
                    to={`/case-studies/${project.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs text-text-muted font-semibold hover:text-text-primary transition cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default ProjectsPresenter;
