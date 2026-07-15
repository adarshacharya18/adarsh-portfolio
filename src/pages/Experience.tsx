import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const Experience: React.FC = () => {
  return (
    <PageWrapper>
      <Section id="experience-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Work Experience</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Professional tenure timeline detailing software roles, team leads, and CM designs.
        </p>
      </Section>

      <Section id="experience-list" className="max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-8 border-b border-border-primary last:border-0">
            <div className="md:w-1/4">
              <span className="font-mono text-xs text-text-muted">Present - 2024</span>
            </div>
            <div className="md:w-3/4 space-y-2">
              <h2 className="text-xl font-semibold">Lead Developer</h2>
              <div className="h-4 w-1/4 bg-border-primary rounded animate-pulse" />
              <div className="h-16 bg-bg-secondary border border-border-primary rounded p-4" />
            </div>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Experience;
