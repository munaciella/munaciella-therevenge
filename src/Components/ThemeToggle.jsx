// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded transition-all"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-8 h-8 text-yellow-400 bg-transparent" />
      ) : (
        <MoonIcon className="w-8 h-8 text-gray-700 bg-transparent" />
      )}
    </button>
  );
};

export default ThemeToggle;