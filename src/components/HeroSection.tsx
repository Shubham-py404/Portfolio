import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import my_img from '../../assets/images/img-shubham.jpeg';
import { ArrowDown, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon';

export const HeroSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { profile } = portfolio;

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-16 px-6 bg-black text-white overflow-hidden">
      {/* Delicate background grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">
        
        {/* Animated Profile Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 group"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neutral-800 via-neutral-400 to-neutral-800 blur-sm opacity-50 group-hover:opacity-100 transition duration-500" />

          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-white/80 shadow-2xl bg-neutral-900 flex items-center justify-center">
            <img
              src={my_img}
              alt={profile.name}
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* User Name - Animated Pure CSS Teletype Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex flex-col items-center justify-center"
        >
          <h1 className="sr-only">{profile.name || "Shubham Bansal"}</h1>
          <div
            className="fx-typewriter"
            style={{ '--i': (profile.name || "Shubham Bansal").length, '--chars': (profile.name || "Shubham Bansal").length } as React.CSSProperties}
          >
            {profile.name || "Shubham Bansal"}
          </div>
        </motion.div>

        {/* Current Occupation Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 mb-6 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono text-neutral-200 font-medium tracking-wide">
            {profile.occupation || "Computer Science Student & AI Developer"}
          </span>
        </motion.div>

        {/* Bio Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-neutral-100 font-normal max-w-3xl leading-relaxed mb-8 opacity-95 text-center drop-shadow-sm"
        >
          {profile.bio || "Dynamic Computer Science student with strong Data Structures & Algorithms expertise. Proficient in C/C++, Java, Python, and SQL, leveraging AI tools to accelerate development. Passionate about Artificial Intelligence with the future goal of pursuing a Master's in Computer Science."}
        </motion.p>

        {/* Meta Info & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-500 mb-12"
        >
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>{profile.email}</span>
            </a>
          )}
          
          <div className="flex items-center space-x-3 pl-2 border-l border-neutral-800">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.leetcodeUrl && (
              <a href={profile.leetcodeUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LeetCode (300+ Problems)">
                <LeetCodeIcon className="w-4 h-4" />
              </a>
            )}
            {profile.twitterUrl && (
              <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Smooth Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          onClick={scrollToProjects}
          className="flex flex-col items-center space-y-2 text-neutral-500 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 group-hover:text-white" />
          </motion.div>
        </motion.button>

      </div>
    </section>
  );
};
