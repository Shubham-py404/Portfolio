import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface ScrambleHeadingProps {
  text?: string;
  className?: string;
  chars?: string;
  duration?: number; // total scramble duration in ms
  loop?: boolean;
  loopInterval?: number;
  showCursor?: boolean;
  cursorColor?: string;
  triggerOnHover?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'span';
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const MorphHeading: React.FC<ScrambleHeadingProps> = ({
  text = "Let's Connect",
  className = "text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight",
  chars = DEFAULT_CHARS,
  duration = 1600,
  loop = true,
  loopInterval = 5000,
  showCursor = true,
  cursorColor = 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_20px_rgba(255,255,255,0.5)]',
  triggerOnHover = true,
  as: Component = 'h2',
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
          }, loopInterval);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  }, [text, chars, duration, loop, loopInterval]);

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
      { threshold: 0.15 }
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

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={startScramble}
      onMouseEnter={handleMouseEnter}
      data-swarm-target="true"
      className="relative inline-block cursor-pointer select-none group"
      title="Click or hover to replay scramble effect"
    >
      {/* Ghost text for layout stability (prevents layout shifts during scrambling) */}
      <Component
        className={`invisible select-none opacity-0 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {text}
        {showCursor && (
          <span className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.8em] ml-1.5" />
        )}
      </Component>

      {/* Active Scramble Text with Leading Cursor */}
      <Component
        className={`absolute inset-0 flex items-center select-none ${className}`}
        aria-label={text}
      >
        <span className="tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.45)] transition-all duration-300">
          {displayText}
        </span>

        {/* Leading Cursor: solid during scramble, pulsing/blinking when resolved */}
        {showCursor && (
          <span
            className={`inline-block w-[3.5px] sm:w-[4.5px] h-[0.82em] ml-1.5 align-middle rounded-[1px] ${cursorColor} ${
              isBlinking ? 'animate-morph-cursor' : 'opacity-100'
            }`}
            aria-hidden="true"
          />
        )}
      </Component>
    </div>
  );
};

export default MorphHeading;
