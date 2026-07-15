/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

interface ScrollContextType {
  scrollY: number;
  scrollProgress: number; // percentage 0 - 100
  isScrolled: boolean;
}

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollData, setScrollData] = useState<ScrollContextType>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (y / height) * 100 : 0;

      setScrollData({
        scrollY: y,
        scrollProgress: progress,
        isScrolled: y > 20,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <ScrollContext.Provider value={scrollData}>{children}</ScrollContext.Provider>;
};

export default ScrollContext;
