import type { PersonaType } from './persona';

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  personas: PersonaType[];
}
