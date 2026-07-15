import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { parseMarkdown } from '../../utils/markdown';
import TagBadgeList from '../molecules/TagBadgeList';
import type { ArticleMeta } from '../../types/article';

interface ArticleDetailPresenterProps {
  articleMeta: ArticleMeta;
  rawContent: string;
}

const ArticleDetailPresenter: React.FC<ArticleDetailPresenterProps> = ({
  articleMeta,
  rawContent,
}) => {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <Link
        to="/articles"
        className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
      >
        <FiArrowLeft className="w-3.5 h-3.5" />
        <span>All Articles</span>
      </Link>

      <article className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft text-left">
        <header className="space-y-3 border-b border-border-primary pb-6">
          <div className="flex items-center space-x-2 text-2xs text-text-muted font-mono">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>{articleMeta.date}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
            {articleMeta.title}
          </h1>
          <TagBadgeList tags={articleMeta.tags} />
        </header>

        <div className="space-y-1">{parseMarkdown(rawContent)}</div>
      </article>
    </div>
  );
};

export default ArticleDetailPresenter;
