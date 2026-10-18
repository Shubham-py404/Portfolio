import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Copy, Check, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon';
import { GmailIcon } from './GmailIcon';
import { MorphHeading } from './MorphHeading';

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
      className="py-24 px-4 sm:px-8 md:px-12 bg-[#04060A] text-zinc-100 border-t border-zinc-900 relative overflow-hidden selection:bg-cyan-500 selection:text-black"
    >
      {/* BEGIN: Ambient Background Layers */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 bg-grid-pattern opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 radial-ambient-glow" />
      {/* Subtle glowing gradient orbs for high-end lighting depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
      />
      {/* END: Ambient Background Layers */}

      {/* BEGIN: Contact & Profile Section Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto" data-purpose="portfolio-contact-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* BEGIN: Left Column (Heading & Bio) */}
          <section className="lg:col-span-7 flex flex-col justify-center" data-purpose="intro-info">
           

            <MorphHeading
              text="Let's Connect"
              className="text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight mb-4"
            />

            <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed font-light">
              Have an open opportunity, complex engineering problem, or collaboration in mind? Feel free to reach out across any platform or copy my email directly.
            </p>
          </section>
          {/* END: Left Column */}

          {/* BEGIN: Right Column (Square Glass Container with 4 Hyperlink Cards) */}
          <section className="lg:col-span-5 flex justify-center" data-purpose="socials-links-panel">
            {/* Outer Glassmorphism Card Frame */}
            <div className="w-full max-w-md p-5 sm:p-6 rounded-2xl bg-[#090D14]/90 border border-zinc-800/90 backdrop-blur-xl shadow-2xl relative overflow-hidden group/container">
              {/* Subtle top edge highlight line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent" />

              {/* Social Links Stack */}
              <div className="flex flex-col gap-3" role="list">
                {/* 1. LinkedIn Card */}
                <a
                  className="social-card group flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all duration-300"
                  data-purpose="social-link-linkedin"
                  href="https://www.linkedin.com/in/shubham-bansal404"
                  rel="noopener noreferrer"
                  role="listitem"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Squircle LinkedIn Logo */}
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-1 ring-zinc-800 group-hover:ring-[#0A66C2]/50 transition-all flex items-center justify-center bg-[#0077B5]/10">
                      {!imgErrors['linkedin'] ? (
                        <img
                          alt="LinkedIn Logo"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          src="https://lh3.googleusercontent.com/aida/AEtjO1Wmu2FHSxPCQUXxRaorqOarxdpg4DmCpbIo4tKnFIN2decG9rviYC7StYZfiYThq5ZQ0G-H4DsRHojvNB6_CxUme_yZnq-Ia78uD6iuwkIOB9W6SSYLa9Km-0L4x7l_BcE9HjK5e_VNWyZPQKS6ulzoyyZuCRWsahrAK4bLx0SBXWB2gaXmqqkquydc6mJr1GRE17aLDOqvYDoiIEPTkUdFEgzlY8ZeM-fb5Xho80IMnSRk27wDu-vExP8"
                          onError={() => handleImgError('linkedin')}
                        />
                      ) : (
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      )}
                    </div>
                    {/* Platform Text Info */}
                    <div className="truncate text-left">
                      <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#38bdf8] transition-colors leading-tight">
                        LinkedIn
                      </div>
                      <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 truncate">
                        shubham-bansal404
                      </div>
                    </div>
                  </div>
                  {/* External Link Action Icon */}
                  <div className="text-zinc-500 group-hover:text-[#38bdf8] p-1.5 flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 arrow-icon" strokeWidth={2.2} />
                  </div>
                </a>

                {/* 2. GitHub Card */}
                <a
                  className="social-card group flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-purple-500/50 hover:bg-purple-950/20 transition-all duration-300"
                  data-purpose="social-link-github"
                  href="https://github.com/Shubham-py404"
                  rel="noopener noreferrer"
                  role="listitem"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Squircle GitHub Logo */}
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-1 ring-zinc-800 group-hover:ring-purple-500/50 transition-all flex items-center justify-center bg-purple-900/10">
                      {!imgErrors['github'] ? (
                        <img
                          alt="GitHub Logo"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          src="https://lh3.googleusercontent.com/aida/AEtjO1UwDa4G1AK1MNy_Kd6XIH0kFdSiM_c_NgGAGraoLKzUelRoBVdFz5IkDEm8ymlo-cTcb3lI_Dh4b2ANyjj-n7x4TRbL615TTM9YN7o9d1XLbhcL5oJR0Z-MGcKh5hDaR2qPulo5aRhUQGxvWSq1SR6yCw_p8ptp78OM98KnefGPeHCiS2Z3cCNG7u6utnYA7MQgztkvSq5hDKrxxrQnf3jhljh5BQEYH79fBKJmu5OWDN1cUJtkJCj8aBQ"
                          onError={() => handleImgError('github')}
                        />
                      ) : (
                        <Github className="w-5 h-5 text-purple-300" />
                      )}
                    </div>
                    {/* Platform Text Info */}
                    <div className="truncate text-left">
                      <div className="text-sm font-semibold text-zinc-100 group-hover:text-purple-300 transition-colors leading-tight">
                        GitHub
                      </div>
                      <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 truncate">
                        Shubham-py404
                      </div>
                    </div>
                  </div>
                  {/* External Link Action Icon */}
                  <div className="text-zinc-500 group-hover:text-purple-300 p-1.5 flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 arrow-icon" strokeWidth={2.2} />
                  </div>
                </a>

                {/* 3. LeetCode Card */}
                <a
                  className="social-card group flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-amber-500/50 hover:bg-amber-950/20 transition-all duration-300"
                  data-purpose="social-link-leetcode"
                  href="https://leetcode.com/u/Shubham-py404"
                  rel="noopener noreferrer"
                  role="listitem"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Squircle LeetCode Logo */}
                    <div className="w-11 h-11 rounded-xl p-2 bg-zinc-950/90 border border-zinc-800 shadow-md ring-1 ring-zinc-800/80 group-hover:ring-amber-500/50 group-hover:border-amber-500/30 transition-all flex items-center justify-center flex-shrink-0">
                      <LeetCodeIcon className="w-full h-full transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    {/* Platform Text Info */}
                    <div className="truncate text-left">
                      <div className="text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors leading-tight">
                        LeetCode
                      </div>
                      <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 truncate">
                        Shubham-py404
                      </div>
                    </div>
                  </div>
                  {/* External Link Action Icon */}
                  <div className="text-zinc-500 group-hover:text-amber-400 p-1.5 flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 arrow-icon" strokeWidth={2.2} />
                  </div>
                </a>

                {/* 4. Gmail Card - Click to Copy Whole Component */}
                <button
                  type="button"
                  onClick={handleCopyGmail}
                  className="social-card group relative flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-rose-500/50 hover:bg-rose-950/20 transition-all duration-300 w-full text-left cursor-pointer active:scale-98"
                  data-purpose="social-link-gmail"
                  aria-label={`Copy ${emailText} to clipboard`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Squircle Gmail Logo */}
                    <div className="w-11 h-11 rounded-xl p-2.5 bg-zinc-950/90 border border-zinc-800 shadow-md ring-1 ring-zinc-800/80 group-hover:ring-rose-500/50 group-hover:border-rose-500/30 transition-all flex items-center justify-center flex-shrink-0">
                      <GmailIcon className="w-full h-full transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    {/* Platform Text Info */}
                    <div className="truncate text-left">
                      <div className="text-sm font-semibold text-zinc-100 group-hover:text-rose-400 transition-colors leading-tight flex items-center gap-2">
                        <span>Gmail</span>
                        <span className="text-[10px] font-mono font-normal uppercase tracking-wider text-zinc-500 group-hover:text-rose-300/80">
                          {gmailCopied ? 'Copied!' : 'Click to copy'}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 truncate">
                        {emailText}
                      </div>
                    </div>
                  </div>
                  {/* Action Icon: Copy / Check Feedback */}
                  <div className="text-zinc-500 group-hover:text-rose-400 p-1.5 flex-shrink-0 transition-colors">
                    {gmailCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 arrow-icon" strokeWidth={2} />
                    )}
                  </div>
                  {/* Tooltip Toast Feedback */}
                  <span
                    className={`copy-toast pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-rose-500 text-white text-xs font-mono font-semibold rounded shadow-lg transition-all duration-200 z-20 ${
                      gmailCopied ? 'opacity-100 -translate-y-1' : 'opacity-0'
                    }`}
                  >
                    Email Copied!
                  </span>
                </button>
              </div>
            </div>
          </section>
          {/* END: Right Column */}

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-20 pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {profile.name || 'Shubham Bansal'}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
      {/* END: Contact & Profile Section Container */}
    </footer>
  );
};
