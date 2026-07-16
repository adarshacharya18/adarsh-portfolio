import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import timelineData from '../data/timeline.json';
import seoData from '../data/seo.json';
import TimelinePresenter from '../components/organisms/TimelinePresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { TimelineItem } from '../types/timeline';
import type { SeoConfig } from '../types/seo';

import { compareQuarters } from '../utils/sorting';

const Timeline: React.FC = () => {
  const { activePersona } = usePersona();
  const seo = seoData as unknown as SeoConfig;

  const filteredTimeline = (timelineData as unknown as TimelineItem[])
    .filter((t) => activePersona === 'overall' || t.personas.includes(activePersona))
    .sort((a, b) => compareQuarters(a.quarter, b.quarter));

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

      <TimelinePresenter timeline={filteredTimeline} activePersona={activePersona} />
    </PageWrapper>
  );
};

export default Timeline;
