import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const Certificates: React.FC = () => {
  return (
    <PageWrapper>
      <Section id="certificates-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Credentials & Certifications
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Verified academic and professional credentials.
        </p>
      </Section>

      <Section id="certificates-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border-primary rounded-lg p-6 bg-bg-secondary hover:border-border-focus transition shadow-soft">
            <h2 className="text-lg font-semibold mb-2">AWS Certified Solutions Architect</h2>
            <div className="h-4 w-1/3 bg-bg-tertiary rounded mb-2" />
            <div className="h-4 w-2/3 bg-bg-tertiary rounded" />
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Certificates;
