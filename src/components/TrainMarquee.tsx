import React from 'react';

interface TrainMarqueeProps {
  children: React.ReactNode;
  speedSeconds?: number; // duration of one full cycle in seconds (e.g. 35s for slow smooth train glide)
  direction?: 'left-to-right' | 'right-to-left';
  className?: string;
  pauseOnHover?: boolean;
}

export const TrainMarquee: React.FC<TrainMarqueeProps> = ({
  children,
  speedSeconds = 35,
  direction = 'left-to-right',
  className = '',
  pauseOnHover = true,
}) => {
  const animClass = direction === 'left-to-right' ? 'animate-train-ltr' : 'animate-train-rtl';

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Edge gradient fade masks for clean train entrance/exit */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10"
        style={{
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10"
        style={{
          background: 'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Overflow container with completely hidden scrollbars */}
      <div
        className="overflow-x-auto scrollbar-none py-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          className={`${animClass} py-1`}
          style={{
            animationDuration: `${speedSeconds}s`,
            animationPlayState: pauseOnHover ? undefined : 'running',
          }}
        >
          {/* Set 1 */}
          <div className="flex gap-4 shrink-0 pr-4">
            {children}
          </div>
          {/* Set 2 (Identical for seamless infinite wrap) */}
          <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainMarquee;
