import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePersona } from '../../hooks/usePersona';

const MainLayout: React.FC = () => {
  const { activePersona } = usePersona();

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
