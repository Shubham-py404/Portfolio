import React, { useEffect, useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsAndAchievementsSection } from './components/SkillsAndAchievementsSection';
import { ContactFooter } from './components/ContactFooter';
import { ThemeToggle } from './components/ThemeToggle';
import { CadRuler } from './components/CadRuler';
import SwarmCursor from './components/SwarmCursor/SwarmCursor';
import Lenis from 'lenis';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Synchronize with document data-theme
    const updateTheme = () => {
      const themeAttr = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(themeAttr === 'light' ? 'light' : 'dark');
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Respect prefers-reduced-motion for Lenis
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return () => observer.disconnect();
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  // Clean monochrome particles tracking the active theme (no blue tint)
  const cursorColor = currentTheme === 'dark' ? '#f2f1ee' : '#101014';

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen font-sans antialiased bg-canvas text-ink selection:bg-ink selection:text-canvas">

        {/* Top-Right Floating Animated Theme Toggle */}
        <ThemeToggle />

        {/* Right-Side CAD Elevation Ruler */}
        <CadRuler />

        {/* Simplified, Fast, Monochrome Particle Cursor */}
        <SwarmCursor
          className="swarm-fixed-cursor"
          count={180}
          size={4.3}
          shape="dot"
          color={cursorColor}
          accentColor={cursorColor}
          spread={98}
          speed={7.0}
          swirl={0.1}
          tail={0.04}
          trail={0.2}
          wander={0.02}
          depth={0.4}
          targets="a, button, [data-swarm-target], [role='button'], input, textarea"
          clickEffect="pulse"
          hideCursor={false}
          intro={true}
        />

        <main className="relative z-10">
          <HeroSection />
          <ProjectsSection />
          <SkillsAndAchievementsSection />
        </main>

        <ContactFooter />
      </div>
    </PortfolioProvider>
  );
}
