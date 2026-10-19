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

  const cursorColor = currentTheme === 'dark' ? '#f2f1ee' : '#101014';
  const cursorAccent = '#2d81ff';

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen font-sans antialiased bg-canvas text-ink selection:bg-accent selection:text-white">

        {/* Top-Right Floating Animated Theme Toggle */}
        <ThemeToggle />

        {/* Right-Side CAD Elevation Ruler */}
        <CadRuler />

        {/* Dynamic Interactive Cursor Animation */}
        <SwarmCursor
          className="swarm-fixed-cursor"
          count={450}
          size={2.6}
          shape="dot"
          color={cursorColor}
          accentColor={cursorAccent}
          spread={70}
          speed={3.2}
          swirl={0.6}
          tail={0.2}
          trail={0.45}
          wander={0.25}
          depth={0.7}
          targets="a, button, [data-swarm-target], [role='button'], input, textarea"
          clickEffect="burst"
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
