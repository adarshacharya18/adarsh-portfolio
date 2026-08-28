import React from 'react';
import Section from '../atoms/Section';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
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
          className="relative ml-4 flex flex-col gap-10 text-left"
        >
          {timeline.map((item, index) => (
            <TimelineNode
              key={item.id}
              item={item}
              isLast={index === timeline.length - 1}
              shouldReduceMotion={shouldReduceMotion}
              yVal={yVal}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default TimelinePresenter;

const TimelineNode: React.FC<{
  item: TimelineItem;
  isLast: boolean;
  shouldReduceMotion: boolean | null;
  yVal: number;
}> = ({ item, isLast, shouldReduceMotion, yVal }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-30% 0px 5000px 0px' });
  const state = isInView ? 'filled' : 'empty';
  const isInProgress = item.status === 'In Progress';

  return (
    <motion.div
      initial={{ opacity: 0, y: yVal }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: shouldReduceMotion ? 0.05 : 0.3 }}
      className="relative space-y-1.5 pl-6"
    >
      {/* Invisible anchor for precise intersection observer tracking */}
      <div ref={ref} className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[calc(50%+0.5px)]" />

      {/* Vertical line segment */}
      {!isLast && (
        <>
          <div className="absolute left-0 top-1.5 w-[1px] h-[calc(100%+40px)] bg-border-primary -translate-x-[calc(50%+0.5px)]" />
          <motion.div
            animate={state}
            initial="empty"
            variants={{
              filled: { opacity: isInProgress ? 0 : 1 },
              empty: { opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute left-0 top-1.5 w-[2px] h-[calc(100%+40px)] bg-accent-primary -translate-x-[calc(50%+0.5px)]"
          />
        </>
      )}

      {/* Circle */}
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-border-focus -translate-x-[calc(50%+0.5px)] flex items-center justify-center overflow-hidden z-10">
        <motion.div
          animate={state}
          initial="empty"
          variants={{
            filled: { scale: isInProgress ? 0 : 1 },
            empty: { scale: 0 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full h-full bg-accent-primary rounded-full"
        />
      </div>

      {/* Content */}
      <motion.div
        animate={state}
        initial="empty"
        variants={{
          filled: { opacity: 1, filter: 'blur(0px)' },
          empty: { opacity: 0.65, filter: 'blur(0.5px)' },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col space-y-1.5 will-change-transform will-change-filter"
      >
        <div className="flex items-center space-x-2">
          <span className="font-mono text-2xs text-text-muted">{item.quarter}</span>
          <span className="text-3xs font-semibold px-1.5 py-0.5 rounded bg-bg-secondary border border-border-primary text-text-secondary">
            {item.category}
          </span>
          {isInProgress && (
            <span className="text-4xs font-mono font-semibold px-1.5 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary uppercase tracking-wider">
              In Progress
            </span>
          )}
        </div>
        <h2 className="text-base font-semibold text-text-primary">{item.title}</h2>
        <p className="text-xs md:text-sm text-text-muted leading-relaxed">{item.description}</p>
      </motion.div>
    </motion.div>
  );
};
