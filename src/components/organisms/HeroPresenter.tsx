import React from 'react';
import Section from '../atoms/Section';
import { FiDownload, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import type { Profile, PersonaContent } from '../../types/profile';
import type { PersonaType } from '../../types/persona';
import type { SocialLinkItem } from '../../types/socials';
import socialsData from '../../data/socials.json';
import TypingText from '../atoms/TypingText';

interface HeroPresenterProps {
  profile: Profile;
  currentPersonaContent: PersonaContent;
  activePersona: PersonaType;
}

const getSocialIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'github':
      return <FaGithub className="w-5 h-5" />;
    case 'linkedin':
      return <FaLinkedin className="w-5 h-5" />;
    case 'leetcode':
      return <SiLeetcode className="w-5 h-5" />;
    case 'codeforces':
      return <SiCodeforces className="w-5 h-5" />;
    default:
      return null;
  }
};

const HeroPresenter: React.FC<HeroPresenterProps> = ({
  profile,
  currentPersonaContent,
  activePersona,
}) => {
  const socials = socialsData as unknown as SocialLinkItem[];

  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
  };

  return (
    <Section id="hero" className="space-y-6 pt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeVariants}
          className="space-y-4"
        >
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
              {profile.name}
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-text-secondary h-7">
              <TypingText text={currentPersonaContent.title} key={activePersona} />
            </h2>
          </div>

          <p className="text-sm md:text-base text-text-muted max-w-2xl leading-relaxed">
            {currentPersonaContent.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap gap-4 pt-2">
        <a
          href={profile.resumeUrl}
          download="adarsh-acharya-resume-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 border border-border-primary rounded-md text-xs font-semibold text-text-primary bg-bg-secondary hover:bg-bg-tertiary transition cursor-pointer shadow-soft"
        >
          <FiDownload className="w-4 h-4" />
          <span>Resume / CV</span>
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
        {socials.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition"
            aria-label={`${link.name} Profile`}
          >
            {getSocialIcon(link.icon)}
          </a>
        ))}
      </div>
    </Section>
  );
};

export default HeroPresenter;
