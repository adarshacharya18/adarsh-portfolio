import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/" className="text-accent-primary hover:underline">
        &larr; Back to Dashboard
      </Link>
      <article className="space-y-6">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Case Study: {slug}</h1>
          <p className="text-lg text-text-secondary">
            Structured details using the STAR methodology (Situation, Task, Action, Result).
          </p>
        </header>
        <hr className="border-border-primary" />
        <div className="prose prose-invert max-w-none">
          <p>This layout resolves dynamically for routes mapping `/case-studies/{slug}`.</p>
        </div>
      </article>
    </div>
  );
};

export default CaseStudy;
