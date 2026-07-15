import type { PersonaType } from '../types/persona';

export interface ProfileData {
  name: string;
  avatarUrl: string;
  email: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    codeforces: string;
  };
}

export interface PersonaContent {
  title: string;
  subTitle: string;
  description: string;
  featuredHeading: string;
  featuredDescription: string;
}

export interface Skill {
  name: string;
  level: 'Core' | 'Intermediate' | 'Familiar';
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface ExperienceSummary {
  period: string;
  role: string;
  company: string;
  description: string;
  personas: PersonaType[];
}

export interface PortfolioData {
  profile: ProfileData;
  personaContent: Record<PersonaType, PersonaContent>;
  skills: Record<PersonaType, SkillGroup[]>;
  experience: ExperienceSummary[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Adarsh',
    avatarUrl: '/avatar.svg', // Will reside in public/
    email: 'mailto:adarsh@example.com',
    resumeUrl: '/resume.pdf', // Will reside in public/
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      leetcode: 'https://leetcode.com',
      codeforces: 'https://codeforces.com',
    },
  },
  personaContent: {
    swe: {
      title: 'Software Engineer',
      subTitle: 'Building Scalable, Highly Maintainable Software Systems',
      description:
        'Focused on core software patterns, algorithmic optimization, and modular component structures. I construct systems with a strict emphasis on SOLID principles, testing coverages, and clean architecture.',
      featuredHeading: 'Core Competency Focus',
      featuredDescription:
        'Object-oriented and functional paradigm engineering, standard patterns integration, and performance benchmarking.',
    },
    backend: {
      title: 'Backend Engineer',
      subTitle: 'Designing High-Throughput APIs and Distributed Architectures',
      description:
        'Specialized in server-side frameworks, relational/non-relational database architectures, edge caching layers, and containerized cloud services. I engineer services with high availability and low latency.',
      featuredHeading: 'Backend Focus Area',
      featuredDescription:
        'API design (REST/GraphQL), query plan optimization, caching strategies, and secure database migrations.',
    },
    fullstack: {
      title: 'Full Stack Developer',
      subTitle: 'Crafting Seamless, High-Performance End-to-End Solutions',
      description:
        'Bridging the gap between robust serverless architecture and visually polished, responsive user interfaces. I implement modular state flows, CSS layout frameworks, and secure API bridges.',
      featuredHeading: 'Full Stack Focus Area',
      featuredDescription:
        'State machine synchronization, responsive UI design, edge routing middlewares, and automated test coverages.',
    },
    wordpress: {
      title: 'WordPress Engineer',
      subTitle: 'Architecting Custom CMS Engines and Headless Implementations',
      description:
        'Dedicated to professional WordPress development including decoupled Gutenberg blocks, complex custom plugins, database fine-tuning, and headless Next.js query layers.',
      featuredHeading: 'WordPress Dev Focus Area',
      featuredDescription:
        'Custom plugin lifecycle hooks, Gutenberg block development, headless GraphQL integrations, and WP REST API caching.',
    },
  },
  skills: {
    swe: [
      {
        category: 'Languages',
        skills: [
          { name: 'TypeScript', level: 'Core' },
          { name: 'JavaScript', level: 'Core' },
          { name: 'Go', level: 'Intermediate' },
          { name: 'C++', level: 'Intermediate' },
        ],
      },
      {
        category: 'Core Concepts',
        skills: [
          { name: 'Data Structures', level: 'Core' },
          { name: 'Algorithms', level: 'Core' },
          { name: 'OOP & FP Design Patterns', level: 'Core' },
          { name: 'CI/CD Pipelines', level: 'Intermediate' },
        ],
      },
    ],
    backend: [
      {
        category: 'Server & Languages',
        skills: [
          { name: 'Node.js', level: 'Core' },
          { name: 'Go', level: 'Intermediate' },
          { name: 'Express', level: 'Core' },
          { name: 'Fastify', level: 'Intermediate' },
        ],
      },
      {
        category: 'Databases & Infrastructure',
        skills: [
          { name: 'PostgreSQL', level: 'Core' },
          { name: 'MySQL', level: 'Core' },
          { name: 'Redis Caching', level: 'Core' },
          { name: 'Docker Containers', level: 'Intermediate' },
        ],
      },
    ],
    fullstack: [
      {
        category: 'Frontend & UI',
        skills: [
          { name: 'React', level: 'Core' },
          { name: 'Vite & Next.js', level: 'Core' },
          { name: 'Tailwind CSS', level: 'Core' },
          { name: 'Framer Motion', level: 'Intermediate' },
        ],
      },
      {
        category: 'Backend & Routing',
        skills: [
          { name: 'Node.js & APIs', level: 'Core' },
          { name: 'PostgreSQL', level: 'Core' },
          { name: 'REST & GraphQL', level: 'Core' },
          { name: 'Serverless Functions', level: 'Intermediate' },
        ],
      },
    ],
    wordpress: [
      {
        category: 'PHP & Core CMS',
        skills: [
          { name: 'PHP', level: 'Core' },
          { name: 'WordPress Core API', level: 'Core' },
          { name: 'Custom Plugins Dev', level: 'Core' },
          { name: 'Custom Theme Architecture', level: 'Core' },
        ],
      },
      {
        category: 'CMS Modernization',
        skills: [
          { name: 'Gutenberg Blocks (React)', level: 'Core' },
          { name: 'GraphQL (WPGraphQL)', level: 'Intermediate' },
          { name: 'WP REST API', level: 'Core' },
          { name: 'WP-CLI & Actions Hooks', level: 'Core' },
        ],
      },
    ],
  },
  experience: [
    {
      period: '2025 - Present',
      role: 'Senior Platform Engineer',
      company: 'LogixTech Solutions',
      description:
        'Architecting low-latency microservices, relational schemas, and headless block systems.',
      personas: ['swe', 'backend', 'fullstack'],
    },
    {
      period: '2024 - 2025',
      role: 'WordPress Technical Lead',
      company: 'WebSphere CMS Solutions',
      description:
        'Engineered custom payment plugins, Gutenberg block matrices, and configured headless React interfaces.',
      personas: ['wordpress', 'fullstack'],
    },
    {
      period: '2023 - 2024',
      role: 'Software Engineer',
      company: 'CodeFlow Systems',
      description:
        'Developed REST API endpoints, automated unit test coverages, and built modular frontend UI views.',
      personas: ['swe', 'backend', 'fullstack'],
    },
  ],
};
