import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowLeft } from 'react-icons/fi';
import ProjectLinksGroup from '../molecules/ProjectLinksGroup';
import TagBadgeList from '../molecules/TagBadgeList';
import type { ProjectItem } from '../../types/project';

interface CaseStudyPresenterProps {
  project: ProjectItem;
}

const CaseStudyPresenter: React.FC<CaseStudyPresenterProps> = ({ project }) => {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <Link
        to="/projects"
        className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
      >
        <FiArrowLeft className="w-3.5 h-3.5" />
        <span>All Projects</span>
      </Link>

      <article className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft text-left">
        <header className="space-y-4 border-b border-border-primary pb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
              {project.title}
            </h1>
            <ProjectLinksGroup githubUrl={project.links.github} demoUrl={project.links.demo} />
          </div>

          <div className="flex items-center space-x-2 text-2xs text-text-muted">
            <FiClock className="w-3.5 h-3.5" />
            <span>Project Duration: {project.timeline}</span>
          </div>
        </header>

        <div className="space-y-6 text-xs md:text-sm text-text-secondary leading-relaxed">
          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              The Problem
            </h2>
            <p className="text-text-muted">{project.problem}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              The Solution
            </h2>
            <p className="text-text-muted">{project.solution}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Technical Challenges
            </h2>
            <p className="text-text-muted">{project.challenges}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Lessons Learned
            </h2>
            <p className="text-text-muted">{project.lessonsLearned}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Future Improvements
            </h2>
            <p className="text-text-muted">{project.futureImprovements}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-border-primary">
          <TagBadgeList tags={project.techStack} />
        </div>
      </article>
    </div>
  );
};

export default CaseStudyPresenter;
