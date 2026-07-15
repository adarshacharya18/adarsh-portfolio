import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import { usePersona } from '../hooks/usePersona';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import HeroPresenter from '../components/organisms/HeroPresenter';
import SkillsPresenter from '../components/organisms/SkillsPresenter';
import ExperiencePresenter from '../components/organisms/ExperiencePresenter';
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

  return (
    <PageWrapper>
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
