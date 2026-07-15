# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
