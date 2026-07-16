import React from 'react';
import Section from '../atoms/Section';
import { FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { ExperienceItem } from '../../types/experience';
import type { PersonaType } from '../../types/persona';

interface ExperiencePresenterProps {
  experience: ExperienceItem[];
  activePersona: PersonaType;
  compact?: boolean;
}

const ExperiencePresenter: React.FC<ExperiencePresenterProps> = ({
  experience,
  activePersona,
  compact = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const yVal = shouldReduceMotion ? 0 : 6;

  const fadeVariants = {
    initial: { opacity: 0, y: yVal },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.2, ease: 'easeOut' as const },
    },
    exit: {
      opacity: 0,
      y: -yVal,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.15, ease: 'easeIn' as const },
    },
  };

  if (compact) {
    return (
      <Section id="experience-summary" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold">Experience Overview</h2>
          <p className="text-xs text-text-muted">
            Recent milestones tailored to this persona view.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeVariants}
            className="flex flex-col gap-6 max-w-3xl"
          >
            {experience.map((exp) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                initial={{ opacity: 0, y: yVal }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: shouldReduceMotion ? 0.05 : 0.3 }}
                className="border border-border-primary bg-bg-secondary p-5 rounded-lg flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-soft hover:border-border-focus transition"
              >
                <div className="space-y-2 text-left">
                  <span className="font-mono text-3xs text-text-muted tracking-wider uppercase block mb-1">
                    {exp.period}
                  </span>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-text-primary">{exp.role}</h3>
                    <p className="text-xs text-text-secondary">{exp.company}</p>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed pt-1">{exp.description}</p>
                </div>
                <div className="inline-flex items-center space-x-1 text-2xs text-text-muted font-semibold hover:text-text-primary cursor-pointer shrink-0 transition">
                  <span>View Details</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
    );
  }

  return (
    <Section id="experience-list" className="max-w-3xl mx-auto w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          initial={{ opacity: 0, y: yVal }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -yVal }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {experience.map((exp) => (
            <motion.div
              key={`${exp.role}-${exp.company}`}
              initial={{ opacity: 0, y: yVal }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-25px' }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.35 }}
              className="flex flex-col md:flex-row gap-4 md:gap-8 pb-8 border-b border-border-primary last:border-0 last:pb-0 text-left"
            >
              <div className="md:w-1/4">
                <span className="font-mono text-xs text-text-muted">{exp.period}</span>
              </div>
              <div className="md:w-3/4 space-y-2">
                <h2 className="text-xl font-semibold text-text-primary">{exp.role}</h2>
                <h3 className="text-sm text-text-secondary">{exp.company}</h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default ExperiencePresenter;
