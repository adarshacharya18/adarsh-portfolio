/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react';

interface TypingContextType {
  activeAnimationId: string | null;
  startAnimation: (id: string) => void;
  completeAnimation: (id: string) => void;
  isCompleted: (id: string) => boolean;
}

export const TypingContext = createContext<TypingContextType | undefined>(undefined);

export const TypingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeAnimationId, setActiveAnimationId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const startAnimation = (id: string) => {
    setActiveAnimationId(id);
  };

  const completeAnimation = (id: string) => {
    if (activeAnimationId === id) {
      setActiveAnimationId(null);
    }
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const isCompleted = (id: string) => completedIds.has(id);

  return (
    <TypingContext.Provider
      value={{
        activeAnimationId,
        startAnimation,
        completeAnimation,
        isCompleted,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export default TypingContext;
