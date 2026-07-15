export interface SeoPageConfig {
  title: string;
  description: string;
  keywords?: string;
}

export interface SeoConfig {
  default: SeoPageConfig;
  projects: SeoPageConfig;
  experience: SeoPageConfig;
  articles: SeoPageConfig;
  timeline: SeoPageConfig;
  certificates: SeoPageConfig;
  contact: SeoPageConfig;
}
