import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import { usePersona } from '../hooks/usePersona';
import { usePersonaContent } from '../hooks/usePersonaContent';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import seoData from '../data/seo.json';
import projectsData from '../data/projects.json';
import HeroPresenter from '../components/organisms/HeroPresenter';
import SkillsPresenter from '../components/organisms/SkillsPresenter';
import ExperiencePresenter from '../components/organisms/ExperiencePresenter';
import TestimonialsPresenter from '../components/organisms/TestimonialsPresenter';
import LeetCodeHighlight from '../components/organisms/LeetCodeHighlight';
import FloatingStatusWidget from '../components/organisms/FloatingStatusWidget';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import JsonLd from '../components/atoms/JsonLd';
import type { PersonaType } from '../types/persona';
import type { PersonaContent, Profile } from '../types/profile';
import type { SkillGroup } from '../types/skill';
import type { SeoConfig } from '../types/seo';
import type { ProjectItem } from '../types/project';

import { comparePeriods } from '../utils/sorting';

const Home: React.FC = () => {
  const { activePersona } = usePersona();
  const profile = profileData as unknown as Profile;
  const seo = seoData as unknown as SeoConfig;

  const currentPersonaContent = (profile.personaContent as Record<PersonaType, PersonaContent>)[
    activePersona
  ];
  const { content: currentExperience } = usePersonaContent('experience');
  const { content: currentTestimonials } = usePersonaContent('testimonials');

  const currentSkills = (skillsData as unknown as Record<PersonaType, SkillGroup[]>)[activePersona];

  const sortedExperience = currentExperience.sort((a, b) => comparePeriods(a.period, b.period));

  const inProgressProjects = (projectsData as unknown as ProjectItem[]).filter(
    (p) => p.status === 'In Progress',
  );

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adarsh.dev';

  useDocumentMetadata({
    title: `${profile.name} | ${currentPersonaContent.title} Portfolio`,
    description: currentPersonaContent.description || seo.default.description,
    keywords: seo.default.keywords,
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
      <FloatingStatusWidget inProgressProjects={inProgressProjects} />
      <SkillsPresenter skills={currentSkills} activePersona={activePersona} />
      <ExperiencePresenter
        experience={sortedExperience}
        activePersona={activePersona}
        compact={true}
      />
      <LeetCodeHighlight />
      <TestimonialsPresenter
        testimonials={currentTestimonials}
        activePersona={activePersona}
        key={activePersona}
      />
    </PageWrapper>
  );
};

export default Home;
