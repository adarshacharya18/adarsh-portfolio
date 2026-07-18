import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowLeft, FiClock, FiBookOpen } from 'react-icons/fi';
import { parseMarkdown } from '../../utils/markdown';
import TagBadgeList from '../molecules/TagBadgeList';
import Section from '../atoms/Section';
import type { ArticleMeta } from '../../types/article';

interface ArticleDetailPresenterProps {
  articleMeta: ArticleMeta;
  rawContent: string;
  relatedArticles: ArticleMeta[];
}

export interface TocItem {
  text: string;
  id: string;
  level: number;
}

// Extract headings dynamically from raw markdown text
const extractToc = (markdown: string): TocItem[] => {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const level = trimmed.startsWith('## ') ? 2 : 3;
      const text = trimmed.replace(/^##+\s+/, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      toc.push({ text, id, level });
    }
  });

  return toc;
};

const ArticleDetailPresenter: React.FC<ArticleDetailPresenterProps> = ({
  articleMeta,
  rawContent,
  relatedArticles,
}) => {
  const tocItems = extractToc(rawContent);

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8 text-left">
      <Link
        to="/articles"
        className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
      >
        <FiArrowLeft className="w-3.5 h-3.5" />
        <span>All Articles</span>
      </Link>

      {/* Main Grid: Content + Sidebar ToC */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Article Body Content */}
        <article className="lg:col-span-3 border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft">
          <header className="space-y-4 border-b border-border-primary pb-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xs text-text-muted font-mono">
              <div className="flex items-center space-x-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                <span>{articleMeta.date}</span>
              </div>
              <span className="hidden sm:inline text-border-focus">&bull;</span>
              <div className="flex items-center space-x-1.5">
                <FiClock className="w-3.5 h-3.5" />
                <span>{articleMeta.readingTime}</span>
              </div>
              <span className="hidden sm:inline text-border-focus">&bull;</span>
              <div className="flex items-center space-x-1.5">
                <FiBookOpen className="w-3.5 h-3.5" />
                <span>{articleMeta.category}</span>
              </div>
            </div>
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-text-primary">
              {articleMeta.title}
            </h1>
            <TagBadgeList tags={articleMeta.tags} />
          </header>

          <div className="space-y-1">{parseMarkdown(rawContent)}</div>
        </article>

        {/* Sidebar Table of Contents */}
        {tocItems.length > 0 && (
          <aside className="hidden lg:block lg:col-span-1 sticky top-24 p-4 border border-border-primary bg-bg-secondary rounded-xl shadow-soft space-y-4">
            <h3 className="text-2xs font-bold uppercase tracking-wider text-text-muted border-b border-border-primary pb-2">
              On this page
            </h3>
            <nav className="space-y-2">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-3xs font-medium text-text-secondary hover:text-text-primary transition ${
                    item.level === 3 ? 'pl-3 border-l border-border-primary ml-1' : ''
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>

      {/* Related Posts Section */}
      {relatedArticles.length > 0 && (
        <Section id="related-articles" className="pt-6 border-t border-border-primary space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                to={`/articles/${related.slug}`}
                className="border border-border-primary bg-bg-secondary p-5 rounded-lg space-y-2 hover:border-border-focus transition block cursor-pointer"
              >
                <div className="flex items-center justify-between text-3xs text-text-muted font-mono">
                  <span>{related.date}</span>
                  <span>{related.category}</span>
                </div>
                <h4 className="text-sm font-semibold text-text-primary hover:text-text-secondary transition">
                  {related.title}
                </h4>
                <p className="text-2xs text-text-muted line-clamp-2 leading-relaxed">
                  {related.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

export default ArticleDetailPresenter;
