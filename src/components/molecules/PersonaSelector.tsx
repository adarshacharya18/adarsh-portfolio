import React, { useState, useRef, useEffect } from 'react';
import { usePersona } from '../../hooks/usePersona';
import type { PersonaType } from '../../types/persona';
import { FiChevronDown } from 'react-icons/fi';

const PersonaSelector: React.FC = () => {
  const { activePersona, setPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const personas: { id: PersonaType; label: string; shortLabel: string; dotClass: string }[] = [
    { id: 'swe', label: 'Software Engineer', shortLabel: 'SWE', dotClass: 'bg-persona-swe' },
    {
      id: 'backend',
      label: 'Backend Engineer',
      shortLabel: 'Backend',
      dotClass: 'bg-persona-backend',
    },
    {
      id: 'fullstack',
      label: 'Full Stack Developer',
      shortLabel: 'Full Stack',
      dotClass: 'bg-persona-fullstack',
    },
    {
      id: 'wordpress',
      label: 'WordPress Developer',
      shortLabel: 'WordPress',
      dotClass: 'bg-persona-wordpress',
    },
  ];

  const activeOption = personas.find((p) => p.id === activePersona) || personas[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-border-primary bg-bg-secondary hover:border-border-focus text-2xs font-semibold text-text-secondary hover:text-text-primary transition cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${activeOption.dotClass}`} />
        <span>{activeOption.shortLabel}</span>
        <FiChevronDown
          className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border-primary bg-bg-secondary shadow-medium z-50 p-1 space-y-0.5">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPersona(p.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-2xs font-semibold rounded transition flex items-center space-x-2 cursor-pointer ${
                activePersona === p.id
                  ? 'bg-bg-tertiary text-text-primary'
                  : 'text-text-muted hover:bg-bg-primary hover:text-text-primary'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`} />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
