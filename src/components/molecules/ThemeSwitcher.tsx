import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center space-x-1 bg-bg-tertiary border border-border-primary p-1 rounded-full w-fit">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'light'
            ? 'bg-accent-primary text-white shadow'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="Light Mode"
        title="Light Mode"
      >
        <FiSun className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'dark'
            ? 'bg-accent-primary text-white shadow'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="Dark Mode"
        title="Dark Mode"
      >
        <FiMoon className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'system'
            ? 'bg-accent-primary text-white shadow'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="System Theme"
        title="System Theme"
      >
        <FiMonitor className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
