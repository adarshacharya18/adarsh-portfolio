# Phase 7 Prompt: Production Build & Deployment Pipeline

## Goal
Validate build performance, verify environment variables, configure the Vercel project deployment target, and release the portfolio live to the web.

---

## Action Steps

### Step 1: Execute Local Production Compile
- Trigger a clean local production compile:
  ```bash
  npm run build
  ```
- Review the compile report to ensure there are no oversized vendor chunk payloads or broken static routes.
- Launch the compiled release locally:
  ```bash
  npm run start
  ```
- Test all major functionalities (persona switcher, project routing, contact validation).

### Step 2: Set up Git CI/CD repository triggers
- Initialize git locally:
  ```bash
  git init
  git add .
  git commit -m "chore: initial commit with system documentation"
  ```
- Instruct the user to push to their remote repository (GitHub, GitLab, etc.).

### Step 3: Deployment Configuration
- Configure the project on **Vercel**:
  - Connect the remote git repository.
  - Set Build Command: `npm run build`.
  - Set Output Directory: Next.js default.
  - Inject required production environment variables (e.g. `RESEND_API_KEY`, `CONTACT_EMAIL_RECIPIENT`).
- Trigger the first production deployment.

---

## Verification Tasks
1. Access the deployed live URL and confirm page routes render without server errors.
2. Submit a real email through the contact form, verifying receipt in the destination inbox.
3. Check the page load speed and ensure Lighthouse reports match the performance criteria.
