import type { PersonaType } from './persona';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  personas: PersonaType[];
}
