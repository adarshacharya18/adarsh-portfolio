import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import projectsData from '../data/projects.json';
import ProjectsPresenter from '../components/organisms/ProjectsPresenter';
import type { ProjectItem } from '../types/project';

const Projects: React.FC = () => {
  const { activePersona } = usePersona();

  // Filter projects by active recruiter track
  const filteredProjects = (projectsData as unknown as ProjectItem[]).filter((p) =>
    p.personas.includes(activePersona),
  );

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
