import React, { useState } from 'react';
import Section from '../atoms/Section';
import { motion, AnimatePresence } from 'framer-motion';
import type { TestimonialItem } from '../../types/testimonials';
import type { PersonaType } from '../../types/persona';

interface TestimonialsPresenterProps {
  testimonials: TestimonialItem[];
  activePersona: PersonaType;
}

const TestimonialsPresenter: React.FC<TestimonialsPresenterProps> = ({
  testimonials,
  activePersona,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <Section id="testimonials" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold">Recommendations</h2>
        <p className="text-xs text-text-muted">
          Feedback and reviews from technical leaders and directors.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeVariants}
          className="max-w-4xl"
        >
          {/* Desktop Grid Layout (Visible on md: and up) */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="border border-border-primary bg-bg-secondary p-6 rounded-lg space-y-4 shadow-soft text-left"
              >
                <p className="text-xs md:text-sm italic text-text-secondary leading-relaxed">
                  "{item.text}"
                </p>
                <div className="pt-2 border-t border-border-primary space-y-1">
                  <h4 className="text-xs font-bold text-text-primary">{item.name}</h4>
                  <p className="text-3xs text-text-muted font-mono">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Touch Slider Layout (Visible on screens under md) */}
          {testimonials.length > 0 && (
            <div className="block md:hidden space-y-4">
              <AnimatePresence mode="wait">
                {activeTestimonial && (
                  <motion.div
                    key={`${activeTestimonial.id}-${currentIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    drag="x"
                    dragElastic={0.4}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_e, info) => {
                      if (info.offset.x < -60) {
                        handleNext();
                      } else if (info.offset.x > 60) {
                        handlePrev();
                      }
                    }}
                    className="border border-border-primary bg-bg-secondary p-6 rounded-lg space-y-4 shadow-soft text-left touch-pan-y active:cursor-grabbing cursor-grab select-none"
                  >
                    <p className="text-xs italic text-text-secondary leading-relaxed">
                      "{activeTestimonial.text}"
                    </p>
                    <div className="pt-2 border-t border-border-primary space-y-1">
                      <h4 className="text-xs font-bold text-text-primary">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-3xs text-text-muted font-mono">{activeTestimonial.role}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slider Dots Indicator */}
              {testimonials.length > 1 && (
                <div className="flex justify-center items-center space-x-2 pt-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentIndex
                          ? 'bg-text-primary w-4'
                          : 'bg-bg-tertiary border border-border-primary w-2'
                      }`}
                      aria-label={`Go to recommendation slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default TestimonialsPresenter;
