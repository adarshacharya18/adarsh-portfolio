import type { PersonaType } from './persona';

export interface TimelineItem {
  id: string;
  quarter: string;
  title: string;
  description: string;
  category: string;
  personas: PersonaType[];
}
