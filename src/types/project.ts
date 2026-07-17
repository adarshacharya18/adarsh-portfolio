import type { PersonaType } from './persona';

export interface ProjectLinks {
  github?: string;
  demo?: string;
  certificate?: string;
}

export interface GalleryItem {
  description: string;
  images: string[];
  caption: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  personas: PersonaType[];
  role: string;
  timeline: string;
  architecture: string;
  problem: string;
  solution: string;
  challenges: string;
  techStack: string[];
  lessonsLearned: string;
  video?: string;
  images: string[];
  screenshots: string[];
  gallery?: GalleryItem[];
  links: ProjectLinks;
  futureImprovements: string;
}
