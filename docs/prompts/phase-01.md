# Phase 1 Prompt: Project Initialization & Styling Infrastructure

## Goal

Set up the workspace repository structure, configure dependency tools, initialize Next.js with TypeScript, and define the core design system variables in global styles.

---

## Action Steps

### Step 1: Initialize Next.js Application

- Run the Next.js CLI initializer to spin up a clean project:
  ```bash
  npx -y create-next-app@latest ./ --ts --src-dir --eslint --app --tailwind false --import-alias "@/*"
  ```
  _(Note: Tailwind is explicitly set to false to support vanilla CSS modules)._

### Step 2: Establish Project Folder Structure

- Ensure directories exist matching our project design guidelines:
  - `src/components/atoms`
  - `src/components/molecules`
  - `src/components/organisms`
  - `src/styles`
  - `src/context`
  - `src/hooks`
  - `src/types`
  - `src/utils`

### Step 3: Implement Global Design System Styles

- Create `src/styles/variables.css` containing the color scales, typography rules, and padding scales defined in the [Design System Guide](file:///home/adarsh/Documents/Portpolio_website/Website_2026/docs/02_Design_System.md).
- Create `src/styles/globals.css` containing standard resets (margin zero, box-sizing border-box, link resets) and import `variables.css`.
- In `src/app/layout.tsx`, import `@/styles/globals.css`. Ensure font families are loaded optimally using `next/font/google` (Outfit for headings, Inter for body text).

---

## Verification Tasks

1. Check that `npm run build` runs successfully with zero compilation warnings.
2. Confirm that fonts are correctly applied to the HTML rendering and CSS variables are discoverable in browser inspector tools.
