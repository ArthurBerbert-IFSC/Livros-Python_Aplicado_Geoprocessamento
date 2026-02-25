# IFSC Digital Book Agent Guide

## Project Snapshot
- Static, offline-first book for course PAG014903; no build step, just HTML/CSS/JS plus PWA assets.
- Each chapter lives in its own HTML file using the IFSC Digital Book layout described in `.github/instructions/Layout.instructions.md` and `layout2.instructions.md`.
- Tailwind (via CDN), Prism (okaidia theme), and Lucide icons are the only external resources allowed; everything else must remain local for offline support.

## Layout Conventions
- Preserve the canonical head block: UTF-8 meta, viewport, Tailwind CDN script, Prism theme link, `estilos.v2.css`, and Tailwind config snippet.
- Body structure: reading progress bar, institutional header with four logos (keep `onerror="this.style.display='none'"`), `<main>` containing sticky TOC `<aside>` and chapter `<article>`, and the standard footer.
- Wrap major chapter segments in containers marked with `data-toc="section"`; provide clear `<h2>`/`<h3>` headings so `main.v2.js` can auto-build the TOC.
- Use the didactic blocks defined in the layout instructions (conceito, dica, atenção, curiosidade, exercício, conclusão) and keep IDs consistent for navigation.

## Styling & Components
- `estilos.v2.css` manages global typography, theme toggle visuals, font-scale widget, TOC link states, copy button styles, PWA overlay, and header shrink behavior; do not duplicate these rules inline.
- Code samples should live inside `.code-block` or `.code-container` wrappers so `main.v2.js` can inject copy buttons; Prism language classes (`language-python`, etc.) are required for syntax highlighting.
- Use Lucide icons via `<i data-lucide="icon-name"></i>` or inline SVG; ensure `lucide.createIcons()` stays at the end of the body.

## JavaScript Responsibilities
- `main.v2.js` handles theme cycling (`light → dark → system`), font scaling, copy buttons, reading progress, dynamic TOC, header shrink animation, mobile menu toggle, and the PWA install overlay.
- When adding new interactive widgets, extend `main.v2.js` rather than adding ad-hoc scripts inside chapters to keep behavior centralized and cached.
- Any new section needing TOC tracking must include headings and avoid duplicate IDs; IntersectionObserver in `buildDynamicToc()` assumes unique anchors.

## PWA & Offline Rules
- `service-worker.js` pre-caches all HTML chapters, assets, and sample data; update `CORE_ASSETS` and bump `CACHE_VERSION` whenever new files should be cached.
- `manifest.webmanifest`, `offline.html`, and `icons/` underpin installability; keep paths relative and ensure added assets exist.
- Test changes by running `python -m http.server 8000` from the repo root so the service worker registers correctly.

## Content & Assets
- Maintain UTF-8 encoding and proper accents; follow heuristics in layout instructions to fix mojibake if encountered.
- Image assets live under `imagens/`; add `loading="lazy"` and descriptive `alt` text, respecting offline availability.
- Chapter navigation links (Anterior/Próximo) and index references must be updated when renaming files; ensure service worker list matches new names.

## Useful Paths
- Global styles: `estilos.v2.css`
- Global scripts & behaviors: `main.v2.js`
- PWA logic: `service-worker.js`, `manifest.webmanifest`, `offline.html`
- Course assets & datasets: `arquivos/`, `icons/`, `imagens/`

If any guideline above is unclear or missing important workflow details, please let me know so we can refine this document.