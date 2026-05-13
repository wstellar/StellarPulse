# StellarPulse

A futuristic, dark-mode crypto tracking website focused on the Stellar blockchain ecosystem. Built with TanStack Start and deployed on Netlify.

## What it is

StellarPulse is a marketing and discovery platform for Stellar ecosystem tokens. It features a cyberpunk + glassmorphism visual design with real-time-style market data, an AI-powered trend scoring system for tokens, live activity feed, and community links.

## Key Technologies

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (SSR + file-based routing) |
| UI | React 19, custom CSS (glassmorphism, animations) |
| Styling | Tailwind CSS 4 + custom CSS variables |
| Fonts | Orbitron, Space Grotesk, JetBrains Mono |
| Build | Vite 7 |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`. For full Netlify feature emulation (edge functions, etc.):

```bash
netlify dev
# → http://localhost:8888
```

## Building for Production

```bash
npm run build
```

Output goes to `dist/client` (as configured in `netlify.toml`).

## Design

- **Color palette**: Neon blue (`#00d4ff`), cyan (`#06ffd4`), purple (`#a855f7`) on near-black backgrounds
- **Typography**: Orbitron for headings/labels, Space Grotesk for body, JetBrains Mono for data
- **Animations**: CSS keyframe animations for loading screen, floating cards, ticker scroll, particle canvas via Canvas API
- **Dark mode**: Default and only mode
