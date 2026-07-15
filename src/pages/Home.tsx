import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';

const Home: React.FC = () => {
  const { activePersona } = usePersona();

  return (
    <PageWrapper>
      <Section
        id="hero"
        className="flex flex-col items-center justify-center text-center space-y-6 min-h-[60vh]"
      >
        <div className="space-y-4">
          <span className="font-mono text-2xs tracking-widest text-text-muted uppercase">
            Active Persona: {activePersona}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Dynamic Developer Portfolio
          </h1>
          <p className="text-md md:text-lg text-text-secondary max-w-2xl mx-auto">
            This workspace layout adapts its headlines, highlights, and content lists based on your
            selected target position.
          </p>
        </div>
      </Section>

      <Section id="overview-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-border-primary bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <h2 className="text-xl font-semibold mb-2">Systems Architecture</h2>
            <p className="text-text-muted text-sm">
              Explore dynamic diagram components and detailed backend schemas.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border-primary bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <h2 className="text-xl font-semibold mb-2">Interactive Metrics</h2>
            <p className="text-text-muted text-sm">
              Live telemetry showing git commits, active package downloads, and plugins
              installations.
            </p>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Home;
