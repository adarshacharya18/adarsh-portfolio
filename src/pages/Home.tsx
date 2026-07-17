import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import { usePersona } from '../hooks/usePersona';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import testimonialsData from '../data/testimonials.json';
import seoData from '../data/seo.json';
import HeroPresenter from '../components/organisms/HeroPresenter';
import SkillsPresenter from '../components/organisms/SkillsPresenter';
import ExperiencePresenter from '../components/organisms/ExperiencePresenter';
import TestimonialsPresenter from '../components/organisms/TestimonialsPresenter';
import LeetCodeHighlight from '../components/organisms/LeetCodeHighlight';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import JsonLd from '../components/atoms/JsonLd';
import type { PersonaType } from '../types/persona';
import type { Profile, PersonaContent } from '../types/profile';
import type { SkillGroup } from '../types/skill';
import type { ExperienceItem } from '../types/experience';
import type { TestimonialItem } from '../types/testimonials';
import type { SeoConfig } from '../types/seo';

import { comparePeriods } from '../utils/sorting';

const Home: React.FC = () => {
  const { activePersona } = usePersona();
  const profile = profileData as unknown as Profile;
  const seo = seoData as unknown as SeoConfig;

  const currentPersonaContent = (profile.personaContent as Record<PersonaType, PersonaContent>)[
    activePersona
  ];
  const currentSkills = (skillsData as unknown as Record<PersonaType, SkillGroup[]>)[activePersona];
  const currentExperience = (experienceData as unknown as ExperienceItem[])
    .filter((exp) => activePersona === 'overall' || exp.personas.includes(activePersona))
    .sort((a, b) => comparePeriods(a.period, b.period));
  const currentTestimonials = (testimonialsData as unknown as TestimonialItem[]).filter(
    (t) => activePersona === 'overall' || t.personas.includes(activePersona),
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
      <SkillsPresenter skills={currentSkills} activePersona={activePersona} />
      <ExperiencePresenter
        experience={currentExperience}
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
