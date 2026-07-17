import React, { useEffect } from 'react';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfLightboxProps {
  isOpen: boolean;
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PdfLightbox: React.FC<PdfLightboxProps> = ({ isOpen, pdfUrl, title, onClose }) => {
  // Disable body scroll when lightbox is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Lightbox Container */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-3xl h-[70vh] bg-bg-secondary border border-border-primary rounded-xl overflow-hidden flex flex-col shadow-large"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Toolbar */}
            <header className="h-14 border-b border-border-primary bg-bg-secondary flex items-center justify-between px-4 shrink-0">
              <h3 className="text-2xs font-mono font-bold text-text-primary truncate max-w-[60%] sm:max-w-[75%]">
                {title}
              </h3>
              <div className="flex items-center space-x-1">
                {/* Download Button */}
                <a
                  href={pdfUrl}
                  download
                  className="text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition p-2 rounded-lg cursor-pointer flex items-center justify-center"
                  title="Download File"
                  aria-label="Download PDF File"
                >
                  <FiDownload className="w-4 h-4" />
                </a>
                {/* External Link Button */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition p-2 rounded-lg cursor-pointer flex items-center justify-center"
                  title="Open in New Tab"
                  aria-label="Open PDF in New Tab"
                >
                  <FiExternalLink className="w-4 h-4" />
                </a>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition p-2 rounded-lg cursor-pointer flex items-center justify-center"
                  title="Close Lightbox"
                  aria-label="Close Lightbox"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Document Body Wrapper */}
            <div className="w-full flex-1 bg-bg-primary overflow-hidden relative">
              {/* Embedded Document for Larger Viewports */}
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full border-0 bg-bg-primary hidden md:block"
                title={title}
              />

              {/* Mobile Fallback Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center md:hidden bg-bg-secondary">
                <p className="text-xs text-text-secondary mb-4 max-w-xs">
                  PDF document preview might not load inline on mobile browsers.
                </p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-text-primary text-bg-primary font-semibold text-xs rounded-lg hover:opacity-90 active:scale-[0.99] transition cursor-pointer"
                >
                  <span>Open PDF Document</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PdfLightbox;
