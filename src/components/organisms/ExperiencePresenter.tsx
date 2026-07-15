import React from 'react';
import Section from '../atoms/Section';
import { FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
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
  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
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
            className="space-y-4 max-w-3xl"
          >
            {experience.map((exp) => (
              <div
                key={`${exp.role}-${exp.company}`}
                className="border border-border-primary bg-bg-secondary p-5 rounded-lg flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-soft hover:border-border-focus transition"
              >
                <div className="space-y-1 text-left">
                  <span className="font-mono text-3xs text-text-muted tracking-wider uppercase">
                    {exp.period}
                  </span>
                  <h3 className="text-sm font-semibold text-text-primary">{exp.role}</h3>
                  <p className="text-xs text-text-secondary">{exp.company}</p>
                  <p className="text-xs text-text-muted leading-relaxed pt-2">{exp.description}</p>
                </div>
                <div className="inline-flex items-center space-x-1 text-2xs text-text-muted font-semibold hover:text-text-primary cursor-pointer shrink-0 transition">
                  <span>View Details</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
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
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {experience.map((exp) => (
            <div
              key={`${exp.role}-${exp.company}`}
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
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default ExperiencePresenter;
