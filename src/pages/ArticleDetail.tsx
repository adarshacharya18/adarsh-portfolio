import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import articlesData from '../data/articles.json';
import { parseMarkdown } from '../utils/markdown';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';
import type { ArticleMeta } from '../types/article';

// Import raw markdown contents statically using Vite ?raw query parameter
import rawCmsSetup from '../data/articles/headless-cms-setup.md?raw';
import rawApiDesign from '../data/articles/api-design-patterns.md?raw';

const articleContentMap: Record<string, string> = {
  'headless-cms-setup': rawCmsSetup,
  'api-design-patterns': rawApiDesign,
};

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const articles = articlesData as unknown as ArticleMeta[];

  const articleMeta = articles.find((art) => art.slug === slug);
  const rawContent = slug ? articleContentMap[slug] : null;

  if (!articleMeta || !rawContent) {
    return (
      <PageWrapper className="justify-center items-center">
        <Section className="text-center space-y-4">
          <h1 className="text-xl font-bold">Article Not Found</h1>
          <Link to="/articles" className="text-accent-primary hover:underline text-xs">
            Back to Articles
          </Link>
        </Section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <Link
          to="/articles"
          className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles</span>
        </Link>

        <article className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft">
          <header className="space-y-3 border-b border-border-primary pb-6">
            <div className="flex items-center space-x-2 text-2xs text-text-muted font-mono">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{articleMeta.date}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
              {articleMeta.title}
            </h1>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {articleMeta.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-3xs px-2 py-0.5 rounded bg-bg-primary border border-border-primary text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="space-y-1">{parseMarkdown(rawContent)}</div>
        </article>
      </div>
    </PageWrapper>
  );
};

export default ArticleDetail;
