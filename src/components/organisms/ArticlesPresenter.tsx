import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../atoms/Section';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import type { ArticleMeta } from '../../types/article';

interface ArticlesPresenterProps {
  articles: ArticleMeta[];
}

const ArticlesPresenter: React.FC<ArticlesPresenterProps> = ({ articles }) => {
  return (
    <Section id="articles-list" className="max-w-3xl mx-auto w-full">
      <div className="space-y-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border border-border-primary bg-bg-secondary p-6 rounded-lg space-y-3 shadow-soft hover:border-border-focus transition text-left"
          >
            <div className="flex items-center space-x-2 text-2xs text-text-muted font-mono">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary">{article.title}</h2>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">{article.excerpt}</p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-3xs px-2 py-0.5 rounded bg-bg-primary border border-border-primary text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-border-primary flex justify-end">
              <Link
                to={`/articles/${article.slug}`}
                className="inline-flex items-center space-x-1.5 text-xs text-text-muted font-semibold hover:text-text-primary transition"
              >
                <span>Read Article</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default ArticlesPresenter;
