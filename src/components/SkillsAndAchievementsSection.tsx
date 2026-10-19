import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, Code, Palette, Server, Database, Sparkles, GraduationCap } from 'lucide-react';
import { TrainMarquee } from './TrainMarquee';
import { SectionDivider } from './SectionDivider';

export const SkillsAndAchievementsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { skills, achievements, education } = portfolio;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code className="w-3.5 h-3.5 text-accent-ink" />;
      case 'Backend':
        return <Server className="w-3.5 h-3.5 text-accent-ink" />;
      case 'Design & UX':
        return <Palette className="w-3.5 h-3.5 text-accent-ink" />;
      case 'Tools & Cloud':
        return <Database className="w-3.5 h-3.5 text-accent-ink" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-accent-ink" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative bg-canvas py-20 px-6 sm:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-[1280px]">

        {/* ── SKILLS MATRIX SECTION ── */}
        <div className="mb-24">
          <SectionDivider
            number="02"
            title="TECHNICAL MATRIX & COMPETENCIES"
            tag="RUNTIME // VERIFIED"
          />

          <div className="mb-8">
            <h3 className="font-display text-2xl sm:text-3xl text-ink-strong tracking-[-0.02em]">
              Core Disciplines <span className="font-serif italic font-normal text-muted">&amp; Stack.</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1 font-mono">
              [ CONTINUOUS STREAM · HOVER TO INSPECT ]
            </p>
          </div>

          {/* Endless loop single-row train */}
          <TrainMarquee direction="left-to-right" speedSeconds={32}>
            {skills.map((skill) => (
              <div
                key={skill.id}
                data-swarm-target="true"
                className="relative flex items-center justify-between shrink-0 min-w-[240px] sm:min-w-[280px] p-4 bg-surface border border-line hover:border-line-strong transition-all duration-200 group select-none"
              >
                {/* CAD Ticks */}
                <span className="tick tick-tl -top-[5px] -left-[5px]" />
                <span className="tick tick-br -bottom-[5px] -right-[5px]" />

                <div className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-sunken border border-line">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-ink text-sm leading-tight">
                      {skill.name}
                    </h4>
                    <span className="hud-label text-[10px] text-muted">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span className="hud-label text-[9px] text-faint group-hover:text-accent-ink transition-colors">
                  OK
                </span>
              </div>
            ))}
          </TrainMarquee>
        </div>

        {/* ── ACHIEVEMENTS & CERTIFICATES ── */}
        <div className="mb-24">
          <SectionDivider
            number="03"
            title="RECOGNITION & CERTIFICATIONS"
            tag="CREDENTIALS // AUDITED"
          />

          <div className="mb-8">
            <h3 className="font-display text-2xl sm:text-3xl text-ink-strong tracking-[-0.02em]">
              Milestones <span className="font-serif italic font-normal text-muted">&amp; Honors.</span>
            </h3>
          </div>

          {/* Endless loop single-row train */}
          <TrainMarquee direction="right-to-left" speedSeconds={40}>
            {achievements.map((ach) => (
              <div
                key={ach.id}
                data-swarm-target="true"
                className="relative flex flex-col justify-between shrink-0 min-w-[300px] sm:min-w-[360px] max-w-[380px] p-6 bg-surface border border-line hover:border-line-strong transition-all duration-200 group"
              >
                {/* CAD Ticks */}
                <span className="tick tick-tl -top-[5px] -left-[5px]" />
                <span className="tick tick-tr -top-[5px] -right-[5px]" />
                <span className="tick tick-bl -bottom-[5px] -left-[5px]" />
                <span className="tick tick-br -bottom-[5px] -right-[5px]" />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center p-1 bg-sunken border border-line">
                        {ach.badgeUrl ? (
                          <img src={ach.badgeUrl} alt={ach.issuer} className="w-full h-full object-cover grayscale" />
                        ) : (
                          <Award className="w-4 h-4 text-accent-ink" />
                        )}
                      </div>
                      <div>
                        <span className="hud-label text-[10px] text-muted block">
                          {ach.issuer}
                        </span>
                        <span className="font-mono text-[10px] text-faint">
                          {ach.issueDate}
                        </span>
                      </div>
                    </div>

                    <span className="hud-label text-[9px] text-accent-ink px-1.5 py-0.5 border border-line bg-canvas">
                      HONOR
                    </span>
                  </div>

                  <h4 className="font-display text-base text-ink-strong mb-2 leading-snug">
                    {ach.title}
                  </h4>

                  <p className="font-sans text-xs text-muted leading-relaxed mb-6 line-clamp-3">
                    {ach.description}
                  </p>
                </div>

                {ach.credentialUrl && (
                  <div className="pt-3 border-t border-line">
                    <a
                      href={ach.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="invert-block inline-flex items-center gap-2 px-2.5 py-1 border border-line bg-canvas text-ink font-mono text-[10px] tracking-wider"
                    >
                      <span>VERIFY CREDENTIAL</span>
                      <ExternalLink className="w-3 h-3 text-accent-ink" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </TrainMarquee>
        </div>

        {/* ── ACADEMIC PEDIGREE / EDUCATION ── */}
        {education && education.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="hud-label text-xs text-muted tracking-widest block mb-2">
                03.B // ACADEMIC RECORD
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-ink-strong">
                Education <span className="font-serif italic font-normal text-muted">&amp; Foundations.</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  data-swarm-target="true"
                  className="relative flex flex-col justify-between p-6 bg-surface border border-line hover:border-line-strong transition-all duration-200"
                >
                  <span className="tick tick-tl -top-[5px] -left-[5px]" />
                  <span className="tick tick-br -bottom-[5px] -right-[5px]" />

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center bg-sunken border border-line">
                        <GraduationCap className="w-4 h-4 text-accent-ink" />
                      </div>
                      <div>
                        <span className="hud-label text-[10px] text-muted block">
                          {edu.institution}
                        </span>
                        <span className="font-mono text-[10px] text-faint">
                          {edu.year}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-display text-base text-ink-strong mb-1">
                      {edu.degree}
                    </h4>
                    <p className="hud-label text-[10px] text-accent-ink mb-3">
                      {edu.field}
                    </p>
                    {edu.description && (
                      <p className="font-sans text-xs text-muted leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
