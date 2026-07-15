import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';

const NotFound: React.FC = () => {
  return (
    <PageWrapper className="justify-center items-center">
      <Section className="text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight text-text-muted">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-text-secondary max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded bg-text-primary text-bg-primary font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition cursor-pointer"
        >
          Go Back Home
        </Link>
      </Section>
    </PageWrapper>
  );
};

export default NotFound;
