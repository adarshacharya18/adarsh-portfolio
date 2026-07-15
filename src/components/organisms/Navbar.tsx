import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeSwitcher from '../molecules/ThemeSwitcher';
import PersonaSelector from '../molecules/PersonaSelector';
import { FiMenu, FiX } from 'react-icons/fi';

import type { NavigationConfig } from '../../types/navigation';
import navigationData from '../../data/navigation.json';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = navigationData as unknown as NavigationConfig;

  return (
    <header className="border-b border-border-primary bg-bg-secondary sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-md font-bold tracking-tight font-display text-text-primary">
            {nav.logoText}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6">
          {nav.links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-2xs font-semibold tracking-wider uppercase transition ${
                  isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="h-4 w-px bg-border-primary" />
          <PersonaSelector />
          <ThemeSwitcher />
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-text-muted hover:text-text-primary xl:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="xl:hidden border-b border-border-primary bg-bg-secondary p-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            {nav.links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-wider uppercase transition ${
                    isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-3 border-t border-border-primary flex flex-col gap-3">
            <div>
              <span className="text-2xs text-text-muted font-bold block mb-1 uppercase tracking-wider">
                Target Persona
              </span>
              <PersonaSelector />
            </div>
            <div>
              <span className="text-2xs text-text-muted font-bold block mb-1 uppercase tracking-wider">
                Color Theme
              </span>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
