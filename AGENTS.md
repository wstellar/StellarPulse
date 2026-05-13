# AGENTS.md

Project architecture reference for AI agents and developers.

## Project Overview

StellarPulse is a single-page marketing site for the Stellar blockchain ecosystem. It features a cyberpunk + glassmorphism dark-mode UI with animated token cards, a live market section, roadmap, and community links. Built with TanStack Start (React SSR) and deployed on Netlify.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Fonts | Orbitron, Space Grotesk, JetBrains Mono |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx     # Root shell: SEO meta, OpenGraph, JSON-LD schema markup, Google Fonts
    index.tsx      # Entire homepage — all sections, components, hooks, and data
  styles.css       # All custom CSS: animations, glassmorphism, neon effects, layout
  router.tsx       # TanStack Router setup (scroll restoration)
public/            # Static assets (favicon, placeholder)
netlify.toml       # Build command, publish dir (dist/client), dev port 8888
vite.config.ts     # Vite + TanStack Start + Tailwind + Netlify plugin
tsconfig.json      # Strict TS, @/* alias for src/*
README.md          # Developer quickstart
AGENTS.md          # This file
```

## Key Architecture Decisions

### Single-file homepage
All page sections (Hero, Ticker, TrendingTokens, LiveMarket, WhyStellar, Roadmap, Community, Footer) plus hooks and data are co-located in `src/routes/index.tsx`. Intentional for a single-page marketing site. If the file grows beyond ~900 lines, split into `src/components/`.

### CSS approach
All visual styling lives in `src/styles.css` using plain CSS custom properties + Tailwind 4 for layout utilities. Animation keyframes, glassmorphism, and neon glow effects are in CSS (not JS) for GPU-acceleration and minimal bundle size.

### Data is static
Token data, ticker items, heatmap cells, and activities are hardcoded arrays at the top of `index.tsx`. No API or database. To connect live data, add a TanStack Start API route (`src/routes/api.token-data.ts`) and use a route loader.

### Canvas particles
Particle background uses Canvas 2D API directly via a `useParticles` hook — no external library dependency.

### Loading screen
`LoadingScreen` component uses `setInterval` to animate a progress bar to 100%, then fades out via CSS animation, calling `onDone` to reveal main content.

## Coding Conventions

- **Components**: PascalCase, defined as named functions
- **Hooks**: camelCase, prefixed `use`
- **Styling**: CSS custom properties (`var(--neon-blue)`) for theme tokens; Tailwind for layout
- **TypeScript**: Strict mode; inline prop types; `type` keyword for type imports
- **No comments**: Self-documenting naming

## Routes

- `__root.tsx` — Root layout (HTML shell, head tags, Scripts)
- `index.tsx` — Homepage at `/`
- `api.*.ts` convention — Server API endpoints (none currently)

## SEO

Meta tags, OpenGraph, and JSON-LD WebSite schema are defined in `__root.tsx` via the `head()` config. Keywords target: Stellar blockchain, XLM tokens, Stellar ecosystem, Stellar DEX, trending Stellar tokens.

## Environment Variables

None required for the static version. For AI features: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or `GEMINI_API_KEY`.

## Development Commands

```bash
npm run dev        # Dev server on localhost:3000
npm run build      # Production build → dist/client
netlify dev        # Full Netlify emulation on localhost:8888
```
