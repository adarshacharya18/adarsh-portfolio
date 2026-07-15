import React from 'react';
import { usePersona } from '../hooks/usePersona';

const Home: React.FC = () => {
  const { activePersona } = usePersona();

  return (
    <div className="space-y-12">
      <section className="py-20 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Home Page Portfolio Sandbox
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Active Recruiter Persona view:{' '}
          <span className="font-mono text-accent-primary uppercase font-bold">{activePersona}</span>
        </p>
      </section>

      {/* Structural layout blocks representing sections to be populated later */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl border border-border-primary bg-bg-secondary">
          <h2 className="text-xl font-semibold mb-2">Dynamic Bio</h2>
          <p className="text-text-muted">
            Bio text adjusts dynamically depending on the selected persona.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border-primary bg-bg-secondary">
          <h2 className="text-xl font-semibold mb-2">Skills Grid</h2>
          <p className="text-text-muted">
            Interactive skill list categorized and highlighted by role.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border-primary bg-bg-secondary">
          <h2 className="text-xl font-semibold mb-2">Project Cards</h2>
          <p className="text-text-muted">
            Featured projects sorted/filtered to target the hiring team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
