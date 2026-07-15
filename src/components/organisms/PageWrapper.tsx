import React from 'react';
import PageTransition from '../molecules/PageTransition';
import Container from '../atoms/Container';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  clean?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '', clean = false }) => {
  return (
    <PageTransition>
      <Container clean={clean} className={`py-6 md:py-10 flex-grow flex flex-col ${className}`}>
        {children}
      </Container>
    </PageTransition>
  );
};

export default PageWrapper;
