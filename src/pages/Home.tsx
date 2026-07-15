import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import { FiDownload, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import type { PersonaType } from '../types/persona';

interface SkillItem {
  name: string;
  level: string;
}

interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  personas: string[];
}

interface PersonaContentItem {
  title: string;
  subTitle: string;
  description: string;
  featuredHeading: string;
  featuredDescription: string;
}

const Home: React.FC = () => {
  const { activePersona } = usePersona();
  const profile = profileData;

  const currentPersonaContent = (
    profileData.personaContent as Record<PersonaType, PersonaContentItem>
  )[activePersona];
  const currentSkills = (skillsData as unknown as Record<PersonaType, SkillGroup[]>)[activePersona];
  const currentExperience = (experienceData as unknown as ExperienceItem[]).filter((exp) =>
    exp.personas.includes(activePersona),
  );

  // Subtle animations for transitions
  const fadeVariants = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
  };

  return (
    <PageWrapper>
      {/* 1. Hero / Profile Introduction Section */}
      <Section
        id="hero"
        className="flex flex-col items-start justify-center py-16 md:py-24 space-y-8"
      >
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border-primary bg-bg-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            <span className="font-mono text-3xs uppercase tracking-wider text-text-muted">
              {currentPersonaContent.title} Persona active
            </span>
          </div>

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
                {currentPersonaContent.subTitle}
              </h2>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                {currentPersonaContent.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Controls & Resume */}
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

        {/* Social / Coding Profiles */}
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

      {/* 2. Current Tech Stack Section */}
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
            {currentSkills.map((group) => (
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

      {/* 3. Reusable Experience Summary Section */}
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
            {currentExperience.map((exp) => (
              <div
                key={`${exp.role}-${exp.company}`}
                className="border border-border-primary bg-bg-secondary p-5 rounded-lg flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-soft hover:border-border-focus transition"
              >
                <div className="space-y-1">
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
    </PageWrapper>
  );
};

export default Home;
