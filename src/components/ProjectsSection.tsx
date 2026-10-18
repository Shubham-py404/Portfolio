import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, MediaItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import play_button from '../../assets/play-button.svg';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

// Single Project Card with Media Carousel
const ProjectCard: React.FC<{
  project: Project;
  idx: number;
  onOpenModal: (project: Project, mediaItem?: MediaItem) => void;
}> = ({ project, idx, onOpenModal }) => {
  // Normalize media items: prioritize explicit media list, then videoUrl, then thumbnail
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="min-w-[320px] sm:min-w-[420px] max-w-[440px] snap-start bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden group hover:border-neutral-500 transition-all duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Card Media Container with Top-Right Counter & Left/Right Arrows */}
        <div className="relative aspect-video bg-neutral-900 overflow-hidden">
          {/* Top-Right Component: 1/3 or 2/3 with Left & Right Arrow UI Buttons */}
          {totalMedia > 1 ? (
            <div className="absolute top-3 right-3 z-30 flex items-center bg-black/85 backdrop-blur-md border border-neutral-700/80 rounded-full py-0.5 px-2 text-[11px] font-mono text-neutral-300 shadow-xl select-none">
              <button
                type="button"
                onClick={handlePrevMedia}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                title="Previous media"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="font-semibold text-white tracking-widest px-1.5 text-[10px]">
                {activeMediaIdx + 1}/{totalMedia}
              </span>

              <button
                type="button"
                onClick={handleNextMedia}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                title="Next media"
                aria-label="Next media"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="absolute top-3 right-3 z-30 bg-black/75 backdrop-blur-sm border border-neutral-800/80 rounded-full py-0.5 px-2 text-[10px] font-mono text-neutral-400 shadow-md">
              1/1
            </div>
          )}

          {/* Active Media Renderer */}
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-black/70 border border-white/30 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-white transition-all duration-300">
                  <img src={play_button} alt="Play video" className="w-6 h-6 translate-x-0.5 object-contain" />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative w-full h-full cursor-pointer overflow-hidden"
              onClick={() => onOpenModal(project, currentMedia)}
            >
              <img
                src={resolveMediaUrl(currentMedia.url)}
                alt={currentMedia.title || project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-medium text-white group-hover:text-neutral-200 transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-sm font-light text-neutral-400 line-clamp-4 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { projects } = portfolio;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalMedia, setModalMedia] = useState<MediaItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section id="projects" className="py-24 px-6 bg-black text-white border-t border-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              01 // Selected Engineering & Design Works
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Featured Projects
            </h2>
          </div>

          {/* Nav Controls for Horizontal Scroll Cards */}
          <div className="flex items-center space-x-3 mt-6 sm:mt-0">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
              aria-label="Scroll projects right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated Moving Project Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

      </div>

      {/* Media Modal Player Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedProject.title}</h3>
                  <p className="text-xs font-mono text-neutral-400">{selectedProject.tags.join(' • ')}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Media Player / Image Viewer */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
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

              {/* Modal Footer Description */}
              <div className="p-6 bg-neutral-950">
                <p className="text-sm font-light text-neutral-300 leading-relaxed mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex items-center space-x-4">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-white text-black text-xs font-mono hover:bg-neutral-200 transition-colors"
                    >
                      <span>Open Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded border border-neutral-800 text-white text-xs font-mono hover:bg-neutral-900 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
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
