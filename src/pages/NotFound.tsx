import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import seoData from '../data/seo.json';
import type { SeoConfig } from '../types/seo';

const NotFound: React.FC = () => {
  const seo = seoData as unknown as SeoConfig;

  useDocumentMetadata({
    title: seo.notFound.title,
    description: seo.notFound.description,
  });

  return (
    <PageWrapper className="justify-center items-center">
      <Section className="text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight text-text-muted">404</h1>
        <h2 className="text-2xl font-semibold">{seo.notFound.title.split('|')[0].trim()}</h2>
        <p className="text-text-secondary max-w-sm mx-auto">{seo.notFound.description}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded bg-text-primary text-bg-primary font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition cursor-pointer"
        >
          {seo.notFound.buttonText}
        </Link>
      </Section>
    </PageWrapper>
  );
};

export default NotFound;
