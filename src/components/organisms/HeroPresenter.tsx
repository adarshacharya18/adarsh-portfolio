import React from 'react';
import Section from '../atoms/Section';
import { FiDownload, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import type { Profile, PersonaContent } from '../../types/profile';
import type { PersonaType } from '../../types/persona';
import TypingText from '../atoms/TypingText';

interface HeroPresenterProps {
  profile: Profile;
  currentPersonaContent: PersonaContent;
  activePersona: PersonaType;
}

const HeroPresenter: React.FC<HeroPresenterProps> = ({
  profile,
  currentPersonaContent,
  activePersona,
}) => {
  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
  };

  return (
    <Section
      id="hero"
      className="flex flex-col items-start justify-center py-16 md:py-24 space-y-8"
    >
      <div className="space-y-4 max-w-3xl">
        {activePersona !== 'overall' && (
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border-primary bg-bg-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            <span className="font-mono text-3xs uppercase tracking-wider text-text-muted">
              {currentPersonaContent.title} Persona active
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
          {profile.name}
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeVariants}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-medium text-text-secondary">
              <TypingText text={currentPersonaContent.subTitle} />
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              {currentPersonaContent.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={profile.resumeUrl}
          download
          className="inline-flex items-center space-x-2 px-4 py-2 border border-border-primary bg-bg-secondary text-text-primary rounded-md text-xs font-semibold hover:border-border-focus hover:bg-bg-tertiary transition cursor-pointer shadow-soft"
        >
          <FiDownload className="w-4 h-4 text-text-muted" />
          <span>Download Resume</span>
        </a>

        <a
          href={profile.email}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-text-primary text-bg-primary rounded-md text-xs font-semibold hover:opacity-90 transition cursor-pointer shadow-soft"
        >
          <FiMail className="w-4 h-4" />
          <span>Get in Touch</span>
        </a>
      </div>

      <div className="flex items-center space-x-4 pt-2">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-text-primary transition"
          aria-label="GitHub Profile"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-text-primary transition"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
        <a
          href={profile.socials.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-text-primary transition"
          aria-label="LeetCode Profile"
        >
          <SiLeetcode className="w-5 h-5" />
        </a>
        <a
          href={profile.socials.codeforces}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-text-primary transition"
          aria-label="Codeforces Profile"
        >
          <SiCodeforces className="w-5 h-5" />
        </a>
      </div>
    </Section>
  );
};

export default HeroPresenter;
