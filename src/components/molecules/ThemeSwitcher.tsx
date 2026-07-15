import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 bg-bg-tertiary border border-border-primary p-1 rounded-full">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all duration-150 ${
          theme === 'light'
            ? 'bg-accent-primary text-white shadow'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="Light Mode"
        title="Light Mode"
      >
        <FiSun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all duration-150 ${
          theme === 'dark'
            ? 'bg-accent-primary text-white shadow'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="Dark Mode"
        title="Dark Mode"
      >
        <FiMoon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all duration-150 ${
          theme === 'system'
            ? 'bg-accent-primary text-white shadow'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="System Theme"
        title="System Theme"
      >
        <FiMonitor className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
