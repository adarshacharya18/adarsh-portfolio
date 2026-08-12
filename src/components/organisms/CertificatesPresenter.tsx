import React, { useState } from 'react';
import Section from '../atoms/Section';
import { FiAward, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ImageLightbox from '../molecules/ImageLightbox';
import AntigravityCard from '../molecules/AntigravityCard';
import type { CertificateItem } from '../../types/certificate';
import type { PersonaType } from '../../types/persona';

interface CertificatesPresenterProps {
  certificates: CertificateItem[];
  activePersona: PersonaType;
}

const CertificatesPresenter: React.FC<CertificatesPresenterProps> = ({
  certificates,
  activePersona,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 15 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Section id="certificates-grid">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={itemVariants} className="perspective-[1000px]">
              <AntigravityCard className="border border-accent-primary/20 bg-bg-secondary/20 p-6 shadow-soft text-left h-full">
                <div className="flex items-start space-x-4 h-full">
                  <div className="p-3 bg-bg-tertiary rounded-lg border border-border-primary text-text-secondary shrink-0">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div className="space-y-2 flex-grow min-w-0">
                    <h2 className="text-sm font-semibold text-text-primary truncate">
                      {cert.title}
                    </h2>
                    <p className="text-xs text-text-secondary">{cert.issuer}</p>
                    <div className="flex justify-between items-center text-3xs text-text-muted font-mono pt-1 gap-2">
                      <span
                        className="truncate max-w-[65%] sm:max-w-[75%] block"
                        title={`ID: ${cert.credentialId}`}
                      >
                        ID: {cert.credentialId}
                      </span>
                      <span className="shrink-0">{cert.date}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 pt-2">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-accent-primary hover:underline cursor-pointer"
                      >
                        <span>Verify Link</span>
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {cert.image && (
                        <>
                          <span className="text-border-focus text-xs select-none">|</span>
                          <button
                            onClick={() => openLightbox([cert.image!], 0)}
                            className="inline-flex items-center space-x-1.5 text-xs text-text-muted font-semibold group-hover:text-text-primary transition cursor-pointer bg-transparent border-0 p-0"
                          >
                            <span>View Certificate</span>
                            <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </AntigravityCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Popover overlay */}
      <ImageLightbox
        key={`${lightboxImages.join(',')}-${lightboxIndex}`}
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </Section>
  );
};

export default CertificatesPresenter;
