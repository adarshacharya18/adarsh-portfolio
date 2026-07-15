import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import projectsData from '../data/projects.json';
import CaseStudyPresenter from '../components/organisms/CaseStudyPresenter';
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
      <CaseStudyPresenter project={project} />
    </PageWrapper>
  );
};

export default CaseStudy;
