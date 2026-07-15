import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section
      id={id}
      className={`py-12 md:py-20 border-b border-border-primary last:border-b-0 w-full ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
