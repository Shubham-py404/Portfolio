import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

export const TopContactHeader: React.FC = () => {
  const { portfolio } = usePortfolio();
  const initials = portfolio.profile.name
    ? portfolio.profile.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'AT';

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/80 border-b border-neutral-900 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Name badge */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs tracking-wider">
            {initials}
          </div>
          <span className="text-sm font-mono tracking-widest uppercase text-neutral-300 hidden sm:inline-block">
            {portfolio.profile.name}
          </span>

        </div>

        {/* Top Right Corner Actions */}
        <div className="flex items-center space-x-3">

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="flex items-center space-x-2 text-xs font-mono font-medium px-4 py-2 rounded-md bg-white text-black hover:bg-neutral-200 transition-colors shadow-sm"
            id="top-contact-btn"
          >
            <span>Contact</span>
            <Send className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};
