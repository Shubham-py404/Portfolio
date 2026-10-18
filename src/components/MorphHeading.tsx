import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleHeadingProps {
  text?: string;
  className?: string;
  chars?: string;
  duration?: number; // total scramble duration in ms
  loop?: boolean;
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const MorphHeading: React.FC<ScrambleHeadingProps> = ({
  text = "Let's Connect",
  className = "text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight",
  chars = DEFAULT_CHARS,
  duration = 1800,
  loop = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startScramble = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsBlinking(false);
    const startTime = performance.now();
    const length = text.length;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Characters resolved from left to right over time
      const resolvedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          // Dynamic scramble from character set
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        setIsBlinking(true);

        if (loop) {
          timeoutRef.current = setTimeout(() => {
            startScramble();
          }, 4500);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  }, [text, chars, duration, loop]);

  // Trigger animation when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      setIsBlinking(true);
      return;
    }

    startScramble();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inView, startScramble, text]);

  return (
    <div
      ref={containerRef}
      onClick={startScramble}
      className="relative inline-block cursor-pointer select-none group"
      title="Click to replay scramble effect"
    >
      {/* Ghost text for layout stability (prevents layout shifts during scrambling) */}
      <h2
        className={`invisible select-none opacity-0 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {text}
        <span className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.8em] ml-1.5" />
      </h2>

      {/* Active Scramble Text with Leading Cursor */}
      <h2
        className={`absolute inset-0 flex items-center select-none ${className}`}
        aria-label={text}
      >
        <span className="tracking-tight text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]">
          {displayText}
        </span>

        {/* Leading Cursor: solid during scramble, pulsing/blinking when resolved */}
        <span
          className={`inline-block w-[3.5px] sm:w-[4.5px] h-[0.82em] ml-1.5 align-middle bg-cyan-400 rounded-[1px] shadow-[0_0_12px_#38bdf8,0_0_24px_rgba(56,189,248,0.85)] ${
            isBlinking ? 'animate-morph-cursor' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      </h2>
    </div>
  );
};

export default MorphHeading;
