# Search Engine Optimization (SEO) Strategy

This document outlines the SEO rules and markup practices implemented in the portfolio to maximize search visibility for engineering roles.

---

## 1. Dynamic Meta Configuration

Metadata must be dynamically computed based on the page route and any active query parameter. Next.js `generateMetadata` API is utilized to serve static meta tags to crawlers.

### Persona Meta Profiles

- **General (Default)**:
  - *Title*: `[Name] | Senior Software Engineer Portfolio`
  - *Description*: `Explore [Name]'s engineering portfolio showcasing full-stack applications, scalable systems, and clean coding architectures.`
- **Backend Engineer**:
  - *Title*: `[Name] | Senior Backend Engineer Portfolio`
  - *Description*: `Backend engineering portfolio of [Name]. High-performance REST/GraphQL APIs, database architectures, system optimization, and DevOps.`
- **Full Stack Developer**:
  - *Title*: `[Name] | Full Stack Developer Portfolio`
  - *Description*: `Full stack development portfolio of [Name], showcasing responsive user interfaces, custom components, and serverless architectures.`
- **WordPress Engineer**:
  - *Title*: `[Name] | Senior WordPress Engineer & Developer`
  - *Description*: `WordPress portfolio of [Name]. Custom plugins, performant Gutenberg blocks, custom theme architectures, and headless WP setups.`

---

## 2. Structured Data (JSON-LD)

To help search engines construct rich snippets, the portfolio injects JSON-LD schemas into the document body.

### Person & ProfilePage Schema (Home Page)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "[Name]",
    "jobTitle": "Senior Software Engineer",
    "url": "https://[your-domain].com",
    "sameAs": [
      "https://github.com/[username]",
      "https://linkedin.com/in/[username]"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Backend Architecture",
      "Full Stack Development",
      "WordPress Engineering",
      "TypeScript",
      "React",
      "PHP"
    ]
  }
}
```

### CreativeWork Schema (Case Studies)

Each project page must render a `CreativeWork` (specifically `SoftwareSourceCode` or `WebSite`) schema:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "[Project Name]",
  "description": "[Project Description]",
  "codeRepository": "https://github.com/[username]/[repo]",
  "programmingLanguage": ["TypeScript", "React", "CSS Modules"],
  "author": {
    "@type": "Person",
    "name": "[Name]"
  }
}
```

---

## 3. Semantic HTML Guidelines

To ensure screen readers and crawlers parse site hierarchy accurately, components must conform to standard semantic structures:

- **Site Header**: Wrap inside `<header>` containing `<nav>`.
- **Hero & Content Blocks**: Main landing content wrapped inside `<main>`. Use nested `<section>` elements with corresponding heading IDs.
- **Section Headings**:
  - A single `<h1>` tag per page (in the Hero component).
  - Component section headers must use `<h2>`.
  - Nested card elements must use `<h3>` or standard descriptive elements.
- **Project Items**: Wrap inside `<article>` tags.
- **Links**: Avoid empty anchors or `href="#"`. Ensure all links have descriptive text rather than "Click Here" or "Read More".
- **Unique Element IDs**: Ensure all forms, select buttons, and key interactive sections have unique IDs (e.g., `id="btn-persona-backend"`, `id="form-contact-input"`). This allows crawlers and testing utilities (like Playwright) to target them cleanly.
