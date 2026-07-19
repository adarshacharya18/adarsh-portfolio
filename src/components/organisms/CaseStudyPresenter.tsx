import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowLeft, FiUser, FiLayers } from 'react-icons/fi';
import ProjectLinksGroup from '../molecules/ProjectLinksGroup';
import TagBadgeList from '../molecules/TagBadgeList';
import ImageLightbox from '../molecules/ImageLightbox';
import type { ProjectItem } from '../../types/project';

interface CaseStudyPresenterProps {
  project: ProjectItem;
}

const CaseStudyPresenter: React.FC<CaseStudyPresenterProps> = ({ project }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6 text-left">
      <Link
        to="/projects"
        className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition cursor-pointer"
      >
        <FiArrowLeft className="w-3.5 h-3.5" />
        <span>All Projects</span>
      </Link>

      <article className="border border-border-primary bg-bg-secondary p-6 md:p-8 rounded-xl space-y-6 shadow-soft">
        {/* Header Block */}
        <header className="space-y-4 border-b border-border-primary pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
                  {project.title}
                </h1>
                {project.status && (
                  <span className="self-start sm:self-auto text-5xs px-2.5 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary font-bold uppercase tracking-wider font-mono">
                    {project.status}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-3xs text-text-muted font-mono">
                <div className="flex items-center space-x-1">
                  <FiUser className="w-3.5 h-3.5" />
                  <span>{project.role}</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center space-x-1">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>{project.timeline}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center shrink-0">
              <ProjectLinksGroup
                githubUrl={project.links.github}
                demoUrl={project.links.demo}
                certificateUrl={project.links.certificate}
                onCertificateClick={() => openLightbox([project.links.certificate || ''], 0)}
              />
            </div>
          </div>
        </header>

        {/* Narrative Grid */}
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs flex items-center gap-1.5">
              <FiLayers className="w-3.5 h-3.5" />
              <span>Technical Architecture</span>
            </h2>
            <p className="text-text-muted">{project.architecture}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              The Problem
            </h2>
            <p className="text-text-muted">{project.problem}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              The Solution
            </h2>
            <p className="text-text-muted">{project.solution}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Key Challenges & Resolutions
            </h2>
            <p className="text-text-muted">{project.challenges}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Lessons Learned
            </h2>
            <p className="text-text-muted">{project.lessonsLearned}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Future Improvements
            </h2>
            <p className="text-text-muted">{project.futureImprovements}</p>
          </div>
        </div>

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-border-primary">
            <h3 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
              Interface Screenshots
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <div
                  key={src}
                  className="aspect-video rounded-lg bg-bg-primary border border-border-primary overflow-hidden flex items-center justify-center relative group cursor-zoom-in"
                  onClick={() => openLightbox(project.screenshots, i)}
                >
                  <div className="absolute inset-0 bg-zinc-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10">
                    <span className="text-3xs text-white font-mono">View Screenshot {i + 1}</span>
                  </div>
                  <div className="text-center p-3">
                    <span className="text-3xs text-text-muted font-mono">
                      {src.split('/').pop()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Gallery Showcase */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-border-primary">
            <div className="space-y-1">
              <h2 className="font-bold text-text-primary uppercase tracking-wide text-2xs">
                Administrative Feature Showcase
              </h2>
              <p className="text-3xs text-text-muted">
                Visual walkthrough of custom CMS modules, settings dashboards, and environment
                template mappers built for this platform.
              </p>
            </div>

            <div className="space-y-8">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-3 border-b border-border-primary/50 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-2 text-left">
                    <h3 className="text-sm font-semibold text-text-primary">
                      {idx + 1}. {item.caption}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      item.images.length === 1
                        ? 'grid-cols-1 max-w-lg'
                        : item.images.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                    }`}
                  >
                    {item.images.map((imgSrc, imgIdx) => (
                      <div
                        key={imgSrc}
                        className="relative rounded-lg border border-border-primary overflow-hidden bg-bg-primary shadow-soft aspect-[16/10] w-full"
                      >
                        {/* Mock Browser Header */}
                        <div className="bg-bg-tertiary px-3 py-1.5 border-b border-border-primary flex items-center space-x-1.5 text-4xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 block"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80 block"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 block"></span>
                          <span className="text-text-muted font-mono pl-1.5 truncate select-none">
                            {imgSrc.split('/').pop()}
                          </span>
                        </div>
                        {/* Actual Image */}
                        <img
                          src={imgSrc}
                          alt={`${item.caption} - Screen ${imgIdx + 1}`}
                          className="w-full h-full object-cover object-top hover:scale-[1.02] transition duration-300 cursor-zoom-in"
                          onClick={() => openLightbox(item.images, imgIdx)}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-border-primary">
          <TagBadgeList tags={project.techStack} />
        </div>
      </article>

      {/* Lightbox Popover overlay */}
      <ImageLightbox
        key={`${lightboxImages.join(',')}-${lightboxIndex}`}
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default CaseStudyPresenter;
