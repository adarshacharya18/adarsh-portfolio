import type { PersonaType } from './persona';

export interface Socials {
  github: string;
  linkedin: string;
  leetcode: string;
  codeforces: string;
}

export interface PersonaContent {
  title: string;
  subTitle: string;
  description: string;
  featuredHeading: string;
  featuredDescription: string;
}

export interface Profile {
  name: string;
  avatarUrl: string;
  email: string;
  resumeUrl: string;
  socials: Socials;
  personaContent: Record<PersonaType, PersonaContent>;
}
