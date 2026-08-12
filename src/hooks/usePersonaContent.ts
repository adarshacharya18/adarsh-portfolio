import { useMemo } from 'react';
import { usePersona } from './usePersona';

import projectsData from '../data/projects.json';
import experienceData from '../data/experience.json';
import certificatesData from '../data/certificates.json';
import timelineData from '../data/timeline.json';
import testimonialsData from '../data/testimonials.json';

import type { ProjectItem } from '../types/project';
import type { ExperienceItem } from '../types/experience';
import type { CertificateItem } from '../types/certificate';
import type { TimelineItem } from '../types/timeline';
import type { TestimonialItem } from '../types/testimonials';
import type { PersonaType } from '../types/persona';

// Discriminated union for content types
type ContentTypeMap = {
  projects: ProjectItem;
  experience: ExperienceItem;
  certificates: CertificateItem;
  timeline: TimelineItem;
  testimonials: TestimonialItem;
};

// Generic interface to ensure all domain items have the personas array
interface PersonaCuratedItem {
  personas: string[];
}

export function usePersonaContent<T extends keyof ContentTypeMap>(
  contentType: T,
): { content: ContentTypeMap[T][]; activePersona: PersonaType } {
  const { activePersona } = usePersona();

  const curatedFeed = useMemo(() => {
    let rawData: PersonaCuratedItem[];

    switch (contentType) {
      case 'projects':
        rawData = projectsData as unknown as ProjectItem[];
        break;
      case 'experience':
        rawData = experienceData as unknown as ExperienceItem[];
        break;
      case 'certificates':
        rawData = certificatesData as unknown as CertificateItem[];
        break;
      case 'timeline':
        rawData = timelineData as unknown as TimelineItem[];
        break;
      case 'testimonials':
        rawData = testimonialsData as unknown as TestimonialItem[];
        break;
      default:
        rawData = [];
    }

    return rawData.filter(
      (item) => activePersona === 'overall' || item.personas.includes(activePersona),
    ) as ContentTypeMap[T][];
  }, [contentType, activePersona]);

  return { content: curatedFeed, activePersona };
}
