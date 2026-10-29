# Jaswant Singh — Web & AI Developer

A responsive portfolio built with React, TypeScript, Vite, GSAP ScrollTrigger,
and a lazy-loaded Three.js hero sculpture. Project illustrations are explicitly
labeled placeholders until real screenshots are supplied. Resume facts and
links come from the supplied PDF.

## Run locally

Use Node.js 22.12+ or 24+ and npm.

```sh
npm install
npm run dev
```

Create and preview the production build:

```sh
npm run build
npm run preview
```

`npm run check` checks TypeScript. `npm run build` also runs that check before Vite.
Vite prints the URL for each server. `dist/` is a static build and can be hosted
with any static web host. No database, API keys, or server are required.

## Update projects and content

Edit **`src/data/portfolio.ts`** for project names, summaries, purposes,
contributions, outcomes, technology lists, live URLs, screenshot paths, and alt
text. This file also holds contact details, capabilities, employment, and
education. Project order and the `featured` flag determine the showcase.

Add screenshots under **`public/projects/`** using the filenames listed in that
folder's README, or change the corresponding `image` path in the data file.
No component changes are needed. PNG, JPG, AVIF, and WebP work. Screenshots are
contained without cropping or distorting their proportions, in frames that
reserve space while loading. Missing/broken images show the existing labeled
illustration automatically. The preview designs are illustrative, not
representations of the clients' actual interfaces.

The downloadable resume is **`public/Jaswant_Singh_Resume.pdf`**, copied unchanged
from the supplied file. Replace it there to publish an updated resume.

Page metadata lives in `index.html`; update its canonical URL and absolute
social image URLs if you deploy to another domain. The social image and favicon
are in `public/`.

## Motion and accessibility

Navigation uses native anchor scrolling; the desktop project index follows the
visible chapter. Project disclosures use native `details`/`summary` and work
with Enter/Space. Mobile navigation supports Escape and returns focus to Menu.
There is a skip link and visible focus styling.

Reduced motion removes the animated reveals/crossover and uses a static CSS
sculpture. WebGL also falls back on small touch devices, save-data, unsupported
WebGL, or errors. The 3D module loads separately, caps DPR at 1.5, pauses
offscreen/when the tab is hidden, and settles ambient movement within 4.5
seconds. The scene then renders only in response to limited pointer movement.
Essential content loads independently of the 3D scene.
