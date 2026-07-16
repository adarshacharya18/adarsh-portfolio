import React from 'react';
import Section from '../atoms/Section';
import { SiLeetcode } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';
import { motion, useReducedMotion } from 'framer-motion';
import type { SocialLinkItem } from '../../types/socials';
import socialsData from '../../data/socials.json';

const LeetCodeHighlight: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const socials = socialsData as unknown as SocialLinkItem[];
  const leetcodeLink =
    socials.find((s) => s.icon === 'leetcode' || s.name === 'LeetCode')?.url ||
    'https://leetcode.com/AD18';

  return (
    <Section id="leetcode-highlight" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <SiLeetcode className="text-yellow-600 dark:text-yellow-500 w-6 h-6" />
          <span>Problem Solving & Algorithms</span>
        </h2>
        <p className="text-xs text-text-muted">
          Algorithmic training, competitive programming metrics, and problem-solving benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-border-primary bg-bg-secondary p-6 rounded-lg shadow-soft">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-semibold text-text-primary">LeetCode Profile Overview</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Actively practicing competitive programming and solving algorithmic challenges. With
            over <strong>800+ solved problems</strong>, this showcases deep proficiency in data
            structures (trees, graphs, dynamic programming), optimization patterns, and strict
            time/space complexity analysis.
          </p>
          <div className="pt-2">
            <a
              href={leetcodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-border-primary rounded-md text-xs font-semibold text-text-primary bg-bg-primary hover:bg-bg-tertiary transition cursor-pointer shadow-soft"
            >
              <span>View LeetCode Profile</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <a
            href={leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-sm block group focus:outline-none"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-lg border border-border-primary shadow-soft bg-bg-primary aspect-[16/10] w-full"
            >
              {/* Mock Browser Header */}
              <div className="bg-bg-tertiary px-3 py-2 border-b border-border-primary flex items-center space-x-1.5 text-4xs">
                <span className="w-2 h-2 rounded-full bg-red-500/80 block"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500/80 block"></span>
                <span className="w-2 h-2 rounded-full bg-green-500/80 block"></span>
                <span className="text-text-muted font-mono pl-2 truncate select-none">
                  leetcode.com/AD18
                </span>
              </div>
              {/* Screenshot Image */}
              <img
                src="/static/images/leetcode-profile-july.png"
                alt="LeetCode Profile Screenshot"
                className="w-full h-full object-cover object-top transition duration-300 filter group-hover:brightness-95"
                loading="lazy"
              />
            </motion.div>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default LeetCodeHighlight;
