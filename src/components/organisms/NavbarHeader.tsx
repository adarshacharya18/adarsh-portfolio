import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../molecules/ThemeSwitcher';
import PersonaSelector from '../molecules/PersonaSelector';
import { FiMenu, FiX } from 'react-icons/fi';

const NavbarHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border-primary bg-bg-secondary sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight font-display bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            DevPortfolio
          </span>
        </Link>

        {/* Desktop Navigation Links & Switches */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-accent-primary transition">
            Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <PersonaSelector />
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-text-muted hover:text-text-primary md:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden border-b border-border-primary bg-bg-secondary p-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:text-accent-primary transition"
            >
              Dashboard
            </Link>
          </nav>
          <div className="pt-2 border-t border-border-primary flex flex-col gap-3">
            <div>
              <span className="text-xs text-text-muted font-bold block mb-1">Target Persona</span>
              <PersonaSelector />
            </div>
            <div>
              <span className="text-xs text-text-muted font-bold block mb-1">Color Theme</span>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarHeader;
