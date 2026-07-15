import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  clean?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', clean = false }) => {
  return (
    <div className={`${clean ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
