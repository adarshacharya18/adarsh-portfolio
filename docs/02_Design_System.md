# Design System: Calm, Minimal & Professional

This document defines the visual architecture of the portfolio, tailored to reflect a calm, hardworking, adaptive, and highly focused professional identity. The aesthetics are inspired by Apple, Linear, Raycast, Vercel, and GitHub, emphasizing content readability, generous spacing, low-contrast accents, and subtle motion over flashy styles.

---

## 1. Aesthetic Rationale & Decisions

| Decision | Selection | Rationale |
| :--- | :--- | :--- |
| **No Flashy Gradients** | Pure Solids & Soft Borders | Gradients draw attention away from engineering content. Solid colors and thin, muted borders keep the user focused. |
| **No Neon Colors** | Desaturated, Muted Earth & Zinc | Soft, natural zincs and low-saturation accents are calm on the eyes and convey maturity. |
| **No Global Glassmorphism** | Solid Flat Backgrounds | Glassmorphic blur is visually heavy. Solid card backgrounds align with the strict layouts of Linear and Vercel. |
| **Low Contrast Accents** | Monochromatic Gray Scales | Elements blend harmoniously. Accessibility contrast targets (WCAG AA) are met through font weights and scale rather than harsh color pairings. |
| **Generous Spacing** | Expanded Grid (base 8px) | Blank space creates room to breathe, reducing cognitive load for visitors parsing technical content. |
| **Soft Shadows** | Diffused, Low-Opacity Drops | Mimics natural physical elevation without creating heavy dark edges. |
| **Subtle Motion** | Fast Durations (150ms), Ease-Out | Motion is only used for micro-feedback (like hovering interactive items), avoiding distracting layouts. |

---

## 2. Typography Scale

Following a strict typographic scale ensures consistency across body copy, lists, and headings:

- **Font Family**:
  - **Headings & UI**: `Inter`, `system-ui`, `-apple-system`, sans-serif (Clean, neutral neo-grotesque).
  - **Code & Metadata**: `Fira Code`, `ui-monospace`, monospace (Monospaced, precise, tabular).
- **Scale**:
  - `text-2xs` (0.75rem / 12px): Very small metadata, dates, or small badges.
  - `text-xs` (0.875rem / 14px): Input labels, tooltips, sub-badges.
  - `text-base` (1.0rem / 16px): Main body copy, button labels.
  - `text-lg` (1.125rem / 18px): Cards headers, sub-headings.
  - `text-xl` (1.25rem / 20px): Section headers.
  - `text-2xl` (1.5rem / 24px): Sub-hero, large section headers.
  - `text-4xl` (2.25rem / 36px): Page level title (Hero).
- **Line Heights**:
  - Headings: `1.2` to `1.3` (tight)
  - Body Copy: `1.6` (generous for reading)

---

## 3. Spacing Scale

Based on an 8px (0.5rem) baseline grid to preserve clean proportions:

| Key | Value (rem) | Value (px) | Application |
| :--- | :--- | :--- | :--- |
| `space-1` | 0.25rem | 4px | Internal badge padding, inline spacing |
| `space-2` | 0.5rem | 8px | Button vertical padding, label gaps |
| `space-3` | 0.75rem | 12px | Input padding, minor element gaps |
| `space-4` | 1.0rem | 16px | Button horizontal padding, small gaps |
| `space-6` | 1.5rem | 24px | Card padding, standard item spacing |
| `space-8` | 2.0rem | 32px | Grid spacing, medium sections |
| `space-12`| 3.0rem | 48px | Large component spacing, section gaps |
| `space-16`| 4.0rem | 64px | Hero vertical spacing |

---

## 4. Color Palette & Dark Mode Tokens

A zinc-based monochrome palette that naturally adapts to dark and light modes. Accent tones are kept low in saturation to represent different professional developer views:

### Core Palette Tokens

