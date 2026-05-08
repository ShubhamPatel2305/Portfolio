# Shubham Patel — Portfolio

A single-page Next.js portfolio site. White editorial base, narrow reading column, mono technical accents. Designed to convert recruiter visits into replies.

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS 3.4 with a small custom theme
- Framer Motion for entry animations
- Geist + Instrument Serif + JetBrains Mono via `next/font`
- Lucide icons

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Push the repo to GitHub, then `Add New → Project` on Vercel and pick it. No environment variables required for the base build. Vercel auto-detects Next.js — no `vercel.json` needed.

## Things to do before going live

1. **Drop your résumé PDF.** Save it as `public/resume.pdf` so the navbar `résumé ↗` button works.
2. **Update project repo links.** In `app/components/Projects.tsx` each card has a `repo` field currently pointing at your profile. Replace each one with the specific repo URL once you publish the sanitized public versions.
3. **(Optional) custom domain.** Buy `shubhampatel.dev` (or similar) and point it at Vercel. Update `metadataBase` in `app/layout.tsx` to match.
4. **(Optional) wire up the contact form.** It currently falls back to opening the visitor's mail client with a prefilled draft. To accept submissions server-side, replace the body of `onSubmit` in `app/components/Contact.tsx` with a `fetch('/api/contact', …)` call and add a route handler at `app/api/contact/route.ts` using Resend / a Vercel function / Formspree — your call.
5. **OG image.** Drop a 1200×630 `og.png` in `public/` and add `openGraph.images` in `layout.tsx`.

## Editing content

Almost all copy lives in three files:

- `app/components/Hero.tsx` — headline, stats strip, social links
- `app/components/Work.tsx` — Iolite + TTFA roles and bullets
- `app/components/Projects.tsx` — featured project cards

Stack / About / Footer are similarly direct.

## Style notes

- The reading column is intentionally narrow (~720px max). Don't widen it — the editorial feel depends on it.
- Color accent is a single warm amber (`accent` in the Tailwind config). Use it sparingly for live signal: hover states, "open to roles" pulse, key metric underlines.
- Typography pairing: Instrument Serif (display, often italicised), Geist (body), JetBrains Mono (technical labels and meta).

---

© Shubham Patel
