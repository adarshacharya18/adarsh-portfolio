import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeSwitcher from '../molecules/ThemeSwitcher';
import PersonaSelector from '../molecules/PersonaSelector';
import LogoMark from '../atoms/LogoMark';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

import type { NavigationConfig } from '../../types/navigation';
import navigationData from '../../data/navigation.json';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const nav = navigationData as unknown as NavigationConfig;

  // Split links into core navigation and secondary dropdown routes
  const primaryPaths = ['/', '/experience', '/projects', '/certificates', '/contact'];
  const primaryLinks = nav.links.filter((link) => primaryPaths.includes(link.path));
  const secondaryLinks = nav.links.filter((link) => !primaryPaths.includes(link.path));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b border-border-primary bg-bg-secondary sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <LogoMark
            size={22}
            className="text-text-primary transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-lg font-extrabold tracking-wide font-mono text-text-primary">
            {nav.logoText}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5">
          {primaryLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-3xs font-semibold tracking-wider uppercase transition ${
                  isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* More Links Dropdown */}
          {secondaryLinks.length > 0 && (
            <div className="relative inline-block text-left" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="inline-flex items-center space-x-1 text-3xs font-semibold tracking-wider uppercase text-text-muted hover:text-text-primary transition cursor-pointer"
                aria-haspopup="true"
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                <FiChevronDown
                  className={`w-3 h-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMoreOpen && (
                <div className="absolute left-0 mt-2 w-36 rounded-lg border border-border-primary bg-bg-secondary shadow-medium z-50 p-1 space-y-0.5">
                  {secondaryLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMoreOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-3xs font-semibold tracking-wider uppercase rounded transition ${
                          isActive
                            ? 'bg-bg-tertiary text-text-primary'
                            : 'text-text-muted hover:bg-bg-primary hover:text-text-primary'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="h-4 w-px bg-border-primary" />
          <PersonaSelector />
          <ThemeSwitcher />
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-text-muted hover:text-text-primary lg:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden border-b border-border-primary bg-bg-secondary p-4 space-y-4">
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
