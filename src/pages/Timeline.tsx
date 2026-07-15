import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import timelineData from '../data/timeline.json';
import { motion, AnimatePresence } from 'framer-motion';

const Timeline: React.FC = () => {
  const { activePersona } = usePersona();

  const filteredTimeline = timelineData.filter((t) => t.personas.includes(activePersona));

  return (
    <PageWrapper>
      <Section id="timeline-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Interactive Timeline</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          A granular timeline of projects, milestones, and open-source releases.
        </p>
      </Section>

      <Section id="timeline-nodes" className="max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative border-l border-border-primary pl-6 ml-4 space-y-10"
          >
            {filteredTimeline.map((item) => (
              <div key={item.id} className="relative space-y-1.5">
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
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
    </PageWrapper>
  );
};

export default Timeline;
