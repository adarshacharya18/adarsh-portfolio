import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <Section id="contact-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Get In Touch</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Send a message to initiate collaboration or inquire about hiring availability.
        </p>
      </Section>

      <Section id="contact-form" className="max-w-xl mx-auto w-full">
        <div className="border border-border-primary rounded-lg p-6 bg-bg-secondary space-y-4 shadow-soft">
          <div className="space-y-2">
            <div className="h-4 w-12 bg-bg-tertiary rounded" />
            <div className="h-10 bg-bg-primary border border-border-primary rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-12 bg-bg-tertiary rounded" />
            <div className="h-10 bg-bg-primary border border-border-primary rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-bg-tertiary rounded" />
            <div className="h-32 bg-bg-primary border border-border-primary rounded" />
          </div>
          <div className="h-10 w-24 bg-text-primary rounded cursor-pointer" />
        </div>
      </Section>
    </PageWrapper>
  );
};

export default Contact;
