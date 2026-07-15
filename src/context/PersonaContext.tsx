/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { PersonaType } from '../types/persona';

interface PersonaContextType {
  activePersona: PersonaType;
  setPersona: (persona: PersonaType) => void;
}

const DEFAULT_PERSONA: PersonaType = 'overall';
const VALID_PERSONAS: PersonaType[] = ['overall', 'swe', 'backend', 'fullstack', 'wordpress'];

export const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePersona, setActivePersona] = useState<PersonaType>(() => {
    if (typeof window === 'undefined') return DEFAULT_PERSONA;

    // 1. Check URL query parameters
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role') as PersonaType;
    if (roleParam && VALID_PERSONAS.includes(roleParam)) {
      return roleParam;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('active-persona') as PersonaType;
    if (saved && VALID_PERSONAS.includes(saved)) {
      return saved;
    }

    return DEFAULT_PERSONA;
  });

  const setPersona = (persona: PersonaType) => {
    if (!VALID_PERSONAS.includes(persona)) return;
    setActivePersona(persona);
    localStorage.setItem('active-persona', persona);

    // Synchronize query parameters dynamically
    const url = new URL(window.location.href);
    url.searchParams.set('role', persona);
    window.history.pushState({}, '', url.toString());
  };

  // Sync state if user uses browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role') as PersonaType;
      if (roleParam && VALID_PERSONAS.includes(roleParam)) {
        setActivePersona(roleParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <PersonaContext.Provider value={{ activePersona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};
export default PersonaContext;
