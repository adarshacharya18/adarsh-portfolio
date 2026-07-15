import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { PersonaProvider } from './context/PersonaContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PersonaProvider>
        <RouterProvider router={router} />
      </PersonaProvider>
    </ThemeProvider>
  );
};

export default App;
