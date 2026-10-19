import React, { useEffect, useState, useRef } from 'react';

// Single rolling mechanical digit reel
const DigitReel: React.FC<{ digit: string }> = ({ digit }) => {
  const num = parseInt(digit, 10);
  const translateY = isNaN(num) ? 0 : -num * 100;

  return (
    <div className="relative h-[1em] w-[0.62em] overflow-hidden leading-none select-none">
      <div
        className="flex flex-col transition-transform duration-250 ease-[cubic-bezier(0.2,0.9,0.2,1)]"
        style={{ transform: `translateY(${translateY}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex h-[1em] items-center justify-center font-mono">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

export const CadRuler: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = Math.round(window.scrollY);
          setScrollY(y);

          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
          setScrollProgress(progress);

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format scroll position as 4 digits (e.g. "0420")
  const formattedY = Math.min(9999, scrollY).toString().padStart(4, '0');
  const digits = formattedY.split('');

  return (
    <aside
      aria-hidden="true"
      className="fixed right-0 top-0 bottom-0 z-40 hidden xl:flex flex-col justify-between pointer-events-none select-none w-12 border-l border-line bg-canvas/30 backdrop-blur-[2px]"
    >
      {/* Top Coordinate Header */}
      <div className="p-2 border-b border-line flex flex-col items-center gap-1 text-[9px] font-mono text-muted">
        <span className="tracking-widest">Y-POS</span>
        <div className="flex items-center text-ink-strong font-medium text-[11px]">
          {digits.map((d) => (
            <div className='flex items-center text-ink-strong font-medium text-[11px]'>
              {d}
            </div>
          ))}
          <span className="text-[9px] text-muted ml-0.5">px</span>
        </div>
      </div>

      {/* Vertical Drafting Scale Rail with Tick Hash Marks */}
      <div className="relative flex-1 w-full overflow-hidden flex flex-col justify-around py-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex items-center justify-end w-full pr-1.5">
            <span
              className={`block bg-line-strong transition-opacity ${
                i % 4 === 0 ? 'w-3 h-[1px] opacity-80' : 'w-1.5 h-[1px] opacity-35'
              }`}
            />
          </div>
        ))}

        {/* Dynamic Scrub Cursor / Thumb Indicator */}
        <div
          className="absolute right-0 w-full flex items-center justify-end pr-0.5 transition-transform duration-75 pointer-events-auto"
          style={{
            top: `${scrollProgress * 92 + 4}%`,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="flex items-center gap-1 bg-invert-bg text-invert-fg px-1.5 py-0.5 text-[8px] font-mono tracking-wider shadow-sm">
            <span>{Math.round(scrollProgress * 100)}%</span>
            <span className="w-1.5 h-1.5 bg-accent" />
          </div>
        </div>
      </div>

    
    </aside>
  );
};
