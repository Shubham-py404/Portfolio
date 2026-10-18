import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { TopContactHeader } from './components/TopContactHeader';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsAndAchievementsSection } from './components/SkillsAndAchievementsSection';
import { ContactFooter } from './components/ContactFooter';
import SwarmCursor from './components/SwarmCursor/SwarmCursor';


export default function App() {
  return (
    <PortfolioProvider>
      <SwarmCursor
        count={600}
        size={2.4}
        spread={85}
        swirl={0.55}
        color="#ffffff"
        accentColor="#a0a0a0"
        clickEffect="burst"
        idle="roam"
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}
      />
      <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
        {/* Top Header: Contact on top corner */}
        <TopContactHeader />

        {/* Main Continuous Long Scroll Single Page */}
        <main>
          {/* Hero Section: Profile Photo, Name, Occupation */}
          <HeroSection />

          {/* Scroll a little: Projects with animated moving cards showing videos */}
          <ProjectsSection />

          {/* Scroll more: Skills & Achievements with interactive progress bars */}
          <SkillsAndAchievementsSection />
        </main>

        {/* Footer: Contact Form */}
        <ContactFooter />
      </div>
    </PortfolioProvider>
  );
}
