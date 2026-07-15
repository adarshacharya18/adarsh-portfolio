export type PersonaType = 'swe' | 'backend' | 'fullstack' | 'wordpress';

export interface PersonaConfig {
  id: PersonaType;
  label: string;
  headline: string;
  tagline: string;
  bio: string;
  skillsHighlight: string[];
}
