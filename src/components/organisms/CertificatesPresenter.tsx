import React, { useState } from 'react';
import Section from '../atoms/Section';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ImageLightbox from '../molecules/ImageLightbox';
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
  const shouldReduceMotion = useReducedMotion();
  const yVal = shouldReduceMotion ? 0 : 6;

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
          initial={{ opacity: 0, y: yVal }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -yVal }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: yVal }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.3 }}
              className="border border-border-primary bg-bg-secondary p-6 rounded-lg flex items-start space-x-4 shadow-soft hover:border-border-focus transition text-left"
            >
              <div className="p-3 bg-bg-tertiary rounded-lg border border-border-primary text-text-secondary shrink-0">
                <FiAward className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-grow min-w-0">
                <h2 className="text-sm font-semibold text-text-primary truncate">{cert.title}</h2>
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
                        className="inline-flex items-center space-x-1 text-xs text-text-secondary hover:text-text-primary hover:underline cursor-pointer bg-transparent border-0 p-0 font-semibold"
                      >
                        <span>View Certificate</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
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
