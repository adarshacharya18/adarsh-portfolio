import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import articlesData from '../data/articles.json';
import ArticlesPresenter from '../components/organisms/ArticlesPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { ArticleMeta } from '../types/article';

const Articles: React.FC = () => {
  const articles = articlesData as unknown as ArticleMeta[];

  useDocumentMetadata({
    title: 'Technical Articles & Developer Logs | Portfolio',
    description: 'Essays, architectural posts, and lessons in software design.',
  });

  return (
    <PageWrapper>
      <Section id="articles-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Articles & Logs</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Technical essays, architectural reviews, and tutorials on systems design.
        </p>
      </Section>

      <ArticlesPresenter articles={articles} />
    </PageWrapper>
  );
};

export default Articles;
