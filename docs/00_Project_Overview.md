# Project Overview: Senior Software Engineering Portfolio

## 1. Vision & Goals
This portfolio is engineered not merely as a digital resume, but as a **production-quality, long-lived web application** designed to showcase advanced engineering skills. It is architected to evolve over a multi-year horizon, adapting to new technologies, projects, and career targets.

### Primary Objectives
- **Multi-Persona Targeting**: Dynamically present credentials tailored to specific roles:
  - *Software Engineer (Generalist)*: Focuses on problem-solving, algorithms, and software design patterns.
  - *Backend Engineer*: Highlights API design, database schemas, system architecture, performance tuning, and scalability.
  - *Full Stack Developer*: Showcases end-to-end features, clean frontend architectures, state management, and visual polish.
  - *WordPress Engineer*: Exhibits plugin/theme development, custom Gutenberg blocks, database customizations, and headless WordPress architectures (WP REST API / GraphQL + Next.js).
- **Engineering Excellence**: Maintain 100/100 Lighthouse performance, full WCAG 2.1 AA accessibility (a11y), clean code, and robust search engine optimization (SEO).
- **Extensibility**: Provide a modular architecture allowing new case studies, interactive components, and pages to be added with minimal cognitive load.

---

## 2. Technology Stack & Rationale

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14+ (App Router) | Enables Hybrid Rendering (SSR/SSG/ISR) for optimal SEO and rapid initial loads. Provides serverless API routes out-of-the-box. |
| **Language** | TypeScript | Ensures type safety, reduces runtime exceptions, and acts as self-documenting code for system interfaces. |
| **Styling** | Vanilla CSS (CSS Modules) | Avoids build overhead and opinionated frameworks. Supports native CSS Custom Properties for theme switching and fine-grained visual control. |
| **Icons** | Lucide React | Provides a lightweight, consistent, and highly customizable icon library. |
| **Animations** | Framer Motion & CSS | Powers subtle micro-interactions and smooth transition states to deliver a premium user experience without performance penalties. |
| **Deployment** | Vercel | Offers seamless deployment, edge caching, automated preview environments, and instant global delivery. |

---

## 3. Folder Conventions

The workspace follows a strict, domain-driven structure optimized for scalability:

```text
/
├── docs/                      # Architectural and project documentation
│   ├── prompts/               # Structured phase-by-step instructions for development
│   └── *.md                   # System documentation files
├── public/                    # Static assets (images, icons, robots.txt, sitemaps)
├── src/
│   ├── app/                   # Next.js App Router (pages, layouts, and API routes)
│   │   ├── api/               # Serverless API routes (e.g., contact form processing)
│   │   ├── case-studies/      # Dynamic case study detail routes
│   │   ├── layout.tsx         # Root layout with metadata and HTML scaffolding
│   │   └── page.tsx           # Home page (persona-controlled dashboard)
│   ├── components/            # Reusable UI components
│   │   ├── atoms/             # Base UI elements (buttons, inputs, badges)
│   │   ├── molecules/         # Composite elements (theme switches, card elements)
│   │   └── organisms/         # Layout modules (navigation, footer, sections)
│   ├── context/               # Global React Contexts (e.g., PersonaContext, ThemeContext)
│   ├── hooks/                 # Reusable custom React hooks
│   ├── styles/                # Global style declarations and variables
│   │   ├── variables.css      # Core Design System tokens
│   │   └── globals.css        # Global CSS resets and base styles
│   ├── types/                 # Shared TypeScript interfaces and types
│   └── utils/                 # Pure helper functions, formatting utilities, and data parsers
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## 4. Coding & Architecture Conventions

### Core Engineering Principles
- **SOLID Design**: Components should have a single responsibility. Business logic must be separated from layout files.
- **Component Styling**: All component styling must use CSS Modules (`ComponentName.module.css`). Ad-hoc inline styles are prohibited except for dynamic values calculated via JS (which should be set as inline CSS Custom Properties).
- **TypeScript Strict Mode**: Explicit types must be declared for all components, helpers, and contexts. Avoid the use of `any` at all costs.
- **Data Fetching**: Prefer Server Components for data fetching to minimize client-side bundle size, leveraging Client Components only for user interactivity.

---

## 5. Naming Conventions

Consistency in naming is critical for maintainability:

| Asset Type | Convention | Example |
| :--- | :--- | :--- |
| **Component Files** | PascalCase | `ThemeSwitcher.tsx` |
| **Style Modules** | CamelCase + module.css | `themeSwitcher.module.css` |
| **Helper / Hook Files**| camelCase | `useLocalStorage.ts`, `formatDate.ts` |
| **Directories** | kebab-case | `case-studies`, `contact-form` |
| **Interfaces/Types** | PascalCase | `ProjectCardProps`, `PersonaType` |
| **CSS Variables** | kebab-case (prefixed) | `--color-primary-500`, `--font-scale-h1` |

---

## 6. Future Scalability & Extensibility

To ensure the portfolio can easily scale over a multi-year horizon:
- **Modular Case Studies**: Case study data is modeled in TypeScript configurations (`src/types/project.ts`), making it trivial to migrate to a Headless CMS (such as a WordPress Custom Post Type setup via WP GraphQL) in the future.
- **Decoupled Business Logic**: Custom React Hooks handle user state (such as the active career persona or dark mode configuration), separating operational code from rendering.
- **Plugin-ready WordPress Demos**: WordPress-related features (like a headless post listing or block library) are modularly wrapped in dedicated folders. This ensures that WordPress-specific integrations do not clutter the general SWE and Backend presentations.
