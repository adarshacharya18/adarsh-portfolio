# Future Roadmap & Extensibility Guide

This document lists candidate features for upcoming development cycles and outlines how developers can extend the portfolio's functionality.

---

## 1. Feature Roadmap

### Phase 1: Interactive System Architecture Playground

- **Description**: Add a canvas or SVG-based interactive playground where recruiters can simulate architectural load.
- **Features**: Toggle database replication models, introduce latency in caching node loops, or trace request routing (client -> load balancer -> serverless api -> redis).
- **Benefit**: Demonstrates raw systems design competency for Backend role profiles.

### Phase 2: Live telemetry widgets (GitHub, NPM, WordPress.org)

- **Description**: Replace static stats widgets with live, client-side caching fetch routines.
- **Integrations**:
  - GitHub API: Fetch contribution graphs, commit counts, and stargazers.
  - NPM API: Fetch package download totals for public packages.
  - WordPress.org API: Retrieve active installations and reviews of custom plugins.

### Phase 3: Developer Terminal Overlay

- **Description**: An interactive terminal emulator toggled by a hotkey (e.g., `` ` ``).
- **Supported Commands**: `help`, `cat bio`, `npm run test`, `theme dark`, `clear`, `contact "Message text"`.
- **Benefit**: Serves as a fun developer-centric Easter egg showing frontend logic capability.

---

## 2. Guide for Extensions & Future Contributors

To scale the portfolio with team support or open-source reviews, contributors must follow these processes.

### Code Style Enforcement

Before submitting a change, run the formatting validation commands:

```bash
npm run format && npm run lint
```

Code will not merge if it fails style parameters or strict TypeScript compiles.

### Branching Policy

- **Features**: Branch names should read `feature/issue-shortdesc` (e.g., `feature/terminal-overlay`).
- **Fixes**: Branch names should read `bugfix/issue-shortdesc` (e.g., `bugfix/theme-flicker`).
- Keep branch commits scoped to a single logical improvement.

### Case Study Entry Guide

To add a new project:

1. Open `src/data/projects.ts`.
2. Define a new project entity following the `Project` type contract.
3. Supply appropriate `persona` tags so the project shows under corresponding views:
   ```typescript
   personas: ['backend', 'fullstack'];
   ```
4. Create the corresponding case study details page markdown under `src/content/case-studies/project-name.md`.
5. Run the build to ensure routes are pre-compiled during build execution.
