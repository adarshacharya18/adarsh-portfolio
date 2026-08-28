import React from 'react';
import { Link } from 'react-router-dom';
import AntigravityCard from '../molecules/AntigravityCard';
import { motion } from 'framer-motion';
import { FiActivity, FiZap, FiArrowRight } from 'react-icons/fi';
import type { ProjectItem } from '../../types/project';

interface FloatingStatusWidgetProps {
  inProgressProjects?: ProjectItem[];
  inProgressProject?: ProjectItem | null;
}

const FloatingStatusWidget: React.FC<FloatingStatusWidgetProps> = ({
  inProgressProjects,
  inProgressProject,
}) => {
  const projects = inProgressProjects || (inProgressProject ? [inProgressProject] : []);

  if (projects.length === 0) return null;

  return (
    <div
      className={`w-full ${projects.length > 1 ? 'max-w-4xl' : 'max-w-md'} mx-auto md:mx-0 my-8 perspective-[1000px]`}
    >
      <div className={`grid grid-cols-1 ${projects.length > 1 ? 'md:grid-cols-2 gap-4' : 'gap-4'}`}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/case-studies/${project.slug}`}
            className="block group h-full"
          >
            <AntigravityCard className="p-6 border-accent-primary/20 bg-bg-secondary/20 hover:border-border-focus/70 transition-colors h-full flex flex-col justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <FiZap className="w-5 h-5 text-accent-primary" />
                    {/* Ping animation to simulate live activity */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-accent-primary"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                      <FiActivity className="w-4 h-4 text-text-secondary" />
                      Current Focus
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                      In Progress
                    </span>
                  </div>
                  <p className="text-sm text-text-primary font-medium leading-relaxed">
                    {project.title}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-bg-tertiary text-text-muted border border-border-primary shadow-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <div className="inline-flex items-center space-x-1.5 text-xs text-text-muted font-semibold group-hover:text-text-primary transition">
                      <span>View Details</span>
                      <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </AntigravityCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FloatingStatusWidget;
