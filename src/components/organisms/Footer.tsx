import React from 'react';
import type { SocialLinkItem } from '../../types/socials';
import socialsData from '../../data/socials.json';

const Footer: React.FC = () => {
  const socials = socialsData as unknown as SocialLinkItem[];

  return (
    <footer className="border-t border-border-primary bg-bg-secondary py-8 mt-20">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <div>
          &copy; {new Date().getFullYear()} Software Engineering Portfolio. All rights reserved.
        </div>
        <div className="flex gap-6">
          {socials.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
