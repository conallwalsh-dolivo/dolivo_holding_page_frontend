# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for Dolivo — AI-native technical expertise for utility-scale solar & storage (grid connection, compliance, plant controls, operational performance). This is a **static HTML site** authored with a "dc" (design-canvas) runtime, not a framework app. There is no `package.json`, build step, bundler, linter, or test suite in this directory. You edit HTML/CSS/JS directly.

> Repo context: the parent repo is mid-migration. The old site was a React 18 + Vite + Tailwind app (now being deleted — see `../Old_website_20_07_2026/` and the deletions in `git status`). **`Current_website/` is the new source of truth.** Do not resurrect the React app unless explicitly asked.

## Two layers — edit source, then re-export

There are two parallel copies of every page. Understand which you are touching:

1. **`*.dc.html` (root of `Current_website/`) — the SOURCE.** These are the editable design-canvas files. Each wraps its content in an `<x-dc>` template and loads `support.js` (the dc-runtime). Internal links point at other `.dc.html` files (e.g. `href="Dolivo Services.dc.html"`). Content is authored here.
2. **`site-export/*.html` — the DEPLOYABLE build.** Plain, runtime-free HTML with clean filenames and relative links (`index.html`, `approach.html`, etc.). This is what actually ships. It contains no `<x-dc>` / `support.js` — the dc wrapper is stripped on export.

Page mapping (source → export):

| `*.dc.html` source            | `site-export/` file   |
| ----------------------------- | --------------------- |
| `Dolivo Home.dc.html`         | `index.html`          |
| `Dolivo Services.dc.html`     | `approach.html`       |
| `Dolivo Case Studies.dc.html` | `case-studies.html`   |
| `Dolivo About.dc.html`        | `about.html`          |
| `Dolivo Wireframes.dc.html`   | *(not exported)*      |
| `Dolivo Home-print-*.dc.html` | *(print variant, not exported)* |

**When you change page content, update BOTH the `.dc.html` source and the matching `site-export/*.html`**, or the two will drift and the change won't ship. Remember the two also differ in link targets (`.dc.html` vs `.html`) and the export drops the `<x-dc>`/`support.js` scaffold.

## Styling

All styling is **inline `style="..."` attributes plus a small `<style>` block** in each page's `<head>` (the export inlines it directly; the source puts it inside `<helmet data-dc-atomics>`). There is no Tailwind, no shared CSS file, and no design-token system here — colors and sizes are literal hex/px repeated per element. Keep the palette consistent by hand:

- Background `#f4f1ea`, ink `#171612`, muted text `rgba(23,22,18,.6)`.
- Fonts: **Newsreader** (serif, headings) and **IBM Plex Sans** (body), loaded from Google Fonts.
- Layout is a fixed `max-width:1200px` centered column, authored desktop-first; a per-page `@media (max-width:768px)` block adapts it for phones (see Mobile responsiveness).

## Mobile responsiveness — DONE (Option A, breakpoint 768px)

All 8 pages (4 `site-export/*.html` + 4 `.dc.html` sources) carry an identical **~115-line mobile block appended to each page's existing `<style>`**. Everything lives inside `@media (max-width:768px)` except three declarations that pre-hide the added nav elements. Desktop is untouched — verified identical at 1280/1024/900/769px.

**Key constraint (why the CSS looks the way it does):** everything is inline `style="..."`, which beats stylesheet rules regardless of specificity. Only `!important` in a stylesheet wins. So the overrides match on the **repeated inline substrings** — `[style*="padding:56px 72px"]`, `[style*="repeat(3,1fr)"]`, `[style*="60px/1.12"]` — and every declaration that fights an inline one is `!important`.

> ⚠️ **This is fragile in one specific way.** The selectors depend on the inline style strings staying byte-identical. If the design-canvas tool ever reorders or reformats a `style` attribute, the matching rule **silently stops applying** — no error, just a section that quietly breaks on phones. After any dc-tool round-trip that rewrites markup, re-test at 375px. This is the accepted cost of Option A; the rejected Option B was a full inline-to-classes refactor.

What the block covers: page gutters `72px → 24px` (and vertical rhythm trimmed pro rata), heading scale-down via `clamp()` with loosened line-height, all multi-column grids to one column (grids using `gap:1px` keep their hairline-divider look), CTA rows stacked with full-width ≥44px buttons, card padding pulled in, footer stacked, trusted-by marquee gap `120px → 56px`.

**Nav is a CSS-only hamburger — no JavaScript.** A visually-hidden `<input type="checkbox" class="nav-toggle">` plus a `<label class="nav-burger">` sit between the logo and the nav div; `.nav-toggle:checked ~ .site-nav{display:flex}` opens the menu. This is the only markup added to every page (`.site-header` / `.site-nav` class hooks aside).

