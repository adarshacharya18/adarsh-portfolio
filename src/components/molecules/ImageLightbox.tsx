import React, { useState, useEffect, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Handle keyboard events (Escape to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, handlePrev, handleNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 select-none"
        onClick={onClose}
      >
        {/* Controls Panel */}
        <div
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center space-x-2 sm:space-x-3 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleZoom}
            className="text-white hover:text-zinc-300 transition p-1.5 sm:p-2 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-full cursor-pointer flex items-center justify-center"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            aria-label="Toggle Zoom"
          >
            {isZoomed ? (
              <FiZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FiZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-zinc-300 transition p-1.5 sm:p-2 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-full cursor-pointer flex items-center justify-center"
            title="Close"
            aria-label="Close Lightbox"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition p-2 sm:p-3 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-full cursor-pointer z-50 flex items-center justify-center"
            aria-label="Previous image"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition p-2 sm:p-3 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-full cursor-pointer z-50 flex items-center justify-center"
            aria-label="Next image"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Image Container */}
        <div
          className="relative max-w-5xl max-h-[85vh] flex items-center justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={`Image ${currentIndex + 1} of ${images.length}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-transform duration-200 select-none shadow-2xl ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={toggleZoom}
          />
        </div>

        {/* Image Index Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 text-xs font-mono bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800/50">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
