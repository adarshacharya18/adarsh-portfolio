import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../atoms/Section';
import { FiCalendar, FiArrowRight, FiSearch, FiBookOpen, FiGithub } from 'react-icons/fi';
import TagBadgeList from '../molecules/TagBadgeList';
import type { ArticleMeta } from '../../types/article';

interface ArticlesPresenterProps {
  articles: ArticleMeta[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
}

const ArticlesPresenter: React.FC<ArticlesPresenterProps> = ({
  articles,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      {/* Search & Categories Selection Panel */}
      <div className="space-y-4 text-left">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tags, or excerpt..."
            className="w-full text-xs p-3 pl-10 rounded-lg bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus transition"
          />
        </div>

        {/* Categories Filters List */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`font-mono text-3xs px-2.5 py-1 rounded border transition cursor-pointer ${
              selectedCategory === null
                ? 'bg-text-primary border-text-primary text-bg-primary font-bold'
                : 'bg-bg-secondary border-border-primary text-text-secondary hover:border-border-focus'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-3xs px-2.5 py-1 rounded border transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-text-primary border-text-primary text-bg-primary font-bold'
                  : 'bg-bg-secondary border-border-primary text-text-secondary hover:border-border-focus'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Listing */}
      <Section id="articles-list" className="w-full">
        <div className="space-y-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <article
                key={article.slug}
                className="border border-border-primary bg-bg-secondary p-6 rounded-lg space-y-3 shadow-soft hover:border-border-focus transition text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-2xs text-text-muted font-mono gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>{article.category}</span>
                    <span>&bull;</span>
                    <span>{article.readingTime}</span>
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">{article.title}</h2>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  {article.excerpt}
                </p>
                <TagBadgeList tags={article.tags} />
                <div className="pt-4 border-t border-border-primary flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 text-xs text-text-muted font-semibold">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {article.mediumUrl && (
                      <a
                        href={article.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 hover:text-text-primary transition"
                      >
                        <FiBookOpen className="w-3.5 h-3.5" />
                        <span>Read Medium</span>
                      </a>
                    )}
                    {article.gistUrl && (
                      <a
                        href={article.gistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 hover:text-text-primary transition"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                        <span>Read Gist</span>
                      </a>
                    )}
                  </div>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="inline-flex items-center space-x-1.5 hover:text-text-primary transition cursor-pointer self-start sm:self-auto"
                  >
                    <span>Read Article</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 border border-border-primary rounded-lg bg-bg-secondary">
              <p className="text-sm text-text-muted">No articles found matching search criteria.</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default ArticlesPresenter;
