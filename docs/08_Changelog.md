# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.12.0-branding-content] - 2026-07-15

### Added
- **Dynamic Personal Branding System**:
  - Designed and deployed a minimalist, geometric monogram logo based on the initials "AA" representing growth, precision, and engineering excellence.
  - Exported SVG vectors for all system contexts: `logo-primary.svg`, `logo-favicon.svg`, `logo-lockup.svg`, `logo-icon.svg`, `logo-light.svg`, and `logo-dark.svg`.
  - Integrated the inline `LogoMark` React SVG component into the Navbar beside the renamed site title **"Mriga"** with baseline alignments and hover scale animations.
  - Documented construction, coordinate maps, and brand symbolism inside **[aa_monogram_rationale.md](file:///home/adarsh/.gemini/antigravity-cli/brain/bcd41c6b-ec39-47a9-88ff-bcd1a7d453af/aa_monogram_rationale.md)**.
- **UniversalTech & Academic Employment Entries**:
  - Added new employment records in **[experience.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/experience.json)** for both the Junior Software Developer role and the Software Developer Intern role.
  - Injected 5 detailed project showcases (the React/Express **Enterprise E-Signature Platform** built with Cursor AI, event synchronization engine, custom academy theme, the RESO-aligned **GlobalSpaces Platform** monorepo, the **UFC Custom Blocks & Components Engine**, and the **AI Music Melody Generator** research project) into **[projects.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/projects.json)**, while removing the **Headless WordPress Rendering Core** and **Distributed In-Memory Cache Service** projects. Modified the Motorcycle Safety Academy custom platform project to reference its production website link (`https://motorcyclesafetyacademy.com/`) instead of a repository link.
  - Logged academic and professional certifications in **[certificates.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/certificates.json)**: B.Tech Computer Science degree from **Vishwakarma Institute of Technology, Pune** (8.2 CGPA) and four Anthropic Skilljar credentials (Claude 101, Claude Code 101, Claude Platform 101, and AI Fluency: Framework & Foundations).
  - Implemented dynamic programmatic sorting in **[sorting.ts](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/utils/sorting.ts)** and configured page views (**[Experience.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Experience.tsx)**, **[Home.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Home.tsx)**, **[Projects.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Projects.tsx)**, **[Certificates.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Certificates.tsx)**, and **[Timeline.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Timeline.tsx)**) to automatically sort list elements chronologically (latest at top) on load, making them resilient to variations in raw JSON entry ordering.
  - Incorporated project and academic milestones chronologically into **[timeline.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/timeline.json)** (10+2 HSC graduation from St. Xavier's Junior College in 2020 Q2, research paper published at ICTIS in 2023 Q2, interview preparation and competitive programming throughout 2024, B.Tech graduation in 2025 Q2, internship training starting in January, UFC block engine launch in April, MSA custom plugin starting in July/October, Twilio notifications in October, CSV importer in November, eSign & Adobe integrations in January/February, and GlobalSpaces in March/May/June).
- **Performance & Asset Formats Optimization**:
  - Migrated all portfolio walkthrough and LeetCode profile screenshots references inside **[projects.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/projects.json)** and **[LeetCodeHighlight.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/LeetCodeHighlight.tsx)** from `.png` format to high-performance, compressed `.webp` formats, optimizing total asset load sizes and page speeds.
- **Robust Link Rendering & Structured Schemas**:
  - Updated `ProjectItem` type specifications to mark source repo and live demo URLs as optional.
  - Refactored `ProjectLinksGroup` component and `CaseStudy` page containers to conditionally build SEO meta tags and UI links, avoiding broken endpoints for local/internal projects.
  - Refactored **[ProjectsPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ProjectsPresenter.tsx)** to wrap project cards within a React Router Link, allowing users to click anywhere on the card to view the case study, accompanied by micro-animations on hover.
  - Extended the `ProjectItem` interface in **[project.ts](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/types/project.ts)** to support structured feature showcases, and updated **[CaseStudyPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/CaseStudyPresenter.tsx)** to render dynamic screenshots galleries with text descriptions mapped in browser-styled frame cards for the Motorcycle Safety Academy, the Enterprise E-Signature Platform, the UFC Custom Blocks & Components Engine, and the Event Automation & API Sync Engine projects.
  - Audited all JSON datasets (**[skills.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/skills.json)**, **[projects.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/projects.json)**, and **[experience.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/experience.json)**) to ensure no historical or current reference to the Go/Golang programming language is rendered on the portfolio.
  - Scaled up core text styles inside project cards (**[ProjectsPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ProjectsPresenter.tsx)**), experience blocks (**[ExperiencePresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ExperiencePresenter.tsx)**), and showcase galleries (**[CaseStudyPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/CaseStudyPresenter.tsx)**) by one step on the Tailwind scale (shifting `text-xs` to `text-sm`) to resolve readability concerns for desktop and mobile site visitors.
  - Implemented a query parameter GET filtering system. Clicking "View Details" on any experience card (**[ExperiencePresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ExperiencePresenter.tsx)**) links to `/projects?role=[exp.role]&company=[exp.company]`, where **[Projects.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Projects.tsx)** parses this search query via `useSearchParams` to automatically filter projects by that exact job title, displaying a sticky, floating glassmorphic filter badge for that company (e.g. `Company: UniversalTech`) with a click-to-clear close icon action.
  - Created a reusable **[ScrollToTop.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/molecules/ScrollToTop.tsx)** component mounted in **[MainLayout.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/MainLayout.tsx)**, listening to routing transitions via the `useLocation` hook and calling `window.scrollTo(0, 0)` on route changes to ensure page transitions start at the top of the viewport.
  - Implemented the reusable **[ImageLightbox.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/molecules/ImageLightbox.tsx)** component supporting slide navigation (Next/Prev index shifts restricted to the active feature section group), toggled zoom multipliers, close triggers, and keyboard shortcuts (Left/Right arrows, Escape) with smooth Framer Motion transitions. Mapped this overlay onto the case study screenshots page controllers, and added responsiveness tuning to minimize padding and offsets on mobile viewports.
- **Interactive Navigation & Mobile Animations**:
  - Implemented click-outside close handlers for both desktop dropdowns and the mobile drawer menu inside **[Navbar.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/Navbar.tsx)**.
  - Wrapped the mobile navigation drawer inside Framer Motion's `<AnimatePresence>` to animate height expansion and opacity transitions smoothly.
- **Contact Details & Resume Configuration**:
  - Configured contact form validation inside **[ContactPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ContactPresenter.tsx)** to keep the "Send Message" submit button disabled and display a `not-allowed` cursor state until all required form fields are populated.
  - Updated primary email address inside **[profile.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/profile.json)** to `adarshacharya7830@gmail.com`.
  - Transferred the physical resume document from `Documents/Interview-Preperation/adarsh-acharya-resume-2026.pdf` to the public assets path `public/adarsh-acharya-resume-2026.pdf` and updated its configuration within **[profile.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/profile.json)**.
  - Added the semantic `download` HTML parameter on the resume trigger button in **[HeroPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/HeroPresenter.tsx)** to download the PDF with its correct filename on click.
- **Overall View Persona Integration**:
  - Added new `overall` persona selection to context validation parameters in **[PersonaContext.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/context/PersonaContext.tsx)**, setting it as the default first-time landing experience.
  - Injected general biography, headings, and a comprehensive skill matrix inside **[profile.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/profile.json)** and **[skills.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/skills.json)**.
  - Configured technical skill levels in **[skills.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/skills.json)** to classify non-production skills (React, TypeScript, Redux Toolkit, Node.js, Express, Axios Interceptors, PDF Services, and Cursor AI) honestly under `"Staging"`, while designating PHP, JavaScript, SQL, and Gutenberg blocks as `"Core"` (production level).
  - Configured project, experience, timeline, and certification router views to bypass filtration logic when `activePersona === 'overall'`, displaying all entries collectively.
  - Registered custom Zinc HSL color tokens for the `overall` selector dots inside **[index.css](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/index.css)** and integrated the option into **[PersonaSelector.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/molecules/PersonaSelector.tsx)**.
  - Conditionally hid the "Persona active" pulse status badge inside **[HeroPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/HeroPresenter.tsx)** when the active track is set to `overall`.
  - Refactored **[HeroPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/HeroPresenter.tsx)** to load and render social links dynamically in the exact order specified in **[socials.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/socials.json)**.
  - Created and integrated **[LeetCodeHighlight.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/LeetCodeHighlight.tsx)** on the Home page before recommendations, presenting your LeetCode profile screenshot dynamically wrapped in a mock browser window frame.
  - Configured custom daily re-validation cache strategies for `/static/*` inside **[_headers](file:///home/adarsh/Documents/Portpolio_website/Website_2026/public/_headers)** to ensure updates to documents (such as replacing `resume.pdf`) bypass immutable asset cache limits.
- **Navbar Links Sequence Optimization**:
  - Reordered core page links inside **[navigation.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/navigation.json)**: renamed **Dashboard** to **Home** (`/`) at the beginning, and swapped the sequence of **Contact** and **Timeline** links.
  - Refactored **[Navbar.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/Navbar.tsx)** link partition arrays to render **Home, Experience, Projects, Certifications, Timeline** on the main navigation panel, grouping Articles and Contact inside the "More" dropdown.
- **Medium Blog Article Integration**:
  - Imported three markdown blog posts: **[concurrency-safe-checkouts.md](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/articles/concurrency-safe-checkouts.md)** (overcoming Event Espresso SPCO deadlocks), **[database-performance-caching.md](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/articles/database-performance-caching.md)** (relational database caching and flat tables), and **[sequence-modeling-creative-ai.md](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/articles/sequence-modeling-creative-ai.md)** (Deep LSTM vs. Markov Chain sequence modeling).
  - Cleaned up legacy mock posts by deleting **headless-cms-setup.md** and **api-design-patterns.md** raw contents and index files.
  - Registered slugs and cross-linked related article metadata within the index database **[articles.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/articles.json)**.
  - Linked the raw markdown assets in the static content mapping of **[ArticleDetail.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/ArticleDetail.tsx)** to fix the "article not found" router resolution bug.
  - Extended the `ArticleMeta` type mapping inside **[article.ts](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/types/article.ts)** to support optional Medium and Gist repository links.
  - Refactored **[ArticlesPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ArticlesPresenter.tsx)** footer card actions to conditionally render "Read Medium" and "Read Gist" buttons next to the default article link.
- **Sequential Markdown State-Machine Compiler**:
  - Replaced the simple double-newline splitting in **[markdown.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/utils/markdown.tsx)** with a custom sequential line compiler. This resolves broken/fragmented code block displays by accumulating multi-line structures correctly and ignoring internal blank lines.
  - Implemented custom React mapping for inline elements like bold (`**text**`), inline code (`` `code` ``), and external links (`[text](url)`).
  - Integrated PHP keyterm and comment syntax highlighting.

---

## [0.11.0-navbar] - 2026-07-15

### Added
- Completed **Header UX Refinement & Navbar Redesign**:
  - **Persona Selector Dropdown**: Refactored **[PersonaSelector.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/molecules/PersonaSelector.tsx)** from a wide segmented control panel into a compact, elegant floating dropdown selector displaying track-specific dot indicators.
  - **Secondary Links Grouping**: Updated **[Navbar.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/Navbar.tsx)** to filter core pages (Projects, Experience, Articles, Contact) on the main bar, grouping minor pages (Timeline, Certificates) inside a clean "More" dropdown.
  - **Responsive Visibility**: Shifted the desktop navigation threshold down from `xl` (1280px) to `md` (768px) to provide a rich tablet and laptop header layout.
  - **Click-Outside Listeners**: Deployed hooks on all header dropdown menus to automatically close elements when clicking outside.

---

## [0.10.0-deploy] - 2026-07-15

### Added
- Prepared portfolio codebase for production deployment on **Cloudflare Pages**:
  - **Redirects Fallback**: Created **[_redirects](file:///home/adarsh/Documents/Portpolio_website/Website_2026/public/_redirects)** file containing `/* /index.html 200` to support dynamic client routing refreshes.
  - **Caching and Caching strategies**: Added **[_headers](file:///home/adarsh/Documents/Portpolio_website/Website_2026/public/_headers)** to implement dynamic headers caching control (`max-age=0, must-revalidate` on html/json/xml) and permanent caching (`max-age=31536000, immutable` on hashed assets).
  - **Security Headers**: Integrated XSS Protection, nosniff content tags, and Content-Security-Policy (CSP) headers in `_headers`.
- Generated a production-grade deployment checklist, Wrangler deploy workflows, and dashboard rollback instructions inside **[deployment_playbook.md](file:///home/adarsh/.gemini/antigravity-cli/brain/bcd41c6b-ec39-47a9-88ff-bcd1a7d453af/deployment_playbook.md)**.

---

## [0.9.0-lighthouse] - 2026-07-15

### Added
- Completed comprehensive **production performance & Lighthouse audits optimizations** target:
  - **PWA Manifest**: Created PWA compliance webmanifest **[manifest.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/public/manifest.json)**.
  - **Sitemap & Robots**: Deployed **[robots.txt](file:///home/adarsh/Documents/Portpolio_website/Website_2026/public/robots.txt)** index indexing directives, mapping to dynamic sitemaps.
  - **Social Sharing Previews**: Deployed OpenGraph (`og:image`, `og:type`) and Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) metadata bindings inside **[useDocumentMetadata.ts](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/hooks/useDocumentMetadata.ts)**.
  - **Code-Splitting & Lazy Loading**: Refactored **[routes/index.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/routes/index.tsx)** to load all page views dynamically using `React.lazy()`.
  - **Suspense Boundaries**: Wrapped Outlet routes in **[MainLayout.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/MainLayout.tsx)** with `<React.Suspense>` handlers.
- Reduced initial landing bundle footprint by splitting code into 19 individual modular chunks, optimizing load times and CLS parameters.

---

## [0.8.0-showcase] - 2026-07-15

### Added
- Upgraded **Project Case Study Showcase system** with advanced fields:
  - **Dynamic Video Player**: Supports HTML5 `<video>` segments for project demonstrations.
  - **Screenshots Gallery**: Displays dynamic grids of interface layouts.
  - **System Architecture**: Added dedicated architecture blueprints text blocks.
  - **Roles & Durations**: Renders employment timelines and roles (e.g. *Lead Systems Architect*).
- Refactored **[ProjectsPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ProjectsPresenter.tsx)** to show clean, desaturated summary cards on the main landing listing, drilling down into deep detailed reports.
- Refactored **[CaseStudyPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/CaseStudyPresenter.tsx)** to mount and lay out all technical case study sections.
- Verified TypeScript interface schema definitions in **[project.ts](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/types/project.ts)** and updated **[projects.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/projects.json)** database assets.

---

## [0.7.0-blog] - 2026-07-15

### Added
- Completed **fully scalable Markdown-powered blog engine** integrated into the portfolio content layer:
  - **Clickable Table of Contents (ToC)**: Built a dynamic headings extractor (`extractToc`) in **[ArticleDetailPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ArticleDetailPresenter.tsx)** that renders smooth-scrolling anchors on h2 and h3 elements.
  - **Syntax Highlighting**: Added a lightweight, desaturated regex-based parser inside **[markdown.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/utils/markdown.tsx)** to highlight code keywords, strings, and comments.
  - **Reading Time Estimation**: Dynamic reading time calculates automatically inside **[ArticleDetail.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/ArticleDetail.tsx)** using word-counts.
  - **Real-Time Search & Category Filters**: Added text queries search bar and category selection buttons in **[ArticlesPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ArticlesPresenter.tsx)**.
  - **Related Posts**: Dynamically queries the articles metadata registry to display a "Related Articles" card deck.
  - **Automated RSS Feed & Sitemap XML**: Created a build-lifecycle hook script **[generate-rss.cjs](file:///home/adarsh/Documents/Portpolio_website/Website_2026/scripts/generate-rss.cjs)** that compiles sitemaps and feed channels inside `public/`.
- Updated all models and schemas to enforce typescript validations for the new blog meta tags (`category`, `readingTime`, `relatedSlugs`).

---

## [0.6.0-ux] - 2026-07-15

### Added
- Integrated user experience (UX) refinements, micro-animations, and viewport tools:
  - **Smooth Scrolling**: Configured `scroll-behavior: smooth` base rules inside `src/index.css`.
  - **Scroll Progress Indicator**: Injected a 2px horizontal progress bar in **[MainLayout.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/MainLayout.tsx)** linked to `useScroll` percentage values.
  - **Theme Transitions**: Bound smooth CSS transition effects on background-color and color properties in `src/index.css`.
  - **Typing Animation Atom**: Created **[TypingText.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/atoms/TypingText.tsx)** to render dynamic subtitle terminal sequences.
  - **Boot Loader Screen**: Configured a fading boot loader in `MainLayout.tsx` using `AnimatePresence`.
  - **Scroll Reveal (Intersection Observer)**: Refactored `SkillsPresenter`, `ExperiencePresenter`, `TimelinePresenter`, and `CertificatesPresenter` to use Framer Motion `whileInView` observers.
- Enforced complete accessibility compliance for user motion settings:
  - Added a `prefers-reduced-motion` override query inside `src/index.css` to instantly clamp CSS transition durations.
  - Leveraged Framer Motion's `useReducedMotion` hook inside `PageTransition.tsx` and all presenter views to bypass translations and scale transitions to instant fades when motion reduction is preferred.

---

## [0.5.0-cms] - 2026-07-15

### Added
- Completed **CMS-like database architecture** by decoupling all layout parameters, metadata, and reviews into structured JSON files:
  - **[navigation.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/navigation.json)**: Stores dynamic route paths, labels, and header logo title.
  - **[socials.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/socials.json)**: Indexes social link profiles dynamically queried by the footer.
  - **[testimonials.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/testimonials.json)**: Registers professional recommendations and reviews filtered by persona tracks.
  - **[seo.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/seo.json)**: Stores metadata fallback configurations for all page indexes.
- Created **[TestimonialsPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/TestimonialsPresenter.tsx)** presentation component to render recommendations.
- Refactored **[Navbar.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/Navbar.tsx)** and **[Footer.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/Footer.tsx)** to consume their links and copyrights from `navigation.json` and `socials.json` respectively.
- Refactored all page containers to load titles and descriptions from `seo.json`.

---

## [0.4.0-seo-accessibility] - 2026-07-15

### Added
- Integrated dynamic meta tag indexing using **[useDocumentMetadata.ts](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/hooks/useDocumentMetadata.ts)** custom hook. Sets browser titles, descriptions, keywords, canonical URLs, and OpenGraph targets on page changes.
- Set up **[JsonLd.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/atoms/JsonLd.tsx)** component for JSON-LD structured schema injects:
  - Injected `Person` and `ProfilePage` schemas on the Home route.
  - Injected `CreativeWork` schemas on individual project case study routes.
  - Injected `BlogPosting` schemas on technical blog post detail routes.
- Created reusable presenter molecules to eliminate code duplication:
  - **[TagBadge.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/atoms/TagBadge.tsx)** presentational atom.
  - **[TagBadgeList.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/molecules/TagBadgeList.tsx)** tag arrays mapper.
  - **[ProjectLinksGroup.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/molecules/ProjectLinksGroup.tsx)** standardized code and demo link anchors.
- Added visually hidden screen reader announce wrapper `aria-live="polite"` inside **[MainLayout.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/MainLayout.tsx)** to report active persona changes.
- Implemented **[ContactPresenter.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/components/organisms/ContactPresenter.tsx)** and updated **[Contact.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/pages/Contact.tsx)** to act as a container loading labels and input validators from **[contact.json](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/data/contact.json)**.

---

## [0.3.0-architecture] - 2026-07-15

### Added
- Implemented **Container-Presenter design pattern** across all page components to enforce separation of concerns:
  - Container pages (`Home`, `Projects`, `Experience`, `Articles`, `Timeline`, `Certificates`, `ArticleDetail`, `CaseStudy`) manage active state hooks, load raw JSON datasets, and run context filters.
  - Presenter organisms (`HeroPresenter`, `SkillsPresenter`, `ExperiencePresenter`, `ProjectsPresenter`, `TimelinePresenter`, `CertificatesPresenter`, `ArticlesPresenter`, `ArticleDetailPresenter`, `CaseStudyPresenter`) operate as pure layout elements rendering interfaces from strictly typed props.
- Integrated the shared component `ExperiencePresenter` to serve both the Home page summary view and the detailed Experience timeline view via a `compact` prop toggle.

---

## [0.2.0-dynamic] - 2026-07-15

### Added
- Decoupled content database architecture using JSON schemas for structured datasets:
  - `src/data/profile.json` (Profile metadata and persona-specific copy summaries).
  - `src/data/skills.json` (Skill highlights mapping track proficiency groups).
  - `src/data/experience.json` (Employment milestones tagged by personas).
  - `src/data/projects.json` (Projects metadata containing Problem, Solution, Challenges, Lessons Learned, and future improvement metrics).
  - `src/data/certificates.json` (Verified dev certification structures).
  - `src/data/timeline.json` (Milestone entries for the interactive vertical timeline).
  - `src/data/articles.json` (Blog meta registry).
- Embedded Markdown long-form posts folder `src/data/articles/` with:
  - `headless-cms-setup.md`
  - `api-design-patterns.md`
- Created **[markdown.tsx](file:///home/adarsh/Documents/Portpolio_website/Website_2026/src/utils/markdown.tsx)** parsing utility compiling basic markdown structures into native React components.
- Added dynamic dynamic article detail route `/articles/:slug` mapped inside routing configurations.

### Removed
- Superseded static typescript data mapping file `src/data/portfolioData.ts`.

---

## [0.1.0-planning] - 2026-07-15

### Added
- Root `docs/` structure initialization.
- **Project Overview (`00_Project_Overview.md`)**: Set architecture foundations, Next.js framework selection, styling rules, folder structures, and naming conventions.
- **Requirements Specification (`01_Requirements.md`)**: Established functional capabilities (persona selection engine, component layouts) and non-functional bounds (Performance, WCAG accessibility, technical limits).
- **Design System Guide (`02_Design_System.md`)**: Created typography, spacing scales, HSL color tokens for Dark/Light theme switching, and glassmorphism styling parameters.
- **Component Catalog (`03_Component_List.md`)**: Defined props interfaces and states for Atomic layout blocks.
- **Content Strategy (`04_Content_Guide.md`)**: Drafted persona-specific copy positioning and structured STAR-method technical case study templates.
- **SEO Rules (`05_SEO.md`)**: Detailed metadata rules, Person and CreativeWork JSON-LD models, and semantic tag standards.
- **Deployment Strategy (`06_Deployment.md`)**: Defined Vercel hosting specs, GitHub Actions build validations, and application variables.
- **Future Features (`07_Future_Features.md`)**: Created roadmaps for interactive system visualization, terminal overlays, and open-source contribution guidelines.
- **Phase Execution Prompts (`docs/prompts/`)**: Created development prompts for step-by-step modular iteration from project init to final deployment.
