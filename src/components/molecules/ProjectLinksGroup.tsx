import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectLinksGroupProps {
  githubUrl?: string;
  demoUrl?: string;
}

const ProjectLinksGroup: React.FC<ProjectLinksGroupProps> = ({ githubUrl, demoUrl }) => {
  if (!githubUrl && !demoUrl) return null;

  return (
    <div className="flex items-center space-x-3 text-text-secondary">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition"
          aria-label="View Github Repository"
        >
          <FiGithub className="w-5 h-5" />
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition"
          aria-label="View Live Demo"
        >
          <FiExternalLink className="w-5 h-5" />
        </a>
      )}
    </div>
  );
};

export default ProjectLinksGroup;
