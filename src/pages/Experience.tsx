import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersonaContent } from '../hooks/usePersonaContent';
import seoData from '../data/seo.json';
import ExperiencePresenter from '../components/organisms/ExperiencePresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { SeoConfig } from '../types/seo';

import { comparePeriods } from '../utils/sorting';

const Experience: React.FC = () => {
  const { content: curatedExperience, activePersona } = usePersonaContent('experience');
  const seo = seoData as unknown as SeoConfig;

  const filteredExperience = curatedExperience.sort((a, b) => comparePeriods(a.period, b.period));

  useDocumentMetadata({
    title: seo.experience.title,
    description: seo.experience.description,
  });

  return (
    <PageWrapper>
      <Section id="experience-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Work Experience</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Detailed professional history relevant to the selected target track.
        </p>
      </Section>

      <ExperiencePresenter
        experience={filteredExperience}
        activePersona={activePersona}
        compact={false}
      />
    </PageWrapper>
  );
};

export default Experience;
