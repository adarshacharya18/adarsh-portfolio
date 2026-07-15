import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import projectsData from '../data/projects.json';
import CaseStudyPresenter from '../components/organisms/CaseStudyPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import JsonLd from '../components/atoms/JsonLd';
import type { ProjectItem } from '../types/project';

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projects = projectsData as unknown as ProjectItem[];

  const project = projects.find((p) => p.slug === slug);

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adarsh.dev';

  useDocumentMetadata({
    title: project ? `${project.title} Case Study` : 'Case Study Not Found',
    description: project ? project.problem : 'Detailed software engineering project case study.',
    canonicalUrl: project ? `${originUrl}/projects/${project.slug}` : undefined,
  });

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

  const creativeWorkSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.problem,
    genre: 'Software Development Case Study',
    temporalCoverage: project.timeline,
    programmingLanguage: project.techStack,
  };

  if (project.links.github) {
    creativeWorkSchema.codeRepository = project.links.github;
  }
  if (project.links.demo) {
    creativeWorkSchema.url = project.links.demo;
  }

  return (
    <PageWrapper>
      <JsonLd data={creativeWorkSchema as Record<string, unknown>} />
      <CaseStudyPresenter project={project} />
    </PageWrapper>
  );
};

export default CaseStudy;
