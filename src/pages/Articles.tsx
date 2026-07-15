import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import articlesData from '../data/articles.json';
import seoData from '../data/seo.json';
import ArticlesPresenter from '../components/organisms/ArticlesPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { ArticleMeta } from '../types/article';
import type { SeoConfig } from '../types/seo';

const Articles: React.FC = () => {
  const articles = articlesData as unknown as ArticleMeta[];
  const seo = seoData as unknown as SeoConfig;

  useDocumentMetadata({
    title: seo.articles.title,
    description: seo.articles.description,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Dynamically extract categories from articles list
  const categories = useMemo(() => {
    return Array.from(new Set(articles.map((art) => art.category)));
  }, [articles]);

  // Real-time search and category filtering logic
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || art.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <PageWrapper>
      <Section id="articles-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Articles & Logs</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Technical essays, architectural reviews, and tutorials on systems design.
        </p>
      </Section>

      <ArticlesPresenter
        articles={filteredArticles}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </PageWrapper>
  );
};

export default Articles;
