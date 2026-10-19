import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { gsap } from 'gsap';
import my_img from '../../assets/images/img-shubham.jpeg';
import { Mail, Github, Linkedin, Twitter, ArrowDown } from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon';

export const HeroSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { profile } = portfolio;

  const sectionRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const occupationRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      [hudRef, photoRef, nameRef, occupationRef, bioRef, linksRef].forEach(ref => {
        if (ref.current) ref.current.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([hudRef.current, photoRef.current, nameRef.current, occupationRef.current, bioRef.current, linksRef.current], {
        opacity: 0,
        y: 20,
      });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(hudRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
      .to(photoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .to(occupationRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.35')
      .to(bioRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3')
      .to(linksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 py-20 bg-canvas overflow-hidden"
    >
      {/* Subtle Blueprint Grid Pattern in Background */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-scanline pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full flex flex-col items-center text-center max-w-2xl mx-auto">
        
        {/* HUD Telemetry Top Pill */}
        <div
          ref={hudRef}
          className="flex items-center gap-2 px-3 py-1 mb-8 border border-line bg-surface/80 backdrop-blur-sm select-none"
        >
          <span className="w-1.5 h-1.5 bg-accent" />
          <span className="hud-label text-[10px] text-muted tracking-[0.18em]">
            SYSTEM.ID // SHUBHAM BANSAL
          </span>
          <span className="text-line-strong text-xs">|</span>
          <span className="hud-label text-[10px] text-accent-ink tracking-[0.15em]">
            ACTIVE
          </span>
        </div>

        {/* Blueprint-Framed Avatar with CAD Crosshair Ticks */}
        <div ref={photoRef} data-swarm-target="true" className="relative mb-8">
          <div className="relative p-1 border border-line bg-surface/60">
            {/* CAD Corner Ticks */}
            <span className="tick tick-tl -top-[5px] -left-[5px]" />
            <span className="tick tick-tr -top-[5px] -right-[5px]" />
            <span className="tick tick-bl -bottom-[5px] -left-[5px]" />
            <span className="tick tick-br -bottom-[5px] -right-[5px]" />

            <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden bg-sunken">
              <img
                src={my_img}
                alt={profile.name}
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Name — Archivo 118% Display Typography */}
        <h1
          ref={nameRef}
          data-swarm-target="true"
          className="font-display text-4xl sm:text-5xl md:text-6xl text-ink-strong tracking-[-0.03em] mb-4 select-none"
        >
          {profile.name || "Shubham Bansal"}
        </h1>

        {/* Occupation — Technical Sans + Instrument Serif Italic Accent */}
        <div
          ref={occupationRef}
          className="flex items-center justify-center gap-1.5 text-base sm:text-lg mb-6 text-muted select-none"
        >
          <span className="font-mono text-xs text-accent-ink mr-1">&gt;</span>
          <span className="font-sans font-medium text-ink">
            Computer Science Student &amp;
          </span>
          <span className="font-serif italic text-ink-strong text-lg sm:text-xl">
            AI Developer.
          </span>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="text-sm sm:text-base leading-relaxed text-muted max-w-lg mb-10 font-sans"
        >
          {profile.bio || "Dynamic Computer Science student with strong Data Structures & Algorithms expertise. Proficient in C/C++, Java, Python, and SQL, leveraging AI tools to accelerate development and build innovative applications."}
        </p>

        {/* Social Links — Invert-Block Tactile Buttons */}
        <div
          ref={linksRef}
          className="flex flex-wrap items-center justify-center gap-2 select-none"
        >
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              data-swarm-target="true"
              className="invert-block flex items-center gap-2 px-3 py-1.5 border border-line bg-surface text-ink text-xs font-mono tracking-wider"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5 text-accent-ink" />
              <span>{profile.email}</span>
            </a>
          )}

          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-swarm-target="true"
              className="invert-block flex items-center gap-1.5 px-3 py-1.5 border border-line bg-surface text-ink text-xs font-mono tracking-wider"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>
          )}

          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              data-swarm-target="true"
              className="invert-block flex items-center gap-1.5 px-3 py-1.5 border border-line bg-surface text-ink text-xs font-mono tracking-wider"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>
          )}

          {profile.leetcodeUrl && (
            <a
              href={profile.leetcodeUrl}
              target="_blank"
              rel="noreferrer"
              data-swarm-target="true"
              className="invert-block flex items-center gap-1.5 px-3 py-1.5 border border-line bg-surface text-ink text-xs font-mono tracking-wider"
              title="LeetCode"
            >
              <LeetCodeIcon className="w-3.5 h-3.5" />
              <span>LEETCODE</span>
            </a>
          )}

          {profile.twitterUrl && (
            <a
              href={profile.twitterUrl}
              target="_blank"
              rel="noreferrer"
              data-swarm-target="true"
              className="invert-block flex items-center gap-1.5 px-3 py-1.5 border border-line bg-surface text-ink text-xs font-mono tracking-wider"
              title="X (Twitter)"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X</span>
            </a>
          )}
        </div>

      </div>

      {/* Subtle Scroll Prompt at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="hud-label text-[9px] text-muted tracking-[0.2em]">SCROLL</span>
        <ArrowDown className="w-3 h-3 text-muted animate-bounce" />
      </div>
    </section>
  );
};
