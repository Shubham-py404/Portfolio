import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Award, ExternalLink, CheckCircle2, Shield, Code, Palette, Server, Database, Sparkles, Layout } from 'lucide-react';

export const SkillsAndAchievementsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { skills, achievements } = portfolio;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Design & UX', 'Tools & Cloud'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code className="w-4 h-4 text-white" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-white" />;
      case 'Design & UX':
        return <Palette className="w-4 h-4 text-white" />;
      case 'Tools & Cloud':
        return <Database className="w-4 h-4 text-white" />;
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-6 bg-black text-white border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* SKILLS SECTION WITH INTERACTIVE PROGRESS BARS */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                02 // Technical Proficiency & Stack
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
                Skills & Experience
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-white text-black border-white font-medium shadow-sm'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-neutral-600 transition-all duration-300 group flex items-center justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 shrink-0">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white group-hover:text-neutral-200 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS & CERTIFICATES SECTION */}
        <div>
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              03 // Verified Credentials & Honors
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Achievements & Certificates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-neutral-500 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center p-1 overflow-hidden">
                        {ach.badgeUrl ? (
                          <img src={ach.badgeUrl} alt={ach.issuer} className="w-full h-full object-cover rounded grayscale" />
                        ) : (
                          <Award className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-400 block">{ach.issuer}</span>
                        <span className="text-[10px] font-mono text-neutral-500">{ach.issueDate}</span>
                      </div>
                    </div>
                    
                    <span className="flex items-center text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2 leading-snug group-hover:text-neutral-200">
                    {ach.title}
                  </h3>

                  <p className="text-xs font-light text-neutral-400 leading-relaxed mb-6">
                    {ach.description}
                  </p>
                </div>

                {ach.credentialUrl && (
                  <div className="pt-4 border-t border-neutral-900">
                    <a
                      href={ach.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
