export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  readingTime: string;
  relatedSlugs: string[];
  mediumUrl?: string;
  gistUrl?: string;
}
