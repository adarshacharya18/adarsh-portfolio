# Portfolio Domain Context

This file serves as the definitive glossary and domain model mapping for the portfolio architecture. It defines the shared vocabulary used across the codebase to ensure high locality and consistent design.

## Core Domain Concepts

### Persona-Curated Feeds
**Description:** The centralized data pipeline that delivers content (Projects, Experience, Certificates) to the view layer. 
**Architecture Constraints:** 
- The feed must be strictly **synchronous** to maximize static-site performance. 
- The view layer must never manually filter content. Instead, it must consume feeds through the `usePersonaContent` adapter, which encapsulates the domain logic for mapping the `activePersona` to the raw data sources.
- This creates a deep seam that protects React components from data-querying complexities.

### Active Persona
**Description:** The currently selected target audience profile (e.g., 'swe', 'backend', 'fullstack'). It drives the filtering logic across all Persona-Curated Feeds.

### Global Scroll Engine
**Description:** The centralized, hardware-accelerated scroll tracking module.
**Architecture Constraints:**
- Must bypass React state updates (re-renders) completely.
- Operates strictly via Framer Motion `MotionValue`s to ensure maximum 60fps performance across the view layer.
- Other components needing scroll physics should subscribe to this engine rather than adding their own DOM event listeners.
