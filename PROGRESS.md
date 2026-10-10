# Project progress

## Checkpoint 1 — Setup and verified content

- Source: supplied resume, read on 2026-10-10. Public copy intentionally omits the phone number.
- Verified details and links are centralized in `src/data.ts`.
- Vite, React, TypeScript, and React Three Fiber setup is in place.
- Commit: `c0240e3`.
- Next: review the readable site, then refine 3D and physical interactions.

## Resume after a context reset

1. Read this file and `README.md`.
2. Check `git status`, the latest commit, and the GitHub remote.
3. Run `npm install` if dependencies are missing, then `npm run build`.
4. Continue from the latest incomplete checkpoint below; update this file before each checkpoint commit.

## Checkpoint 2 — Readable site

- Complete responsive page with hero, about, four verified projects, skills, journey, contact, and public resume link.
- Researched the UFC reference source. Its tactile collage, sticker play, and section-by-section storytelling informed the research-note details and skill playground; the portfolio keeps its own dark AI visual language.
- Verified: `npm run build` passed; desktop and 390px mobile layouts reviewed in the browser; no horizontal overflow or console errors observed.
- Commit: `bea06a7` (pushed to the public GitHub repository).
- Next: refine interaction details and accessibility, then commit checkpoint 3.

## Checkpoint 3 — 3D and interaction

- Switched to the user-requested light scrapbook direction: warm paper sections, cobalt ink, pinned field notes, staggered project case files, torn edges, and a USAR stamp.
- The React Three Fiber scene uses a light palette, capped pixel ratio, lazy loading, offscreen unmounting, and a fallback when WebGL or rendering fails.
- Skill tokens can be dragged and thrown on desktop, rebound at the field boundary, and reveal their category when clicked or tapped. Section content reveals as it enters view; reduced-motion visitors get static content.
- Verified: production build passed; mobile viewport has no horizontal overflow or console errors.
- Next: run final privacy/link checks, deploy through Vercel, and record the live URL.

## Checkpoint 4 — Release verification

- Interactive project files now let visitors step through each project's purpose and flow. They are clearly labeled as illustrated explanations rather than live demos.
- Paper-cut lettering is adapted from UFC's Apache-2.0 scrapbook component, with `NOTICE`, its license, README credit, and visible footer credit.
- Redacted downloadable resume, Vercel configuration, and Git ignore rules are in place.
- Verified: `npm run build` passes. The 3D scene remains lazy loaded; Vite reports a size warning for that isolated chunk.
- Deployment handoff: the user will import `Manu-2717/meyank-portfolio` in Vercel manually. After the live URL is available, add it to this file and `README.md`, then verify the deployed site.
- Last verified commit: `2a91407` (pushed to `main`).
- Exact next steps: import the GitHub repository into Vercel, deploy with the Vite preset, test the production URL, record it here and in README, and push the URL update.
