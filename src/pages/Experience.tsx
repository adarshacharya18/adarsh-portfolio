import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import experienceData from '../data/experience.json';
import ExperiencePresenter from '../components/organisms/ExperiencePresenter';
import type { ExperienceItem } from '../types/experience';

const Experience: React.FC = () => {
  const { activePersona } = usePersona();

  const filteredExperience = (experienceData as unknown as ExperienceItem[]).filter((exp) =>
    exp.personas.includes(activePersona),
  );

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
