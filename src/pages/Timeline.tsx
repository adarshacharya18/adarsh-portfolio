import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersonaContent } from '../hooks/usePersonaContent';
import seoData from '../data/seo.json';
import TimelinePresenter from '../components/organisms/TimelinePresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { SeoConfig } from '../types/seo';
import type { PersonaType } from '../types/persona';

import { compareQuarters } from '../utils/sorting';

const Timeline: React.FC = () => {
  const { content: timeline, activePersona } = usePersonaContent('timeline');
  const seo = seoData as unknown as SeoConfig;

  const filteredTimeline = timeline.sort((a, b) => compareQuarters(a.quarter, b.quarter));

  useDocumentMetadata({
    title: seo.timeline.title,
    description: seo.timeline.description,
  });

  return (
    <PageWrapper>
      <Section id="timeline-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Interactive Timeline</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          A granular timeline of projects, milestones, and open-source releases.
        </p>
      </Section>

      <TimelinePresenter timeline={filteredTimeline} activePersona={activePersona as PersonaType} />
    </PageWrapper>
  );
};

export default Timeline;
