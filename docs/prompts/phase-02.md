# Phase 2 Prompt: Navigation, Theme & Persona Routing Systems

## Goal

Build the state-management systems that govern the active recruiter persona and visual theme. Implement the site navigation and toggle controls.

---

## Action Steps

### Step 1: Create Global Contexts & Custom Hooks

- **Persona Context (`src/context/PersonaContext.tsx`)**:
  - Keep track of the active persona type: `'swe' | 'backend' | 'fullstack' | 'wordpress'`.
  - Provide a function to update the active role.
- **Theme Context (`src/context/ThemeContext.tsx`)**:
  - Manage visual theme states: `'dark' | 'light' | 'system'`.
  - Sync the active setting as an attribute on the root HTML element (`data-theme="light"` or `data-theme="dark"`).
- **Hooks**:
  - Build `useLocalStorage` to persist selections.
  - Implement a mechanism to sync the active persona context with URL search parameters (e.g., loading `?role=backend` automatically selects the backend persona).

### Step 2: Implement Core Header Molecules

- **Theme Switcher (`src/components/molecules/ThemeSwitcher.tsx`)**:
  - Accessible toggle control with appropriate ARIA states.
- **Persona Selector (`src/components/molecules/PersonaSelector.tsx`)**:
  - Horizontal selector bar demonstrating smooth highlight transitions. Clicking updates the active global persona.

### Step 3: Implement Navbar Header Organism

- **Navigation Header (`src/components/organisms/NavbarHeader.tsx`)**:
  - Place logo, links, persona, and theme controls.
  - Create a responsive drawer to transition controls for mobile layouts cleanly.
- Wrap the app layout (`src/app/layout.tsx`) inside the context providers.

---

## Verification Tasks

1. Verify that changing the active persona updates the URL parameter (`?role=...`).
2. Verify that reloading a URL with a query parameter initializes the correct persona view.
3. Test that switching the theme toggles the root `data-theme` attribute and color variables correctly shift.
