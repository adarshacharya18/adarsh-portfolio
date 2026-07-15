import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import experienceData from '../data/experience.json';
import { motion, AnimatePresence } from 'framer-motion';

const Experience: React.FC = () => {
  const { activePersona } = usePersona();

  const filteredExperience = experienceData.filter((exp) => exp.personas.includes(activePersona));

  return (
    <PageWrapper>
      <Section id="experience-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Work Experience</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Detailed professional history relevant to the selected target track.
        </p>
      </Section>

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
            {filteredExperience.map((exp) => (
              <div
                key={`${exp.role}-${exp.company}`}
                className="flex flex-col md:flex-row gap-4 md:gap-8 pb-8 border-b border-border-primary last:border-0 last:pb-0"
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
    </PageWrapper>
  );
};

export default Experience;
