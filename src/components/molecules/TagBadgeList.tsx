import React from 'react';
import TagBadge from '../atoms/TagBadge';

interface TagBadgeListProps {
  tags: string[];
}

const TagBadgeList: React.FC<TagBadgeListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {tags.map((tag) => (
        <TagBadge key={tag} label={tag} />
      ))}
    </div>
  );
};

export default TagBadgeList;
