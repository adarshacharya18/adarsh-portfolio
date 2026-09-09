export const VALID_PERSONAS = ['overall', 'swe', 'backend', 'fullstack', 'wordpress'] as const;
export type PersonaType = (typeof VALID_PERSONAS)[number];

export const DEFAULT_PERSONA: PersonaType = 'overall';

export const isPersonaType = (val: unknown): val is PersonaType =>
  typeof val === 'string' && (VALID_PERSONAS as readonly string[]).includes(val);

export const getResumeRoute = (persona: PersonaType): string =>
  persona === 'overall' ? '/resume' : `/resume/${persona}`;

export interface PersonaConfig {
  id: PersonaType;
  label: string;
  headline: string;
  tagline: string;
  bio: string;
  skillsHighlight: string[];
}
