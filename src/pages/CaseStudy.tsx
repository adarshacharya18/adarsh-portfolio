import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import projectsData from '../data/projects.json';
import { FiGithub, FiExternalLink, FiClock, FiArrowLeft } from 'react-icons/fi';
import type { ProjectItem } from '../types/project';

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projects = projectsData as unknown as ProjectItem[];

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageWrapper className="justify-center items-center">
        <Section className="text-center space-y-4">
          <h1 className="text-xl font-bold">Case Study Not Found</h1>
          <Link to="/projects" className="text-accent-primary hover:underline text-xs">
            Back to Projects
          </Link>
        </Section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <Link
          to="/projects"
          className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>All Projects</span>
        </Link>

        <article className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft">
          <header className="space-y-4 border-b border-border-primary pb-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
                {project.title}
              </h1>
              <div className="flex items-center space-x-3 text-text-secondary">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition"
                  aria-label="GitHub Repository"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition"
                  aria-label="Live Demo"
                >
                  <FiExternalLink className="w-5 h-5" />
                </a>
              </div>
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
            <div className="flex flex-wrap gap-1.5">
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
        </article>
      </div>
    </PageWrapper>
  );
};

export default CaseStudy;
