import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePersona } from '../../hooks/usePersona';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import LoadingScreen from '../molecules/LoadingScreen';
import ScrollToTop from '../molecules/ScrollToTop';

const MainLayout: React.FC = () => {
  const { activePersona } = usePersona();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Custom MotionValue to track scroll without React re-renders
  const rawProgress = useMotionValue(0);

  const isTimeline = location.pathname === '/timeline';

  const displayWidth = useTransform(rawProgress, (val) => {
    const percentage = isTimeline ? Math.max(0, (1 - val) * 100) : val * 100;
    return `${percentage}%`;
  });

  useEffect(() => {
    const updateScroll = () => {
      const y = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? y / height : 0;
      rawProgress.set(progress);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });

    // Initial calculation
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [rawProgress]);

  useEffect(() => {
    // Wait for the browser to signal complete rather than a hardcoded timeout
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setIsLoading(false), 300); // Small buffer for intro animations
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
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
      <ScrollToTop />
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

      {/* Scroll Progress Bar - Directly driven by GPU MotionValues */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-accent-primary z-[60]"
        style={{ width: displayWidth }}
        aria-hidden="true"
      />

      {/* Visually hidden screen reader live region for persona change announcements */}
      <div className="sr-only" aria-live="polite">
        {`Portfolio content tailored for ${getPersonaLabel(activePersona)}`}
      </div>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <React.Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
