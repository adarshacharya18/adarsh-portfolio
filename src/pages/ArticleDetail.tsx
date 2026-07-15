import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import articlesData from '../data/articles.json';
import ArticleDetailPresenter from '../components/organisms/ArticleDetailPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import JsonLd from '../components/atoms/JsonLd';
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

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adarsh.dev';

  useDocumentMetadata({
    title: articleMeta ? `${articleMeta.title} | Technical Blog` : 'Article Not Found',
    description: articleMeta
      ? articleMeta.excerpt
      : 'Detailed technical articles and developer logs.',
    canonicalUrl: articleMeta ? `${originUrl}/articles/${articleMeta.slug}` : undefined,
  });

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

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: articleMeta.title,
    datePublished: articleMeta.date,
    description: articleMeta.excerpt,
    keywords: articleMeta.tags.join(', '),
  };

  return (
    <PageWrapper>
      <JsonLd data={blogPostSchema as Record<string, unknown>} />
      <ArticleDetailPresenter articleMeta={articleMeta} rawContent={rawContent} />
    </PageWrapper>
  );
};

export default ArticleDetail;
