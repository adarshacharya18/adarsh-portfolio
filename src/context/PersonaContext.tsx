/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { type PersonaType, DEFAULT_PERSONA, isPersonaType } from '../types/persona';

interface PersonaContextType {
  activePersona: PersonaType;
  setPersona: (persona: PersonaType) => void;
}

export const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePersona, setActivePersona] = useState<PersonaType>(() => {
    if (typeof window === 'undefined') return DEFAULT_PERSONA;

    // 1. If path is a resume persona route (/resume/:persona), initialize from path
    if (window.location.pathname.startsWith('/resume/')) {
      const pathPart = window.location.pathname.replace('/resume/', '').split('/')[0];
      if (isPersonaType(pathPart) && pathPart !== 'overall') {
        return pathPart;
      }
    }

    // 2. Check URL query parameters
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (isPersonaType(roleParam)) {
      return roleParam;
    }

    // 3. Check localStorage
    const saved = localStorage.getItem('active-persona');
    if (isPersonaType(saved)) {
      return saved;
    }

    return DEFAULT_PERSONA;
  });

  const setPersona = useCallback(
    (persona: PersonaType) => {
      if (!isPersonaType(persona) || persona === activePersona) return;
      setActivePersona(persona);
      localStorage.setItem('active-persona', persona);

      // Synchronize query parameters dynamically
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (url.pathname.startsWith('/resume')) {
          // Resume routes use dedicated paths (/resume, /resume/:persona), avoid query param pollution
          url.searchParams.delete('role');
        } else {
          if (persona === DEFAULT_PERSONA) {
            url.searchParams.delete('role');
          } else {
            url.searchParams.set('role', persona);
          }
        }
        window.history.replaceState({}, '', url.toString());
      }
    },
    [activePersona],
  );

  // Sync state if user uses browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      // Resume page handles its own route parameter changes
      if (window.location.pathname.startsWith('/resume')) return;

      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (isPersonaType(roleParam)) {
        setActivePersona(roleParam);
      } else if (!roleParam) {
        setActivePersona(DEFAULT_PERSONA);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update CSS variable on document element for dynamic accents
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--accent-primary', `var(--persona-${activePersona})`);
  }, [activePersona]);

  const contextValue = useMemo(() => ({ activePersona, setPersona }), [activePersona, setPersona]);

  return <PersonaContext.Provider value={contextValue}>{children}</PersonaContext.Provider>;
};
export default PersonaContext;
