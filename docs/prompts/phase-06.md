# Phase 6 Prompt: SEO Optimization, Accessibility & Performance Audits

## Goal
Implement SEO optimizations, schema structured data, full WCAG 2.1 accessibility compliance, and run local audits.

---

## Action Steps

### Step 1: Set up Metadata & Canonical Paths
- Refactor `src/app/layout.tsx` and case study pages to utilize the Next.js `Metadata` API.
- Compute dynamic page titles and OpenGraph tags matching the configurations detailed in the [SEO Strategy](file:///home/adarsh/Documents/Portpolio_website/Website_2026/docs/05_SEO.md).
- Create automated `robots.txt` and `sitemap.ts` dynamic generators under `src/app/`.

### Step 2: Inject Structured Schema Graphs (JSON-LD)
- Create a reusable JSON-LD component: `src/components/atoms/JsonLd.tsx`.
- Inject the structured schema graphs:
  - `ProfilePage` and `Person` schema arrays on the main home landing route.
  - `CreativeWork` schemas on the case-study subpages.

### Step 3: Accessibility Audit & Remediations
- Verify all interactive controls are fully focusable and navigable via keyboard (Tab and Enter/Space triggers).
- Check that focus indicator outlines are visible and clear.
- Validate that all image tags implement descriptive `alt` tags.
- Review contrast ratios against WCAG 2.1 AA targets.

### Step 4: Asset Optimization
- Run Lighthouse audits. Ensure all image files use Next.js `next/image` to prevent CLS.
- Enable code-splitting and optimize imports of third-party libraries.

---

## Verification Tasks
1. Check that `<head>` sections output valid meta definitions, matching canonical pages.
2. Paste page layouts in the Schema Markup Validator to verify the Person/CreativeWork structures compile without errors.
3. Tab through the application manually, confirming that all interactions are accessible without mouse hardware.
