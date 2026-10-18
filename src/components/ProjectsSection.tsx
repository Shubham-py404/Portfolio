import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Play, Pause, X, ChevronLeft, ChevronRight, Film } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { projects } = portfolio;
  const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
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
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-200"
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-200"
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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className="min-w-[320px] sm:min-w-[420px] max-w-[440px] snap-start bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden group hover:border-neutral-500 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Card Media Preview (Video Autoplay on hover or thumbnail) */}
                <div
                  className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(project)}
                >
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      poster={project.thumbnail}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  )}

                  {/* Video Play Overlay Badge */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-black translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-neutral-800 text-[10px] font-mono px-2.5 py-1 rounded text-neutral-300 flex items-center space-x-1.5">
                    <Film className="w-3 h-3 text-white" />
                    <span>Video Demo</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-medium text-white group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm font-light text-neutral-400 line-clamp-2 leading-relaxed mb-6">
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

              {/* Card Footer Action Links */}
              <div className="px-6 pb-6 pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setSelectedVideo(project)}
                  className="text-white hover:underline flex items-center space-x-1.5 font-medium"
                >
                  <span>Watch Video</span>
                  <Play className="w-3 h-3" />
                </button>

                <div className="flex items-center space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Player Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedVideo(null)}
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
                  <h3 className="text-lg font-medium text-white">{selectedVideo.title}</h3>
                  <p className="text-xs font-mono text-neutral-400">{selectedVideo.tags.join(' • ')}</p>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer Description */}
              <div className="p-6 bg-neutral-950">
                <p className="text-sm font-light text-neutral-300 leading-relaxed mb-4">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center space-x-4">
                  {selectedVideo.demoUrl && (
                    <a
                      href={selectedVideo.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-white text-black text-xs font-mono hover:bg-neutral-200 transition-colors"
                    >
                      <span>Open Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedVideo.githubUrl && (
                    <a
                      href={selectedVideo.githubUrl}
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
