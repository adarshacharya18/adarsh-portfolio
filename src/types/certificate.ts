import type { PersonaType } from './persona';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
  personas: PersonaType[];
}
