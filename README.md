# Meyank — Portfolio

A light, interactive research notebook for Meyank, an AI and data science student. Its tactile notes and playful motion are inspired by the [UFC site](https://github.com/USAR-FOSS/ufc_website), with an original visual identity. The paper-cut lettering in `src/Scrapbook.tsx` is adapted from UFC's Apache-2.0 source; its notice and license are included in `NOTICE` and `licenses/UFC-LICENSE.txt`. Content is sourced from the supplied resume and kept in `src/data.ts` for easy edits.

## Run locally

Requires Node.js 20.19+.

```sh
npm install
npm run dev
```

Run `npm run build` to create the production site in `dist/` and `npm run preview` to inspect that build locally.

## Deploy on Vercel

In the Vercel dashboard, select **Add New → Project**, connect GitHub, and import `Manu-2717/meyank-portfolio`. Select the Vite framework preset, leave the root directory at the repository root, use `npm run build`, and set the output directory to `dist`. Click **Deploy**. Vercel can redeploy each push to `main`. After deployment, copy the production URL into this README and `PROGRESS.md`.

The site is static and requires no backend, secrets, or environment variables. The contact action is an email link. The downloadable resume in `public/Meyank_Resume_Public.pdf` is a separately generated public copy without a phone number. Do not commit the original resume. The 3D scene is lazy loaded and has reduced-motion and WebGL fallbacks.

## Progress

See `PROGRESS.md` for the last verified checkpoint, test results, and next steps.
