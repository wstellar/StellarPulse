import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'StellarPulse — Discover Trending Stellar Tokens Before Everyone Else' },
      { name: 'description', content: 'Track fresh Stellar ecosystem trends, meme tokens, and high-potential XLM assets in real time. StellarPulse is your gateway to the Stellar blockchain DEX.' },
      { name: 'keywords', content: 'Stellar blockchain, XLM tokens, Stellar ecosystem, Stellar DEX, trending Stellar tokens, XLM trading, Stellar meme tokens, crypto trends' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#00d4ff' },
      { property: 'og:title', content: 'StellarPulse — Discover Trending Stellar Tokens' },
      { property: 'og:description', content: 'Track fresh Stellar ecosystem trends, meme tokens, and high-potential XLM assets in real time.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'StellarPulse' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'StellarPulse — Stellar Blockchain Token Tracker' },
      { name: 'twitter:description', content: 'Discover trending Stellar tokens before everyone else.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'StellarPulse',
          description: 'Discover trending Stellar blockchain tokens and XLM ecosystem assets in real time.',
          url: 'https://stellarpulse.netlify.app',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://stellarpulse.netlify.app/?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
