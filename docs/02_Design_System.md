# Design System Documentation

This design system is implemented strictly using **CSS Custom Properties** (Variables) and **CSS Modules**. It enforces visual harmony, accessible color contrast, and fluid micro-interactions across both dark and light modes.

---

## 1. Color Palette

The color system is defined in HSL (Hue, Saturation, Lightness) to allow easy alpha-channel transparency overlays and smooth theme calculations.

### Theme Variables (`src/styles/variables.css`)

```css
:root {
  /* --- Dark Theme (Default) --- */
  --bg-primary-hsl: 222, 47%, 11%;      /* Deep Blue/Gray Slate */
  --bg-secondary-hsl: 223, 47%, 16%;    /* Slightly Lighter Card Slate */
  --bg-tertiary-hsl: 224, 47%, 21%;     /* Focus/Hover Slate */
  
  --text-primary-hsl: 210, 40%, 98%;    /* Ice White */
  --text-secondary-hsl: 215, 20%, 75%;  /* Muted Silver */
  --text-muted-hsl: 217, 10%, 55%;      /* Darker Gray */

  --accent-primary-hsl: 263, 90%, 65%;  /* Electric Violet */
  --accent-secondary-hsl: 187, 100%, 42%;/* Neon Teal */
  --accent-alert-hsl: 350, 89%, 60%;    /* Coral Red */

  --border-hsl: 223, 20%, 22%;
  --shadow-color: rgba(0, 0, 0, 0.4);

  /* Persona Specific Highlights */
  --persona-swe-hsl: 263, 90%, 65%;      /* Violet */
  --persona-backend-hsl: 200, 95%, 55%;  /* Sky Blue */
  --persona-fullstack-hsl: 160, 84%, 45%;/* Emerald */
  --persona-wordpress-hsl: 28, 90%, 55%;  /* WordPress Orange */
}

@media (prefers-color-scheme: light) {
  :root[data-theme="system"] {
    /* Auto-switch to light theme custom properties if system is light */
    --bg-primary-hsl: 210, 40%, 98%;
    --bg-secondary-hsl: 0, 0%, 100%;
    --bg-tertiary-hsl: 210, 40%, 94%;
    
    --text-primary-hsl: 222, 47%, 11%;
    --text-secondary-hsl: 215, 25%, 27%;
    --text-muted-hsl: 215, 16%, 47%;

    --border-hsl: 214, 32%, 91%;
    --shadow-color: rgba(0, 0, 0, 0.05);
  }
}

:root[data-theme="light"] {
  --bg-primary-hsl: 210, 40%, 98%;
  --bg-secondary-hsl: 0, 0%, 100%;
  --bg-tertiary-hsl: 210, 40%, 94%;
  
  --text-primary-hsl: 222, 47%, 11%;
  --text-secondary-hsl: 215, 25%, 27%;
  --text-muted-hsl: 215, 16%, 47%;

  --border-hsl: 214, 32%, 91%;
  --shadow-color: rgba(0, 0, 0, 0.05);
}
```

---

## 2. Typography

The portfolio utilizes Google Fonts:
- **Outfit**: A modern, clean geometric sans-serif for headings.
- **Inter**: An optimized, highly readable sans-serif for body text, data, and user interface.
- **Fira Code**: Monospace font for code segments, API paths, and data matrices.

### Font Scale and Line Heights

| Name | Font-Family | Size (rem) | Line-Height | Weight | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | Outfit | 2.5rem | 1.2 | 700 / 800 | Page Hero Headline |
| **H2** | Outfit | 1.85rem | 1.3 | 600 / 700 | Major Sections |
| **H3** | Outfit | 1.35rem | 1.4 | 600 | Cards and Sub-headings |
| **Body** | Inter | 1.0rem | 1.6 | 400 | Article text / Bio |
| **Body Small**| Inter | 0.875rem | 1.5 | 400 | Dates / Muted Metadata |
| **Code** | Fira Code | 0.9rem | 1.4 | 400 / 600 | Inline code, schemas |

---

## 3. Spacing Grid

A 4px-based dynamic spacing system is implemented for layout and component sizing.

```css
:root {
  --space-2xs: 0.25rem;  /* 4px */
  --space-xs:  0.5rem;   /* 8px */
  --space-sm:  0.75rem;  /* 12px */
  --space-md:  1.0rem;   /* 16px */
  --space-lg:  1.5rem;   /* 24px */
  --space-xl:  2.0rem;   /* 32px */
  --space-2xl: 3.0rem;   /* 48px */
  --space-3xl: 4.0rem;   /* 64px */
}
```

---

## 4. UI Polish & Visual Accents

### Glassmorphism Card Style
To achieve a premium, high-tech aesthetic, primary cards must implement a subtle glassmorphism effect:
```css
.card {
  background: hsla(var(--bg-secondary-hsl), 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid hsla(var(--border-hsl), 0.5);
  box-shadow: 0 8px 32px 0 var(--shadow-color);
  border-radius: var(--space-sm);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  border-color: hsla(var(--accent-primary-hsl), 0.5);
  transform: translateY(-4px);
}
```

### Micro-Animations
- **Hover Transitions**: Transitions on color, borders, and shadows must use `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`.
- **Active State Scale**: Interactive elements (like the theme toggles or buttons) should shrink slightly on press: `transform: scale(0.97)` to mimic physical buttons.
- **Fade-In Sequence**: As pages render, list elements and grid sections must stagger fade in from bottom-to-top (`translateY(20px)` to `translateY(0)`).
