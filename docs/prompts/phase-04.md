# Phase 4 Prompt: Interactive Project Showcase & Case Studies

## Goal
Implement the dynamic portfolio Project Showcase grid and construct the subroutes for detailed case studies.

---

## Action Steps

### Step 1: Create Case Study Data Modeling
- Create TypeScript types in `src/types/project.ts` for project records:
  - Properties: `slug`, `title`, `tagline`, `description`, `longDescription`, `tags`, `personas`, `gitUrl`, `demoUrl`, `architectureImage` (or flowchart configurations), `challenges`, `results`.
- Define data items inside `src/data/projects.ts` containing the actual project details for each target persona.

### Step 2: Implement Project Showcase Organism
- Create `src/components/molecules/ProjectCard.tsx` following the glassmorphism layout rules.
- Create `src/components/organisms/ProjectsContainer.tsx`.
- Dynamically filter the grid of cards:
  - If a persona is active, prioritize projects matching the active persona.
  - Provide secondary tag filters based on languages (e.g. "React", "Node.js", "WordPress").

### Step 3: Implement Dynamic Case Study Detail Routes
- Create the Next.js dynamic path `src/app/case-studies/[slug]/page.tsx`.
- Enable Static Site Generation (SSG) by exporting `generateStaticParams()` to pre-render case studies at build time.
- Implement `CaseStudyLayout` structure detailing the STAR methodology: Situation & Task, System Architecture (using Mermaid or SVG graphs), Code Implementations, and quantifiable Results.
- Install `mermaid` or utilize SVG maps to represent system designs.

---

## Verification Tasks
1. Check that clicking a project card's "View Case Study" action navigates to `/case-studies/project-slug`.
2. Verify that running `npm run build` generates static HTML files for all case study routes.
3. Test that project filters function correctly, sorting and filtering without causing page jumps.
