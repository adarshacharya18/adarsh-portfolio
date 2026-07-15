# Requirements Specification

## 1. Functional Requirements

The portfolio must deliver a tailored experience to different recruiter personas while maintaining a cohesive and interactive user interface.

### 1.1 Persona-Switching Engine
- **Core Functionality**: A global, persistent control that allows the user to switch between four distinct views:
  1. **Software Engineer (Generalist)**
  2. **Backend Engineer**
  3. **Full Stack Developer**
  4. **WordPress Engineer**
- **Dynamic Content Injection**: Switching a persona must dynamically re-arrange, filter, and adapt the following:
  - Hero statement, subheading, and bio text.
  - Featured projects list (e.g., showing database systems for Backend, custom plugins for WordPress, interactive apps for Full Stack).
  - Tech stack skill matrix groupings and highlight accents.
  - Custom career roadmap timeline cards.
- **State Management**: The persona state must be synchronized with:
  - React state / context for instant transitions.
  - LocalStorage to persist preferences across page refreshes.
  - URL query parameters (e.g., `?role=backend`) to allow direct linking for targeted job applications.

### 1.2 Core Sections
- **Hero & Headline**: An impactful introduction showcasing the active persona, with micro-animations on text and layout.
- **Skills Matrix**: An interactive grid grouping technical skills by category, showcasing expertise level (e.g., Core, Intermediate, Familiar) and providing tags (e.g., "Backend", "Frontend", "WordPress"). Clicking a tag highlights related skills.
- **Project Showcase**:
  - Filterable by tech stack tags and persona applicability.
  - Detailed modal view or subpage case studies showing code snippets, architecture diagrams, and problem-solving process.
- **Professional Journey Timeline**: A chronological list of experiences, including software engineer roles, custom theme design, and server-side engineering.
- **Headless WordPress Blog Feed**:
  - A component fetching blog posts from a headless WordPress instance (or fallback local MD data structure) to prove API integration capabilities.
- **Contact Form**:
  - Fully validated client-side and server-side contact form.
  - Email dispatching through a serverless function (e.g., Next.js API route integrating with Resend or Formspree).

---

## 2. Non-Functional Requirements

### 2.1 Performance & Core Web Vitals
- **Lighthouse Scores**: Must target >= 95 across all metrics (Performance, Accessibility, Best Practices, SEO).
- **Time to Interactive (TTI)**: < 1.5 seconds on a fast 3G network.
- **Largest Contentful Paint (LCP)**: < 2.0 seconds.
- **Cumulative Layout Shift (CLS)**: 0.0 (no layout jumps during rendering or loading states).
- **Image Optimization**: All images must use modern formats (WebP, AVIF) with explicit size declarations to prevent layout shifts.

### 2.2 Accessibility (a11y)
- **Standard**: Full compliance with WCAG 2.1 Level AA.
- **Keyboard Navigation**: All interactive elements (buttons, inputs, toggles) must be accessible via Tab key with a visible outline focus state.
- **Screen Reader Compatibility**: Use semantic HTML elements and appropriate ARIA attributes (`aria-expanded`, `aria-label`, `aria-live`).
- **Contrast Ratios**: Standard text must exceed 4.5:1 ratio; large text must exceed 3:1 ratio.

### 2.3 Browser Compatibility
- Must render and function correctly on major modern web browsers: Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and mobile variations (iOS/Android).

---

## 3. Technical Constraints

- **Single-Page Simplicity with Subpages**: The main dashboard should be a dynamic single-page experience, but deep-linked case studies must reside on clean, statically generated subroutes (e.g., `/case-studies/custom-plugin`).
- **Zero Heavy Framework Styles**: Do not use Tailwind, Bootstrap, or other utility CSS frameworks. All styles must use Vanilla CSS Modules to showcase solid grasp of raw layout engines (Grid, Flexbox, Custom Properties, Media Queries).
- **Serverless Form Handling**: The contact form must not depend on a running node database. It must utilize secure, stateless serverless functions.
