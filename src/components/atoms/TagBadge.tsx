import React from 'react';

interface TagBadgeProps {
  label: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ label }) => {
  return (
    <span className="font-mono text-3xs px-2 py-0.5 rounded bg-bg-primary border border-border-primary text-text-secondary">
      {label}
    </span>
  );
};

export default TagBadge;
