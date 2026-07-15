import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowLeft, FiUser, FiLayers } from 'react-icons/fi';
import ProjectLinksGroup from '../molecules/ProjectLinksGroup';
import TagBadgeList from '../molecules/TagBadgeList';
import type { ProjectItem } from '../../types/project';

interface CaseStudyPresenterProps {
  project: ProjectItem;
}

const CaseStudyPresenter: React.FC<CaseStudyPresenterProps> = ({ project }) => {
  return (
    <div className="max-w-3xl mx-auto w-full space-y-6 text-left">
      <Link
        to="/projects"
        className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
      >
        <FiArrowLeft className="w-3.5 h-3.5" />
        <span>All Projects</span>
      </Link>

      <article className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft">
        {/* Header Block */}
        <header className="space-y-4 border-b border-border-primary pb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
              {project.title}
            </h1>
            <ProjectLinksGroup githubUrl={project.links.github} demoUrl={project.links.demo} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-2xs text-text-muted font-mono">
            <div className="flex items-center space-x-1.5">
              <FiUser className="w-3.5 h-3.5" />
              <span>Role: {project.role}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center space-x-1.5">
              <FiClock className="w-3.5 h-3.5" />
              <span>{project.timeline}</span>
            </div>
          </div>
        </header>

        {/* Video Player Segment */}
        {project.video && (
          <div className="aspect-video w-full rounded-lg bg-bg-primary border border-border-primary overflow-hidden flex items-center justify-center relative group">
            {/* Visual placeholder details overlay since actual mp4 assets are mock items */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/40 p-4 text-center z-10 pointer-events-none">
              <span className="font-mono text-3xs uppercase tracking-widest text-white/60 mb-2">
                Video Demonstration
              </span>
              <span className="text-xs font-semibold text-white">{project.title} Demo</span>
              <span className="text-3xs text-white/40 mt-1 font-mono">{project.video}</span>
            </div>
            {/* Standard HTML5 Video shell */}
            <video
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition"
              src={project.video}
              controls
              muted
              playsInline
            />
          </div>
        )}

        {/* Detail Sections */}
        <div className="space-y-6 text-xs md:text-sm text-text-secondary leading-relaxed">
          {/* Architecture block */}
          <div className="space-y-2 p-4 rounded-lg bg-bg-primary border border-border-primary">
            <div className="flex items-center space-x-2 text-text-primary mb-1">
              <FiLayers className="w-4 h-4 text-text-muted" />
              <h2 className="font-bold uppercase tracking-wide text-2xs">System Architecture</h2>
            </div>
            <p className="text-text-muted">{project.architecture}</p>
          </div>

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

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-border-primary">
            <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Interface Screenshots
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <div
                  key={src}
                  className="aspect-video rounded-lg bg-bg-primary border border-border-primary overflow-hidden flex items-center justify-center relative group cursor-zoom-in"
                >
                  <div className="absolute inset-0 bg-zinc-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10">
                    <span className="text-3xs text-white font-mono">View Screenshot {i + 1}</span>
                  </div>
                  <div className="text-center p-3">
                    <span className="text-3xs text-text-muted font-mono">
                      {src.split('/').pop()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-border-primary">
          <TagBadgeList tags={project.techStack} />
        </div>
      </article>
    </div>
  );
};

export default CaseStudyPresenter;
