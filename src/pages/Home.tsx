import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import { usePersona } from '../hooks/usePersona';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import HeroPresenter from '../components/organisms/HeroPresenter';
import SkillsPresenter from '../components/organisms/SkillsPresenter';
import ExperiencePresenter from '../components/organisms/ExperiencePresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import JsonLd from '../components/atoms/JsonLd';
import type { PersonaType } from '../types/persona';
import type { Profile, PersonaContent } from '../types/profile';
import type { SkillGroup } from '../types/skill';
import type { ExperienceItem } from '../types/experience';

const Home: React.FC = () => {
  const { activePersona } = usePersona();
  const profile = profileData as unknown as Profile;

  const currentPersonaContent = (profile.personaContent as Record<PersonaType, PersonaContent>)[
    activePersona
  ];
  const currentSkills = (skillsData as unknown as Record<PersonaType, SkillGroup[]>)[activePersona];
  const currentExperience = (experienceData as unknown as ExperienceItem[]).filter((exp) =>
    exp.personas.includes(activePersona),
  );

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adarsh.dev';

  useDocumentMetadata({
    title: `${profile.name} | ${currentPersonaContent.title} Portfolio`,
    description: currentPersonaContent.description,
    keywords: 'Software Engineer, Backend Developer, Full Stack Developer, WordPress Engineer',
    canonicalUrl: originUrl,
  });

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    email: profile.email,
    jobTitle: currentPersonaContent.title,
    url: originUrl,
    sameAs: [profile.socials.github, profile.socials.linkedin],
  };

  return (
    <PageWrapper>
      <JsonLd data={personSchema as Record<string, unknown>} />
      <HeroPresenter
        profile={profile}
        currentPersonaContent={currentPersonaContent}
        activePersona={activePersona}
      />
      <SkillsPresenter skills={currentSkills} activePersona={activePersona} />
      <ExperiencePresenter
        experience={currentExperience}
        activePersona={activePersona}
        compact={true}
      />
    </PageWrapper>
  );
};

export default Home;
