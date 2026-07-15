import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { PersonaProvider } from './context/PersonaContext';
import { ScrollProvider } from './context/ScrollContext';
import { TypingProvider } from './context/TypingContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PersonaProvider>
        <ScrollProvider>
          <TypingProvider>
            <RouterProvider router={router} />
          </TypingProvider>
        </ScrollProvider>
      </PersonaProvider>
    </ThemeProvider>
  );
};

export default App;
