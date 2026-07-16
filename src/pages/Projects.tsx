import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import projectsData from '../data/projects.json';
import seoData from '../data/seo.json';
import ProjectsPresenter from '../components/organisms/ProjectsPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { ProjectItem } from '../types/project';
import type { SeoConfig } from '../types/seo';

import { comparePeriods } from '../utils/sorting';

const Projects: React.FC = () => {
  const { activePersona } = usePersona();
  const [searchParams, setSearchParams] = useSearchParams();
  const seo = seoData as unknown as SeoConfig;

  const filterRole = searchParams.get('role');

  // Filter and sort projects by active recruiter track (latest end date first) and query parameters
  const filteredProjects = (projectsData as unknown as ProjectItem[])
    .filter((p) => {
      const matchesPersona = activePersona === 'overall' || p.personas.includes(activePersona);
      const matchesRole = !filterRole || p.role.toLowerCase() === filterRole.toLowerCase();
      return matchesPersona && matchesRole;
    })
    .sort((a, b) => comparePeriods(a.timeline, b.timeline));

  useDocumentMetadata({
    title: seo.projects.title,
    description: seo.projects.description,
  });

  return (
    <PageWrapper>
      <Section id="projects-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Projects Showcase</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Case studies representing technical engineering solutions matching the active profile.
        </p>
        {filterRole && (
          <div className="flex items-center justify-center space-x-2 pt-2">
            <span className="text-3xs font-mono uppercase bg-bg-secondary px-2.5 py-1 rounded-full border border-border-primary text-text-secondary">
              Role: {filterRole}
            </span>
            <button
              onClick={() => setSearchParams({})}
              className="text-3xs font-mono uppercase text-accent-primary hover:underline cursor-pointer font-semibold"
            >
              Clear Filter
            </button>
          </div>
        )}
      </Section>

      <ProjectsPresenter projects={filteredProjects} activePersona={activePersona} />
    </PageWrapper>
  );
};

export default Projects;
