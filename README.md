# Project Axion

Hyper-premium showcase site for **Axion Vision SRL** (brand: *Project Axion*, CAEN 6220).
Cinematic deep-dark theme, cyber-accent glow, bento-grid capabilities, and a
terminal-style secure contact panel.

Built on **TanStack Start + React 19 + Vite + Tailwind v4 + Framer Motion**,
deployable to **Cloudflare Workers**.

## Stack

- TanStack Start (file-based routing, SSR, edge server functions)
- React 19
- Tailwind CSS v4 (config-less, tokens declared via `@theme` in `src/styles/app.css`)
- Framer Motion (scroll reveals, micro-interactions)
- Cloudflare Vite plugin + Wrangler (deploy target)
- Geist + Geist Mono (loaded via Google Fonts)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

The first `dev`/`build` run auto-generates `src/routeTree.gen.ts` from the
files in `src/routes`.

## Build & deploy

```bash
npm run build              # production build
npm run preview            # preview the build locally
npm run deploy             # build + wrangler deploy to Cloudflare Workers
```

Before first deploy, authenticate Wrangler with `npx wrangler login`.

## Structure

```
src/
  router.tsx                  # TanStack Router instance
  styles/app.css              # Tailwind v4 + design tokens + keyframes
  routes/
    __root.tsx                # HTML shell, fonts, grain overlay
    index.tsx                 # Landing page composition
  lib/cn.ts                   # clsx + tailwind-merge helper
  hooks/
    useReducedMotion.ts       # prefers-reduced-motion (SSR-safe)
    useTypewriter.ts          # in-view typing effect
  components/
    ui/                       # GlowButton, GhostButton, GradientBorderCard,
                              #   SectionLabel, Reveal, TerminalLine
    visuals/ParticleField.tsx # hero particle matrix canvas
    sections/                 # Navbar, Hero, TechMatrix, EngineRoom,
                              #   ProtocolSecure, DispatchCommand, Footer
```

## Design tokens

Declared in `src/styles/app.css` under `@theme`:

- Surfaces: `--color-void #050506`, `--color-panel`, `--color-raised`
- Accents: `--color-cyan #00f0ff`, `--color-purple #8a2be2`, `--color-signal`
- Fonts: `--font-sans` (Geist), `--font-mono` (Geist Mono)

All ambient/looping motion is disabled under `prefers-reduced-motion`.
