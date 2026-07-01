# Mohd Sameer — Portfolio

A backend-developer portfolio built with React + Vite, styled around an "API request/response" motif.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel
```
Follow the prompts (accept the defaults — Vercel auto-detects Vite).

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com/new, import the repo.
3. Framework preset: Vite (auto-detected). Build command `npm run build`, output directory `dist` (defaults — no changes needed).
4. Click Deploy.

## Editing content

All resume content (name, contact links, experience, projects, skills) lives in one place: the `PROFILE`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, and `EDUCATION` objects at the top of `src/App.jsx`. Edit those and redeploy — no need to touch the markup or CSS.

## Notes

- No certificates were listed in the source resume, so that section was left out rather than invented. Add a `CERTIFICATIONS` array in `App.jsx` and a matching section if you'd like one.
- "Years of experience" on the hero and about section is computed automatically from a Sep 2024 start date, so it stays accurate without manual updates.
