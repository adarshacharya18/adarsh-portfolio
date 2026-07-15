import React from 'react';
import { usePersona } from '../../hooks/usePersona';
import type { PersonaType } from '../../types/persona';

const PersonaSelector: React.FC = () => {
  const { activePersona, setPersona } = usePersona();

  const personas: { id: PersonaType; label: string; activeClass: string }[] = [
    { id: 'swe', label: 'SWE', activeClass: 'bg-persona-swe text-white' },
    { id: 'backend', label: 'Backend', activeClass: 'bg-persona-backend text-white shadow' },
    { id: 'fullstack', label: 'Full Stack', activeClass: 'bg-persona-fullstack text-white' },
    { id: 'wordpress', label: 'WordPress', activeClass: 'bg-persona-wordpress text-white' },
  ];

  return (
    <div className="flex bg-bg-tertiary border border-border-primary p-1 rounded-lg">
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => setPersona(p.id)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
            activePersona === p.id ? p.activeClass : 'text-text-muted hover:text-text-primary'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default PersonaSelector;
