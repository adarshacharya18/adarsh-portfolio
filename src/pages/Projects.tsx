import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import projectsData from '../data/projects.json';
import seoData from '../data/seo.json';
import ProjectsPresenter from '../components/organisms/ProjectsPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { ProjectItem } from '../types/project';
import type { SeoConfig } from '../types/seo';

const Projects: React.FC = () => {
  const { activePersona } = usePersona();
  const seo = seoData as unknown as SeoConfig;

  // Filter projects by active recruiter track
  const filteredProjects = (projectsData as unknown as ProjectItem[]).filter((p) =>
    p.personas.includes(activePersona),
  );

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
      </Section>

      <ProjectsPresenter projects={filteredProjects} activePersona={activePersona} />
    </PageWrapper>
  );
};

export default Projects;
