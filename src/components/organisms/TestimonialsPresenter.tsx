import React from 'react';
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
  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
  };

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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="border border-border-primary bg-bg-secondary p-6 rounded-lg space-y-4 shadow-soft text-left"
            >
              <p className="text-xs md:text-sm italic text-text-secondary leading-relaxed">
                "{item.text}"
              </p>
              <div className="pt-2 border-t border-border-primary">
                <h4 className="text-xs font-bold text-text-primary">{item.name}</h4>
                <p className="text-3xs text-text-muted font-mono">{item.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default TestimonialsPresenter;
