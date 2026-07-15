# Phase 3 Prompt: Hero & Dynamic Skills Matrix

## Goal
Implement the dynamic persona-driven Hero section and the interactive, filterable Skills Matrix grid.

---

## Action Steps

### Step 1: Create Data Schemas & Configurations
- Create a data file `src/data/skills.ts` containing the structural list of engineering competencies.
- Model each skill with properties: `id`, `name`, `category` (frontend/backend/cms/devops), `level` (core/intermediate), and an array of `persona` tags indicating relevance.
- Define persona-specific copy entries (titles, subheadings, bio summaries) inside `src/data/personas.ts`.

### Step 2: Implement Hero Section Organism
- Create `src/components/organisms/HeroSection.tsx`.
- Connect the component to `usePersonaContext`.
- Render dynamic text based on the active role, employing micro-animations (e.g. Framer Motion fade-ins or CSS keyframes) to animate transitions when the persona changes.

### Step 3: Implement Skills Matrix Grid
- Create `src/components/atoms/Badge.tsx` and `src/components/molecules/SkillCard.tsx`.
- Create `src/components/organisms/SkillsContainer.tsx`.
- Implement a filter bar grouping skills by category (e.g., "All", "Backend", "Frontend", "CMS", "DevOps").
- Highlight or rearrange skill cards depending on the active persona context (e.g., if "Backend" is active, backend-oriented skill cards automatically highlight or elevate to the top).

---

## Verification Tasks
1. Select the "Backend Engineer" persona and confirm that backend copy renders in the Hero section.
2. Select "WordPress Engineer" and confirm the Skills Matrix highlights CMS/PHP skills.
3. Test that skill filtering filters correctly and the transition layouts behave smoothly.
