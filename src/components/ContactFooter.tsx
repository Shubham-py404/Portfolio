import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Mail, MapPin, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const { portfolio, submitContactForm } = usePortfolio();
  const { profile } = portfolio;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const success = await submitContactForm(form);
    setIsSubmitting(false);

    if (success) {
      setIsSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 6000);
    } else {
      setErrorMsg('Failed to transmit message. Please try again or email directly.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-24 px-6 bg-black text-white border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Contact Info & Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                04 // Get In Touch
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
                Let's Build Something Exceptional.
              </h2>
              <p className="text-sm font-light text-neutral-400 leading-relaxed mb-8 max-w-md">
                Available for high-impact architecture, creative tech advisory, design system engineering, and full-stack technical leadership.
              </p>

              <div className="space-y-4 font-mono text-xs text-neutral-300 mb-8">
                {profile.email && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Direct Email</span>
                      <a href={`mailto:${profile.email}`} className="text-sm text-white hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile.location && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Location</span>
                      <span className="text-sm text-white">{profile.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4 pt-6 border-t border-neutral-900">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.twitterUrl && (
                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-neutral-950 p-8 sm:p-10 rounded-2xl border border-neutral-800 shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-6">Send a Transmission</h3>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl bg-neutral-900 border border-neutral-700 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-white text-black mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-white">Message Transmitted</h4>
                <p className="text-xs font-mono text-neutral-400">
                  Thank you! Your message has been routed directly to my inbox and synced with the admin message hub.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="text-xs font-mono text-rose-400 bg-rose-950/50 border border-rose-800/80 p-3 rounded">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-white rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-white rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Subject / Project Context
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="New Project Inquiry / Advisory"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-white rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project, timeline, and goals..."
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-white rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Monochromatic Portfolio Architecture.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
