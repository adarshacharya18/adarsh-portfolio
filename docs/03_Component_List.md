# Component Catalog & Specifications

This document catalogs and specifies the structural components of the portfolio, adhering to a strict Atomic Design pattern modified for Next.js.

---

## 1. Atoms (Base Components)

### 1.1 `Button`

- **Description**: Standard interactive clickable element.
- **Props**:
  - `variant: 'primary' | 'secondary' | 'ghost' | 'accent'`
  - `size: 'sm' | 'md' | 'lg'`
  - `loading?: boolean`
  - `icon?: React.ReactNode`
  - `iconPosition?: 'left' | 'right'`
- **Key States**: Focus (ring highlight), Hover (subtle shift/darkening), Disabled (opacity, cursor forbidden).

### 1.2 `Badge`

- **Description**: Static or interactive tag display for skills, roles, and project metadata.
- **Props**:
  - `label: string`
  - `variant?: 'default' | 'highlight' | 'persona'`
  - `onClick?: () => void` (optional, for clickable filter badges)
- **Key States**: Active/Inactive (for tags selection).

### 1.3 `InputField` / `TextAreaField`

- **Description**: Accessible form components with semantic wrappers.
- **Props**:
  - `label: string`
  - `error?: string`
  - `id: string`
  - standard native input / textarea attributes.
- **Key States**: Active, Error, Success, Disabled.

---

## 2. Molecules (Composite Elements)

### 2.1 `PersonaSelector`

- **Description**: A multi-segmented toggle allowing visitors to choose their active persona role.
- **State**: Tracked via `PersonaContext`.
- **Interactions**: Clicking a role updates the context, changes local storage, updates the URL search query, and triggers a layout animation inside the toggle indicator.

### 2.2 `ThemeSwitcher`

- **Description**: A toggle button supporting 'Light', 'Dark', and 'System' theme options.
- **State**: Client-side selection that binds to the document element attribute (`data-theme="light"`).
- **Accessibility**: Screen-reader friendly with dynamic `aria-label` stating the current active setting.

### 2.3 `SkillCard`

- **Description**: Represents a single technical skill, showcasing the technology name, icon, and a relative rating/experience bracket.
- **Animations**: Staggered zoom-in on page render. Scale-up and shadow expansion on hover.

### 2.4 `ProjectCard`

- **Description**: Displays a summary of a portfolio project. Includes project name, description, tags, and action buttons ("View Case Study", "GitHub").
- **Persona Context**: Changes highlight color and tag visibility based on the active recruiter persona.

---

## 3. Organisms (Core Sections)

### 3.1 `NavbarHeader`

- **Description**: Floating responsive site header containing the logo, navigation links, `PersonaSelector`, and `ThemeSwitcher`.
- **Responsive Layout**: Collapses into an accessible mobile slide-out menu on smaller screen sizes.

### 3.2 `HeroSection`

- **Description**: The focal point of the landing page. It holds the dynamic headline, persona-specific bio, and action buttons.
- **State/Props**: Subscribes to `PersonaContext` to run clean entry text animations when the selected role is switched.

### 3.3 `SkillsContainer`

- **Description**: The skill matrix section. Groups and displays instances of `SkillCard` organized by domains (Frontend, Backend, CMS, Infrastructure).
- **Interactions**: Features a filter toolbar allowing recruiters to drill down into specific sub-skills.

### 3.4 `ProjectsContainer`

- **Description**: A grid of `ProjectCard` instances.
- **Sorting/Filtering**: Dynamically filters projects according to the user-selected persona and selected skill tags.

### 3.5 `WordPressFeed`

- **Description**: Fetches recent articles or code reviews from a headless WordPress instance using `fetch` with an ISR (Incremental Static Regeneration) cache config. Shows fallback mock cards if the WordPress database is unreachable.

### 3.6 `ContactFormSection`

- **Description**: The form layout section. Manages client validation rules, submit states, success/failure notifications.
- **Backend Communication**: Submits contact requests via an asynchronous HTTP POST request to `/api/contact`.
