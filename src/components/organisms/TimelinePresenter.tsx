import React from 'react';
import Section from '../atoms/Section';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { TimelineItem } from '../../types/timeline';
import type { PersonaType } from '../../types/persona';

interface TimelinePresenterProps {
  timeline: TimelineItem[];
  activePersona: PersonaType;
}

const TimelinePresenter: React.FC<TimelinePresenterProps> = ({ timeline, activePersona }) => {
  const shouldReduceMotion = useReducedMotion();
  const yVal = shouldReduceMotion ? 0 : 6;

  return (
    <Section id="timeline-nodes" className="max-w-2xl mx-auto w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          initial={{ opacity: 0, y: yVal }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -yVal }}
          transition={{ duration: 0.2 }}
          className="relative border-l border-border-primary pl-6 ml-4 space-y-10 text-left"
        >
          {timeline.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: yVal }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.3 }}
              className="relative space-y-1.5"
            >
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-border-focus" />
              <div className="flex items-center space-x-2">
                <span className="font-mono text-2xs text-text-muted">{item.quarter}</span>
                <span className="text-3xs font-semibold px-1.5 py-0.5 rounded bg-bg-secondary border border-border-primary text-text-secondary">
                  {item.category}
                </span>
              </div>
              <h2 className="text-base font-semibold text-text-primary">{item.title}</h2>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default TimelinePresenter;
