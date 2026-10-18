import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsAndAchievementsSection } from './components/SkillsAndAchievementsSection';
import { ContactFooter } from './components/ContactFooter';
import SwarmCursor from './components/SwarmCursor/SwarmCursor';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black relative">
        {/* Global Interactive Animated Swarm Cursor */}
        <SwarmCursor
          count={500}
          size={2.2}
          spread={75}
          swirl={0.6}
          speed={2.4}
          tail={0.15}
          trail={0.9}
          wander={0.3}
          color="#ffffff"
          accentColor="#ffffff"
          clickEffect="burst"
          idle="roam"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        />

        {/* Main Continuous Long Scroll Single Page */}
        <main>
          {/* Hero Section: Profile Photo, Name, Occupation */}
          <HeroSection />

          {/* Scroll a little: Projects with animated moving cards showing videos */}
          <ProjectsSection />

          {/* Scroll more: Skills, Achievements & Education */}
          <SkillsAndAchievementsSection />
        </main>

        {/* Footer: Connect & Links */}
        <ContactFooter />
      </div>
    </PortfolioProvider>
  );
}
