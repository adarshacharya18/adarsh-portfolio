import React from 'react';
import Section from '../atoms/Section';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillGroup } from '../../types/skill';
import type { PersonaType } from '../../types/persona';

interface SkillsPresenterProps {
  skills: SkillGroup[];
  activePersona: PersonaType;
}

const SkillsPresenter: React.FC<SkillsPresenterProps> = ({ skills, activePersona }) => {
  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
  };

  return (
    <Section id="tech-stack" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold">Technical Matrix</h2>
        <p className="text-xs text-text-muted">
          Engineered skill highlights matching the selected recruiter track.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((group) => (
            <div
              key={group.category}
              className="border border-border-primary bg-bg-secondary p-6 rounded-lg space-y-4 shadow-soft"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted border-b border-border-primary pb-2">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2 rounded bg-bg-primary border border-border-primary"
                  >
                    <span className="text-xs font-medium text-text-primary">{skill.name}</span>
                    <span className="text-3xs font-mono px-1.5 py-0.5 rounded bg-bg-tertiary border border-border-primary text-text-secondary">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default SkillsPresenter;
