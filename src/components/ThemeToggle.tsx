import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read current theme from html attribute or localStorage
    const current = document.documentElement.getAttribute('data-theme') || 
                    localStorage.getItem('artcraft-theme') || 
                    'dark';
    setTheme(current === 'light' ? 'light' : 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Add theme animation class for Houdini smooth transition
    document.documentElement.classList.add('theme-anim');
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('artcraft-theme', nextTheme);
    } catch (e) {
      // Storage might fail in sandboxed iframes
    }
    setTheme(nextTheme);

    // Remove animation class after transition completes
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-anim');
    }, 450);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-15 z-50 flex items-center select-none">
      <button
        type="button"
        onClick={toggleTheme}
        data-swarm-target="true"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Toggle Theme [Current: ${theme.toUpperCase()}]`}
        className="group relative flex items-center gap-2 h-9 px-3 text-muted hover:text-ink cursor-pointer border border-line bg-canvas/80 backdrop-blur-md transition-all duration-150"
      >
        {/* CAD Corner Ticks */}
        <span className="tick tick-tl -top-[5px] -left-[5px]" aria-hidden="true" />
        <span className="tick tick-tr -top-[5px] -right-[5px]" aria-hidden="true" />
        <span className="tick tick-bl -bottom-[5px] -left-[5px]" aria-hidden="true" />
        <span className="tick tick-br -bottom-[5px] -right-[5px]" aria-hidden="true" />

        {/* Animated Icon */}
        <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
          {theme === 'dark' ? (
            <Moon className="w-3.5 h-3.5 text-ink transition-transform duration-300 ease-out group-hover:rotate-12" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-ink transition-transform duration-300 ease-out group-hover:rotate-45" />
          )}
        </div>

        {/* HUD Mode Text */}
        <span className="hud-label text-[10px] text-muted group-hover:text-ink">
          {theme === 'dark' ? 'DARK' : 'LIGHT'}
        </span>
      </button>
    </div>
  );
};
