import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SectionDividerProps {
  number: string;
  title: string;
  tag?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  number,
  title,
  tag = 'SYS.OK',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const tickLeftRef = useRef<HTMLSpanElement>(null);
  const tickRightRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = containerRef.current;
    if (!el) return;

    let observer: IntersectionObserver;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set([tickLeftRef.current, tickRightRef.current], { opacity: 0, scale: 0.5 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline();

              tl.to(ruleRef.current, {
                scaleX: 1,
                duration: 0.85,
                ease: 'power3.out',
              })
                .to(
                  [tickLeftRef.current, tickRightRef.current],
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.out(2)',
                    stagger: 0.1,
                  },
                  '-=0.4'
                )
                .to(
                  eyebrowRef.current,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: 'power2.out',
                  },
                  '-=0.3'
                );

              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
    }, containerRef);

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full mb-12 sm:mb-16 select-none ${className}`}>
      {/* 1px Choreographed Horizontal Rule */}
      <div className="relative w-full h-[1px]">
        <div
          ref={ruleRef}
          className="absolute inset-0 bg-line-strong w-full h-[1px]"
        />

        {/* CAD Crosshairs at boundaries */}
        <span
          ref={tickLeftRef}
          className="tick -top-[5px] left-0"
          aria-hidden="true"
        />
        <span
          ref={tickRightRef}
          className="tick -top-[5px] right-0"
          aria-hidden="true"
        />
      </div>

      {/* Technical HUD Eyebrow Header */}
      <div
        ref={eyebrowRef}
        className="flex items-center justify-between pt-3 text-muted text-xs"
      >
        <div className="flex items-center gap-3">
          <span className="hud-label font-bold text-accent-ink tracking-[0.2em]">
            {number}
          </span>
          <span className="w-3 h-[1px] bg-line-strong" />
          <h2 className="hud-label text-ink font-semibold tracking-[0.16em]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-none bg-accent inline-block animate-pulse" />
          <span className="hud-label text-[10px] text-muted tracking-widest hidden sm:inline-block">
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
};
