import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, MediaItem } from '../types';
import { AnimatePresence, motion } from 'motion/react';
import play_button from '../../assets/play-button.svg';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

import textToImageImg from '../../assets/text-to-image/image.png';
import jansevaImg1 from '../../assets/janseva/image.png';
import jansevaImg2 from '../../assets/janseva/img2.png';

const ASSET_MAP: Record<string, string> = {
  'local:text-to-image-1': textToImageImg,
  'local:janseva-1': jansevaImg1,
  'local:janseva-2': jansevaImg2,
};

const resolveMediaUrl = (url?: string): string => {
  if (!url) return '';
  return ASSET_MAP[url] || url;
};

// Single Blueprint-Styled Project Card
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpenModal: (project: Project, mediaItem?: MediaItem) => void;
}> = ({ project, index, onOpenModal }) => {
  const mediaList: MediaItem[] = React.useMemo(() => {
    if (project.media && project.media.length > 0) {
      return project.media;
    }
    if (project.videoUrl) {
      return [
        {
          type: 'video',
          url: project.videoUrl,
          title: project.title,
          isIframe: project.videoUrl.includes('linkedin.com/embed'),
        },
      ];
    }
    return [
      {
        type: 'image',
        url: project.thumbnail,
        title: project.title,
      },
    ];
  }, [project]);

  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const totalMedia = mediaList.length;
  const currentMedia = mediaList[activeMediaIdx] || mediaList[0];

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaIdx((prev) => (prev > 0 ? prev - 1 : totalMedia - 1));
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaIdx((prev) => (prev < totalMedia - 1 ? prev + 1 : 0));
  };

  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div
      data-swarm-target="true"
      className="relative shrink-0 min-w-[320px] sm:min-w-[420px] max-w-[440px] snap-start flex flex-col justify-between border border-line bg-surface hover:border-line-strong transition-all duration-300 group"
    >
      {/* CAD Crosshair Ticks at Card Corners */}
      <span className="tick tick-tl -top-[5px] -left-[5px]" aria-hidden="true" />
      <span className="tick tick-tr -top-[5px] -right-[5px]" aria-hidden="true" />
      <span className="tick tick-bl -bottom-[5px] -left-[5px]" aria-hidden="true" />
      <span className="tick tick-br -bottom-[5px] -right-[5px]" aria-hidden="true" />

      <div>
        {/* Card Header Telemetry */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-canvas/60 text-muted select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span className="hud-label text-[10px] tracking-widest text-ink">
              MOD // {formattedIndex}
            </span>
          </div>

          <span className="hud-label text-[10px] text-faint tracking-widest">
            {project.tags[0] || 'DEV'}
          </span>
        </div>

        {/* Media Container */}
        <div className="relative aspect-video overflow-hidden bg-sunken border-b border-line">
          {/* Media Counter */}
          {totalMedia > 1 ? (
            <div className="absolute top-2.5 right-2.5 z-30 flex items-center bg-canvas/90 backdrop-blur-sm border border-line px-1.5 py-0.5 select-none text-[10px] font-mono text-ink">
              <button
                type="button"
                onClick={handlePrevMedia}
                className="w-4 h-4 flex items-center justify-center hover:text-accent cursor-pointer"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>

              <span className="px-1 text-muted">
                {activeMediaIdx + 1}/{totalMedia}
              </span>

              <button
                type="button"
                onClick={handleNextMedia}
                className="w-4 h-4 flex items-center justify-center hover:text-accent cursor-pointer"
                aria-label="Next media"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="absolute top-2.5 right-2.5 z-30 px-2 py-0.5 bg-canvas/90 backdrop-blur-sm border border-line text-[10px] font-mono text-muted select-none">
              01/01
            </div>
          )}

          {/* Active Media */}
          {currentMedia.type === 'video' ? (
            <div
              className="relative w-full h-full cursor-pointer overflow-hidden group/media"
              onClick={() => onOpenModal(project, currentMedia)}
            >
              {currentMedia.isIframe || currentMedia.url.includes('linkedin.com/embed') ? (
                <iframe
                  src={currentMedia.url}
                  className="w-full h-full border-0 pointer-events-none"
                  tabIndex={-1}
                  title={currentMedia.title || project.title}
                />
              ) : (
                <video
                  src={currentMedia.url}
                  poster={resolveMediaUrl(project.thumbnail)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover grayscale contrast-105 group-hover/media:grayscale-0 transition-all duration-300"
                />
              )}
              <div className="absolute inset-0 bg-ink/20 group-hover/media:bg-transparent flex items-center justify-center transition-colors duration-200">
                <div className="w-12 h-12 flex items-center justify-center bg-canvas/80 border border-line shadow-sm">
                  <img src={play_button} alt="Play video" className="w-5 h-5 translate-x-0.5 object-contain" />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative w-full h-full cursor-pointer overflow-hidden group/media"
              onClick={() => onOpenModal(project, currentMedia)}
            >
              <img
                src={resolveMediaUrl(currentMedia.url)}
                alt={currentMedia.title || project.title}
                className="w-full h-full object-cover grayscale contrast-105 group-hover/media:grayscale-0 transition-all duration-300"
              />
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="font-display text-lg text-ink-strong mb-2 leading-tight">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3 mb-6 font-sans">
            {project.description}
          </p>

          {/* Tags — Tactile Monospace Chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="invert-block px-2 py-0.5 border border-line bg-canvas text-muted text-[10px] font-mono tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Action Bar */}
      <div className="px-6 pb-6 pt-0 flex items-center gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="invert-block inline-flex items-center gap-1.5 px-3 py-1.5 border border-line bg-canvas text-ink text-xs font-mono font-medium tracking-wider"
          >
            <span>LIVE DEMO</span>
            <ExternalLink className="w-3 h-3 text-accent-ink" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="invert-block inline-flex items-center gap-1.5 px-3 py-1.5 border border-line bg-canvas text-ink text-xs font-mono tracking-wider"
          >
            <Github className="w-3 h-3" />
            <span>CODE</span>
          </a>
        )}
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { projects } = portfolio;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalMedia, setModalMedia] = useState<MediaItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // ── Automatically slowly slide drawer (PRESERVED AS REQUESTED) ──
  useEffect(() => {
    if (selectedProject) return;

    const interval = setInterval(() => {
      if (!isHoveredRef.current && scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 20) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 420, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [selectedProject]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const handleOpenModal = (project: Project, mediaItem?: MediaItem) => {
    setSelectedProject(project);
    if (mediaItem) {
      setModalMedia(mediaItem);
    } else if (project.media && project.media.length > 0) {
      setModalMedia(project.media[0]);
    } else {
      setModalMedia(null);
    }
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-canvas py-20 px-6 sm:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-[1280px]">

        {/* Choreographed Section Header */}
        <SectionDivider
          number="01"
          title="FEATURED PROJECTS"
          tag="AUTO.DRAWER // ACTIVE"
        />

        {/* Section Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink-strong tracking-[-0.02em]">
              Selected Systems <span className="font-serif italic font-normal text-muted">&amp; Architectures.</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1 font-mono">
              [ AUTO-SLIDING ARCHIVE · HOVER TO PAUSE ]
            </p>
          </div>

          {/* Scroll Nav Buttons — Invert-Block Tactile Switches */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0 select-none">
            <button
              onClick={scrollLeft}
              className="invert-block w-9 h-9 flex items-center justify-center border border-line bg-surface text-ink cursor-pointer"
              aria-label="Scroll projects left"
              title="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="invert-block w-9 h-9 flex items-center justify-center border border-line bg-surface text-ink cursor-pointer"
              aria-label="Scroll projects right"
              title="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Project Cards Drawer — automatically slowly sliding ── */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          className="flex overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory gap-6"
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              index={idx}
              project={project}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

      </div>

      {/* Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-4xl overflow-hidden border border-line-strong bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CAD Crosshairs on Modal Frame */}
              <span className="tick tick-tl -top-[5px] -left-[5px]" />
              <span className="tick tick-tr -top-[5px] -right-[5px]" />
              <span className="tick tick-bl -bottom-[5px] -left-[5px]" />
              <span className="tick tick-br -bottom-[5px] -right-[5px]" />

              {/* Modal Header */}
              <div className="p-4 flex items-center justify-between border-b border-line bg-canvas">
                <div>
                  <h3 className="font-display text-lg text-ink-strong">
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {selectedProject.tags.join(' · ')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="invert-block p-1.5 border border-line text-muted hover:text-ink cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Media Display */}
              <div className="relative aspect-video flex items-center justify-center bg-sunken border-b border-line">
                {modalMedia ? (
                  modalMedia.type === 'video' ? (
                    modalMedia.isIframe || modalMedia.url.includes('linkedin.com/embed') ? (
                      <iframe
                        src={modalMedia.url}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={selectedProject.title}
                      />
                    ) : (
                      <video
                        src={modalMedia.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    )
                  ) : (
                    <img
                      src={resolveMediaUrl(modalMedia.url)}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain"
                    />
                  )
                ) : selectedProject.videoUrl ? (
                  selectedProject.videoUrl.includes('linkedin.com/embed') ? (
                    <iframe
                      src={selectedProject.videoUrl}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title={selectedProject.title}
                    />
                  ) : (
                    <video
                      src={selectedProject.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <img
                    src={resolveMediaUrl(selectedProject.thumbnail)}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-surface">
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 font-sans">
                  {selectedProject.description}
                </p>
                <div className="flex items-center gap-3">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="invert-block inline-flex items-center gap-2 px-4 py-2 border border-line bg-canvas text-ink font-mono text-xs font-semibold tracking-wider"
                    >
                      <span>OPEN LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5 text-accent-ink" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="invert-block inline-flex items-center gap-2 px-4 py-2 border border-line bg-canvas text-ink font-mono text-xs tracking-wider"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>SOURCE REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
