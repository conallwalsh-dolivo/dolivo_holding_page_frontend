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
- Layout is a fixed `max-width:1200px` centered column, desktop-oriented.

## `<image-slot>` component (`image-slot.js`)

Custom web component for user-fillable image placeholders: `<image-slot id="..." shape="rect" placeholder="Logo">`. Dropped images persist across reloads via a **`.image-slots.state.json` sidecar** that lives beside the HTML file (base64 data URIs, keyed by slot `id`). Rules:

- Every slot needs a **distinct `id`** on a page; pages sharing a directory share one sidecar.
- Outside the dc/omelette runtime the slot is **read-only** — it only renders a filled image if the sidecar already has data for that id.
- `image-slot.js` is a copied "omelette starter" scaffold; do not hand-edit it for styling — configure via element attributes (documented in the file header).

## Assets

- `assets/` — images referenced by the pages (`dolivo-mark.jpg`, `logo-founders.png`, `logo-ndrc.png`), by relative path. Both the root sources and `site-export/` have their own `assets/` copy — update both.
- `uploads/` — source material (PDFs, high-res logos, deck exports). Not directly served; source for assets.
- `support.js` is generated (from `dc-runtime`) — **do not edit it**.

## Deployment

The old React site deployed to GitHub Pages on custom domain **`dolivogen.com`**. Confirm the current publish flow before assuming — `Current_website/` has no deploy script; the deployable artifact is the contents of `site-export/`. Contact email used across the site: `conall.walsh@dolivogen.com`.