```css
:root {
  /* --- Dark Mode (Default) --- */
  --bg-primary: #09090b;       /* Zinc 950 */
  --bg-secondary: #18181b;     /* Zinc 900 */
  --bg-tertiary: #27272a;      /* Zinc 800 */
  
  --text-primary: #fafafa;     /* Zinc 50 */
  --text-secondary: #a1a1aa;   /* Zinc 400 */
  --text-muted: #71717a;       /* Zinc 500 */
  
  --border-primary: #27272a;   /* Zinc 800 */
  --border-focus: #52525b;     /* Zinc 600 */

  /* Muted Persona Accents (Low Saturation) */
  --persona-swe: #e4e4e7;       /* Zinc 200 */
  --persona-backend: #90a4ae;   /* Slate/Blue Gray */
  --persona-fullstack: #a5d6a7; /* Muted Sage Green */
  --persona-wordpress: #d7ccc8; /* Muted Sand/Brown */
}

html.light {
  /* --- Light Mode --- */
  --bg-primary: #fafafa;       /* Zinc 50 */
  --bg-secondary: #ffffff;     /* White */
  --bg-tertiary: #f4f4f5;      /* Zinc 100 */
  
  --text-primary: #09090b;     /* Zinc 950 */
  --text-secondary: #52525b;   /* Zinc 600 */
  --text-muted: #71717a;       /* Zinc 500 */
  
  --border-primary: #e4e4e7;   /* Zinc 200 */
  --border-focus: #a1a1aa;     /* Zinc 400 */

  /* Persona Accents (Slightly Darker to preserve contrast in light mode) */
  --persona-swe: #3f3f46;       /* Zinc 700 */
  --persona-backend: #37474f;   /* Dark Slate Blue */
  --persona-fullstack: #2e7d32; /* Deep Sage Green */
  --persona-wordpress: #5d4037; /* Deep Sand Brown */
}
```

---

## 5. Elevation & Shadow System

Elevation is defined through a combination of background color hierarchy and highly diffused, low-opacity shadows.

- **Flat (Base Level)**: `var(--bg-primary)`. No shadow.
- **Level 1 (Cards, Controls)**: `var(--bg-secondary)` with `var(--border-primary)` outline and a soft shadow:
  - `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)`
- **Level 2 (Popovers, Navigation Panels)**: `var(--bg-tertiary)` with a slightly larger shadow:
  - `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07)`

---

## 6. Layout Metrics

- **Container Widths**:
  - Page Content: Maximum `1200px` (`max-w-7xl` in Tailwind/standard class)
  - Detail Reading / Case Studies: Maximum `768px` (`max-w-3xl`) to support optimal reading line length.
- **Border Radius**:
  - Small Controls (Buttons, Inputs, Badges): `6px` (Highly professional, sharp yet clean).
  - Large Elements (Cards, Nav panels): `10px`.
- **Icon Sizing**:
  - Inline UI Icons: `16px` (`w-4 h-4`)
  - Large Section Icons: `24px` (`w-6 h-6`)
- **Animations / Transition Durations**:
  - Micro-interactions (hovers, focus fades): `150ms` using `cubic-bezier(0.16, 1, 0.3, 1)` (Raycast-inspired snappy response).

---

## 7. Component Styling Specifications

### 7.1 Buttons
- **Base Style**: Monospace or clean sans font, border-radius `6px`, padding `py-2 px-4`.
- **Variants**:
  - *Primary*: Solid neutral dark in light mode, solid neutral light in dark mode. Low contrast focus border.
  - *Secondary*: Transparent background with thin outline (`var(--border-primary)`) and very subtle hover change (`bg-bg-tertiary`).
  - *Ghost*: Transparent, subtle hover background color.

### 7.2 Cards
- **Base Style**: Solid background (`var(--bg-secondary)`), thin border (`var(--border-primary)`), border-radius `10px`, spacing padding `space-6`.
- **Interaction**: Soft lift on hover (`translate-y-[-1px]`) and border color transition to `var(--border-focus)`. No gradients or blurs.

### 7.3 Inputs
- **Base Style**: Background (`var(--bg-primary)`), border (`var(--border-primary)`), border-radius `6px`, padding `space-3`.
- **Focus**: Border shifts to `var(--border-focus)` with a minimal ring matching the active persona's accent color (low saturation).
