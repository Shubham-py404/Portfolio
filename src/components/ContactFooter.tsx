import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Copy, Check, Linkedin, Github } from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon';
import { GmailIcon } from './GmailIcon';
import { SectionDivider } from './SectionDivider';

export const ContactFooter: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { profile } = portfolio;

  const [gmailCopied, setGmailCopied] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const emailText = profile.email || 'bansalshubham0105@gmail.com';

  const handleCopyGmail = async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      setGmailCopied(true);
      setTimeout(() => setGmailCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImgError = (key: string) => {
    setImgErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-canvas py-20 px-6 sm:px-10 border-t border-line"
    >
      <div className="relative z-10 w-full mx-auto max-w-[1280px]">
        
        {/* Choreographed Section Header */}
        <SectionDivider
          number="04"
          title="TRANSMISSION & CONTACT"
          tag="DISPATCH // READY"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">

          {/* Left: Heading & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-strong tracking-[-0.03em] mb-4">
              Let's build <span className="font-serif italic font-normal text-muted">something enduring.</span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed max-w-lg mb-6">
              Have an open engineering opportunity, a systems architecture challenge, or a collaboration in mind? Feel free to connect across any channel or copy my email directly.
            </p>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hud-label text-xs text-muted tracking-widest">
                RESPONSE TIME: &lt; 24 HOURS
              </span>
            </div>
          </div>

          {/* Right: Blueprint Social Channels Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] p-6 bg-surface border border-line">
              {/* CAD Crosshairs */}
              <span className="tick tick-tl -top-[5px] -left-[5px]" />
              <span className="tick tick-tr -top-[5px] -right-[5px]" />
              <span className="tick tick-bl -bottom-[5px] -left-[5px]" />
              <span className="tick tick-br -bottom-[5px] -right-[5px]" />

              <div className="hud-label text-[10px] text-muted mb-4 pb-2 border-b border-line flex items-center justify-between">
                <span>COMMUNICATION CHANNELS</span>
                <span className="text-accent-ink">4 AVAILABLE</span>
              </div>

              <div className="flex flex-col gap-2.5">

                {/* Gmail — click to copy with tactile feedback */}
                <button
                  type="button"
                  data-swarm-target="true"
                  onClick={handleCopyGmail}
                  className="invert-block group relative flex items-center justify-between w-full p-3 border border-line bg-canvas text-left cursor-pointer"
                  aria-label={`Copy ${emailText} to clipboard`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center p-1.5 bg-sunken border border-line">
                      <GmailIcon className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-200" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-semibold text-ink">
                          Gmail
                        </span>
                        <span className="font-mono text-[10px] text-accent-ink">
                          {gmailCopied ? 'COPIED!' : 'CLICK TO COPY'}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-muted truncate">
                        {emailText}
                      </div>
                    </div>
                  </div>
                  <div className="p-1 text-muted">
                    {gmailCopied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {/* LinkedIn */}
                <a
                  data-swarm-target="true"
                  className="invert-block group flex items-center justify-between p-3 border border-line bg-canvas text-left cursor-pointer"
                  href="https://www.linkedin.com/in/shubham-bansal404"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center p-1.5 bg-sunken border border-line">
                      <Linkedin className="w-4 h-4 text-accent-ink" />
                    </div>
                    <div className="truncate">
                      <div className="font-sans text-xs font-semibold text-ink">
                        LinkedIn
                      </div>
                      <div className="font-mono text-[11px] text-muted">
                        shubham-bansal404
                      </div>
                    </div>
                  </div>
                  <span className="hud-label text-[9px] text-muted group-hover:text-ink">
                    OPEN &rarr;
                  </span>
                </a>

                {/* GitHub */}
                <a
                  data-swarm-target="true"
                  className="invert-block group flex items-center justify-between p-3 border border-line bg-canvas text-left cursor-pointer"
                  href="https://github.com/Shubham-py404"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center p-1.5 bg-sunken border border-line">
                      <Github className="w-4 h-4 text-ink" />
                    </div>
                    <div className="truncate">
                      <div className="font-sans text-xs font-semibold text-ink">
                        GitHub
                      </div>
                      <div className="font-mono text-[11px] text-muted">
                        Shubham-py404
                      </div>
                    </div>
                  </div>
                  <span className="hud-label text-[9px] text-muted group-hover:text-ink">
                    OPEN &rarr;
                  </span>
                </a>

                {/* LeetCode */}
                <a
                  data-swarm-target="true"
                  className="invert-block group flex items-center justify-between p-3 border border-line bg-canvas text-left cursor-pointer"
                  href="https://leetcode.com/u/Shubham-py404"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center p-1.5 bg-sunken border border-line">
                      <LeetCodeIcon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-sans text-xs font-semibold text-ink">
                        LeetCode
                      </div>
                      <div className="font-mono text-[11px] text-muted">
                        Shubham-py404
                      </div>
                    </div>
                  </div>
                  <span className="hud-label text-[9px] text-muted group-hover:text-ink">
                    OPEN &rarr;
                  </span>
                </a>

              </div>
            </div>
          </div>

        </div>

        {/* Technical HUD Bottom Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-20 pt-6 border-t border-line text-muted font-mono text-xs gap-4 select-none">
          <div className="flex items-center gap-3">
            <span className="hud-label text-[10px] text-accent-ink">
              © {new Date().getFullYear()} {profile.name || 'Shubham Bansal'}
            </span>
            <span className="text-line-strong">|</span>
            <span className="hud-label text-[10px] text-faint">
              BUILT WITH PRECISION &amp; CARE
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="invert-block flex items-center gap-2 px-3 py-1.5 border border-line bg-surface text-ink text-xs font-mono cursor-pointer"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
