import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary py-8 mt-20">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <div>
          &copy; {new Date().getFullYear()} Software Engineering Portfolio. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
