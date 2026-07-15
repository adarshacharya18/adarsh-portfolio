import type { PersonaType } from './persona';

export interface ProjectLinks {
  github: string;
  demo: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  personas: PersonaType[];
  problem: string;
  solution: string;
  challenges: string;
  techStack: string[];
  lessonsLearned: string;
  timeline: string;
  images: string[];
  links: ProjectLinks;
  futureImprovements: string;
}
