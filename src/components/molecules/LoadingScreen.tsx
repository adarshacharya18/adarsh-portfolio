import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-6 h-6 rounded-full border-2 border-border-primary border-t-text-primary animate-spin" />
        <span className="font-mono text-2xs tracking-widest text-text-muted uppercase">
          Loading
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