**Gotcha — flex blockification.** The nav's outlined "Book an intro call" has inline `display:inline-block`, but as a flex child it computes to `block`, which makes `justify-content` inert and stacks `min-height` on top of padding (a 73px pill with text jammed top-left). Its rule forces `display:flex!important`. Watch for this on any other inline-block flex child.

### The "Backed by" widget is duplicated, and the two layers drive it differently

It lives *inside* the nav, so on mobile it would be trapped behind the hamburger. Instead the nav copy is hidden (`.nav-backed`) and a **second copy renders in the hero** (`.nav-backed-m`, `display:none` until the breakpoint). Both copies must alternate Founders/NDRC in lockstep, and the mechanism is **not the same in the two layers**:

- **`site-export/index.html`** — a `setInterval` toggled `#logo-founders`/`#logo-ndrc`. Changed to `querySelectorAll('.logo-founders')` + `forEach`, so it drives both copies. Keep the classes on both.
- **`Dolivo Home.dc.html`** — uses `<sc-if value="{{ showFounders }}">` bound to the dc component's state. Both copies read the same state, so **no script change is needed there**. The duplicated tiles use `key="founders-m"` / `key="ndrc-m"`.

Editing this widget means touching both copies in whichever layer you're in.

### Testing

`site-export/` is verified; the `.dc.html` sources got the same patch but **cannot be rendered without the dc runtime**, so they are applied-but-unverified. Serve `site-export/` (see Local preview) and check 375 / 414 / 768px.

Two traps if you automate the check: the case-studies SVG charts **rasterize non-deterministically** and the trusted-by marquee animates, so screenshot pixel-diffs give false positives (the original mismatches *itself* ~1 run in 3). Compare element geometry with animations frozen instead. And `overflow-x:hidden` on `html,body` means `scrollWidth` won't reveal overflow — walk the elements and check for an overflow-clipping ancestor.

**Known rough edge:** at 768px the layout is mobile, so the three stats become one tall column and the CTA stretches to ~720px. It reads stretched rather than broken. An intermediate breakpoint (600–768px: stats 3-up, button capped ~360px) would fix it; not done.

## `<image-slot>` component (`image-slot.js`)

Custom web component for user-fillable image placeholders: `<image-slot id="..." shape="rect" placeholder="Logo">`. Dropped images persist across reloads via a **`.image-slots.state.json` sidecar** that lives beside the HTML file (base64 data URIs, keyed by slot `id`). Rules:

- Every slot needs a **distinct `id`** on a page; pages sharing a directory share one sidecar.
- Outside the dc/omelette runtime the slot is **read-only** — it only renders a filled image if the sidecar already has data for that id.
- `image-slot.js` is a copied "omelette starter" scaffold; do not hand-edit it for styling — configure via element attributes (documented in the file header).

## Assets

- `assets/` — images referenced by the pages (`dolivo-mark.jpg`, `logo-founders.png`, `logo-ndrc.png`), by relative path. Both the root sources and `site-export/` have their own `assets/` copy — update both.
- `uploads/` — source material (PDFs, high-res logos, deck exports). Not directly served; source for assets.
- `support.js` is generated (from `dc-runtime`) — **do not edit it**.

## Local preview

`site-export/` is plain static HTML — serve it and open in a browser:

```bash
cd Current_website/site-export && python -m http.server 8000 --bind 127.0.0.1
# then http://127.0.0.1:8000/
```

The server reads from disk, so edits to `site-export/` show on refresh (no rebuild). The `.dc.html` sources need the dc-runtime to render, so preview via `site-export/` instead.

## Deployment

Hosted on **GitHub Pages** at custom domain **`dolivogen.com`**, served from the **`gh-pages` branch** (repo `conallwalsh-dolivo/dolivo_holding_page_frontend`). There is no deploy script; the deployable artifact is the **contents of `site-export/` placed at the branch root**, plus a `CNAME` file containing `dolivogen.com`. `main` holds the source; `gh-pages` holds only the built site.

Established publish flow (no `gh` CLI needed — pure git):

```bash
git fetch origin gh-pages
git worktree add /tmp/ghp gh-pages && cd /tmp/ghp
git reset --hard origin/gh-pages && git rm -rf .
cp -r <repo>/Current_website/site-export/. .
printf "dolivogen.com\n" > CNAME
git add -A && git commit -m "Deploy" && git push origin HEAD:gh-pages
cd - && git worktree remove --force /tmp/ghp
```

Always regenerate `CNAME` — it is not in `site-export/`, and losing it drops the custom domain. Contact email used across the site: `conall.walsh@dolivogen.com`; booking CTAs link to a Google Calendar appointment page; footer LinkedIn links point to the Dolivo company page.
