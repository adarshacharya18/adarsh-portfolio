import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const Projects: React.FC = () => {
  return (
    <PageWrapper>
      <Section id="projects-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Projects Showcase</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          A modular grid of featured applications and code repositories.
        </p>
      </Section>

      <Section id="projects-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border-primary rounded-lg p-6 bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <div className="h-40 bg-bg-tertiary rounded mb-4" />
            <div className="space-y-2">
              <div className="h-6 w-1/3 bg-border-primary rounded" />
              <div className="h-4 w-3/4 bg-border-primary rounded" />
            </div>
          </div>
          <div className="border border-border-primary rounded-lg p-6 bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <div className="h-40 bg-bg-tertiary rounded mb-4" />
            <div className="space-y-2">
              <div className="h-6 w-1/3 bg-border-primary rounded" />
              <div className="h-4 w-3/4 bg-border-primary rounded" />
            </div>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Projects;
