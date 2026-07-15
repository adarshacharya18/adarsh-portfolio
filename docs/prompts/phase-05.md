# Phase 5 Prompt: Serverless Contact Form & Headless Blog Feed

## Goal
Implement the validation-backed contact form with a serverless API routing handler, and build a headless CMS blog feed integration.

---

## Action Steps

### Step 1: Create serverless API Contact Route
- Create Next.js serverless route `src/app/api/contact/route.ts`.
- Implement API request validation (check email format, name, and message completeness).
- Add email integration (e.g. using `resend` SDK or secure SMTP transport). If keys are absent, fallback to logging the message in development so tests pass cleanly without external network dependency.

### Step 2: Implement Contact Form Section
- Create form elements: `InputField.tsx`, `TextAreaField.tsx`.
- Create `src/components/organisms/ContactFormSection.tsx`.
- Handle client-side validation rules (e.g., email syntax verification, mandatory fields).
- Implement interactive states: loading spin, error messages, and success message dialogs.

### Step 3: Implement Headless WordPress Blog Feed
- Create `src/components/organisms/WordPressFeed.tsx`.
- Write fetch calls to request published posts:
  - Connect to dynamic endpoints using WP REST API `wp-json/wp/v2/posts` or GraphQL.
  - Implement Incremental Static Regeneration (ISR) configuration on the fetch header (`next: { revalidate: 86400 }` for a 24-hour cache).
  - Add fallback UI cards populated with local mock articles in case external server connections fail or keys are omitted.

---

## Verification Tasks
1. Submit an invalid email on the contact form and verify validation errors appear.
2. Submit a successful form, confirming the API receives payload details and returns a success status.
3. Verify that the blog feed queries the endpoint, displays titles/metadata, and displays local fallback mock cards if the server connection fails.
