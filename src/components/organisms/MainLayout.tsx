import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePersona } from '../../hooks/usePersona';
import { useScroll } from '../../hooks/useScroll';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../molecules/LoadingScreen';

const MainLayout: React.FC = () => {
  const { activePersona } = usePersona();
  const { scrollProgress } = useScroll();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const getPersonaLabel = (role: string) => {
    switch (role) {
      case 'swe':
        return 'Software Engineer';
      case 'backend':
        return 'Backend Engineer';
      case 'fullstack':
        return 'Full Stack Developer';
      case 'wordpress':
        return 'WordPress Engineer';
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-bg-primary"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-accent-primary z-[60] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Visually hidden screen reader live region for persona change announcements */}
      <div className="sr-only" aria-live="polite">
        {`Portfolio content tailored for ${getPersonaLabel(activePersona)}`}
      </div>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
