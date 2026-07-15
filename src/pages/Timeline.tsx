import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const Timeline: React.FC = () => {
  return (
    <PageWrapper>
      <Section id="timeline-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Interactive Timeline</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          A granular view of projects, milestones, commits, and open-source contributions.
        </p>
      </Section>

      <Section id="timeline-nodes" className="max-w-3xl mx-auto">
        <div className="relative border-l border-border-primary pl-6 ml-4 space-y-12">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-border-focus" />
            <span className="font-mono text-2xs text-text-muted">2026 Q3</span>
            <h2 className="text-lg font-semibold my-1">Initialized Portfolio v2</h2>
            <p className="text-text-secondary text-sm">Description of major milestone event.</p>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Timeline;
