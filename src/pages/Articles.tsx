import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const Articles: React.FC = () => {
  return (
    <PageWrapper>
      <Section id="articles-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Articles & Logs</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Insights, logs, tutorials, and documentations sourced from the blog feed.
        </p>
      </Section>

      <Section id="articles-grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border-primary rounded-lg p-6 bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <span className="font-mono text-2xs text-text-muted">July 15, 2026</span>
            <h2 className="text-lg font-semibold my-2">Headless CMS Setup</h2>
            <div className="h-10 bg-bg-tertiary rounded" />
          </div>
          <div className="border border-border-primary rounded-lg p-6 bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <span className="font-mono text-2xs text-text-muted">June 10, 2026</span>
            <h2 className="text-lg font-semibold my-2">API Design Rules</h2>
            <div className="h-10 bg-bg-tertiary rounded" />
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Articles;
