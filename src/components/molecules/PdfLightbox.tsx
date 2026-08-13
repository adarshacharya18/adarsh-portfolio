import React, { useEffect } from 'react';
import { FiX, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfLightboxProps {
  isOpen: boolean;
  pdfUrl: string;
  onClose: () => void;
}

const PdfLightbox: React.FC<PdfLightboxProps> = ({ isOpen, pdfUrl, onClose }) => {
  // Handle keyboard events (Escape to close)
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-8 select-none"
        onClick={onClose}
      >
        {/* Controls Panel */}
        <div
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center space-x-2 sm:space-x-3 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={pdfUrl}
            download
            className="text-white hover:text-zinc-300 transition p-1.5 sm:p-2 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-full cursor-pointer flex items-center justify-center"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <button
            onClick={onClose}
            className="text-white hover:text-zinc-300 transition p-1.5 sm:p-2 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-full cursor-pointer flex items-center justify-center"
            title="Close"
            aria-label="Close Lightbox"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* PDF Container */}
        <div
          className="relative w-full max-w-5xl h-full flex items-center justify-center overflow-hidden bg-zinc-900/50 rounded-xl border border-zinc-800 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <object data={pdfUrl} type="application/pdf" className="w-full h-full rounded-xl">
            <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-8 text-center space-y-4">
              <p>Your browser does not support embedded PDFs.</p>
              <a
                href={pdfUrl}
                download
                className="inline-flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download PDF Instead</span>
              </a>
            </div>
          </object>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PdfLightbox;
