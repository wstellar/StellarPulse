import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: StellarPulse,
})

// ─── Data ──────────────────────────────────────────────────────────────────

const TOKENS = [
  {
    id: 'novaxlm',
    name: 'NovaXLM',
    symbol: 'NOVA',
    price: '0.00312',
    change: '+18.4%',
    up: true,
    volume: '$1.24M',
    mcap: '$3.8M',
    trendScore: 94,
    color: '#00d4ff',
    bg: 'from-[#00d4ff20] to-[#00d4ff05]',
    chartPoints: [20, 35, 28, 45, 38, 52, 48, 65, 58, 72, 68, 80],
  },
  {
    id: 'stellarpepe',
    name: 'StellarPepe',
    symbol: 'SPEPE',
    price: '0.0000847',
    change: '+34.7%',
    up: true,
    volume: '$892K',
    mcap: '$1.2M',
    trendScore: 87,
    color: '#06ffd4',
    bg: 'from-[#06ffd420] to-[#06ffd405]',
    chartPoints: [15, 22, 18, 30, 28, 44, 38, 55, 50, 68, 72, 88],
  },
  {
    id: 'orbitx',
    name: 'OrbitX',
    symbol: 'ORBT',
    price: '0.0184',
    change: '+7.2%',
    up: true,
    volume: '$2.1M',
    mcap: '$8.6M',
    trendScore: 71,
    color: '#a855f7',
    bg: 'from-[#a855f720] to-[#a855f705]',
    chartPoints: [40, 38, 42, 45, 43, 48, 44, 50, 47, 52, 55, 58],
  },
  {
    id: 'luminaai',
    name: 'LuminaAI',
    symbol: 'LMAI',
    price: '0.00728',
    change: '-3.1%',
    up: false,
    volume: '$547K',
    mcap: '$2.1M',
    trendScore: 63,
    color: '#f59e0b',
    bg: 'from-[#f59e0b20] to-[#f59e0b05]',
    chartPoints: [70, 65, 68, 72, 66, 60, 58, 55, 52, 48, 45, 46],
  },
  {
    id: 'starfuel',
    name: 'StarFuel',
    symbol: 'SFUEL',
    price: '0.00156',
    change: '+52.3%',
    up: true,
    volume: '$3.7M',
    mcap: '$4.9M',
    trendScore: 98,
    color: '#ff006e',
    bg: 'from-[#ff006e20] to-[#ff006e05]',
    chartPoints: [10, 14, 12, 18, 22, 28, 35, 42, 55, 68, 78, 95],
  },
]

const TICKER_ITEMS = [
  { symbol: 'XLM/USDC', price: '0.1247', change: '+2.3%', up: true },
  { symbol: 'NOVA/XLM', price: '0.0251', change: '+18.4%', up: true },
  { symbol: 'SPEPE/XLM', price: '0.000681', change: '+34.7%', up: true },
  { symbol: 'ORBT/XLM', price: '0.1481', change: '+7.2%', up: true },
  { symbol: 'LMAI/XLM', price: '0.0586', change: '-3.1%', up: false },
  { symbol: 'SFUEL/XLM', price: '0.01256', change: '+52.3%', up: true },
  { symbol: 'BTC/XLM', price: '683214', change: '+1.1%', up: true },
  { symbol: 'ETH/XLM', price: '38421', change: '-0.8%', up: false },
  { symbol: 'USDC/XLM', price: '8.024', change: '+0.1%', up: true },
]

const HEATMAP = [
  { symbol: 'XLM', change: '+2.3', color: 'rgba(6,255,212,0.18)', size: 'col-span-2 row-span-2' },
  { symbol: 'NOVA', change: '+18.4', color: 'rgba(0,212,255,0.2)', size: 'col-span-1 row-span-1' },
  { symbol: 'SPEPE', change: '+34.7', color: 'rgba(6,255,212,0.22)', size: 'col-span-1 row-span-1' },
  { symbol: 'ORBT', change: '+7.2', color: 'rgba(0,212,255,0.12)', size: 'col-span-1 row-span-1' },
  { symbol: 'SFUEL', change: '+52.3', color: 'rgba(255,0,110,0.22)', size: 'col-span-1 row-span-2' },
  { symbol: 'LMAI', change: '-3.1', color: 'rgba(255,0,110,0.15)', size: 'col-span-1 row-span-1' },
  { symbol: 'BTC', change: '+1.1', color: 'rgba(245,158,11,0.15)', size: 'col-span-1 row-span-1' },
]

const ACTIVITIES = [
  { action: 'Buy', token: 'SFUEL', amount: '847,200', price: '0.00156', color: '#06ffd4' },
  { action: 'Buy', token: 'NOVA', amount: '2,340,000', price: '0.00312', color: '#00d4ff' },
  { action: 'Sell', token: 'LMAI', amount: '156,000', price: '0.00728', color: '#ff4d8d' },
  { action: 'Buy', token: 'SPEPE', amount: '12,800,000', price: '0.0000847', color: '#06ffd4' },
  { action: 'Buy', token: 'ORBT', amount: '54,200', price: '0.0184', color: '#a855f7' },
  { action: 'Sell', token: 'BTC', amount: '0.042', price: '683214', color: '#ff4d8d' },
]

// ─── Helpers ───────────────────────────────────────────────────────────────

function MiniChart({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 100
  const h = 40
  const pts = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="mini-chart">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

function TrendScoreRing({ score, color }: { score: number; color: string }) {
  const r = 20
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ

  return (
    <div className="trend-score-ring">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="trend-score-label" style={{ color }}>
        {score}
      </div>
    </div>
  )
}

// ─── Loading Screen ────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [statusText, setStatusText] = useState('Initializing stellar network...')

  const statuses = [
    'Initializing stellar network...',
    'Scanning blockchain data...',
    'Loading token metrics...',
    'Calibrating AI trend engine...',
    'Syncing DEX liquidity...',
    'Ready to launch.',
  ]

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 4 + 1.5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setStatusText('Ready to launch.')
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(onDone, 800)
        }, 400)
      } else {
        const idx = Math.floor((p / 100) * (statuses.length - 1))
        setStatusText(statuses[idx])
      }
      setProgress(Math.min(p, 100))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`loader-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Galaxy rings */}
      <div className="galaxy-bg">
        {[200, 320, 440, 560, 680].map((size, i) => (
          <div
            key={i}
            className="galaxy-ring"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              marginTop: -size / 2,
              marginLeft: -size / 2,
              borderColor: `rgba(0, 212, 255, ${0.12 - i * 0.02})`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              borderRadius: '50%',
              background: `rgba(${Math.random() > 0.5 ? '0,212,255' : '6,255,212'}, ${Math.random() * 0.6 + 0.2})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `galaxyPulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* XLM coin */}
      <div className="xlm-coin" style={{ zIndex: 1 }}>
        <div className="xlm-inner">XLM</div>
      </div>

      {/* Text */}
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <div className="loader-tagline">Exploring the Future of Stellar Assets</div>
        <div className="loader-subtitle">StellarPulse Protocol v2.4</div>
      </div>

      {/* Progress */}
      <div className="progress-container" style={{ zIndex: 1 }}>
        <div className="progress-label">
          <span>{statusText}</span>
          <span style={{ color: 'var(--neon-cyan)' }}>{Math.floor(progress)}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

// ─── Navigation ────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="nav-logo">STELLAR<span style={{ color: 'var(--neon-cyan)' }}>PULSE</span></div>

        <div
          className="nav-links"
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {['Market', 'Tokens', 'Ecosystem', 'Roadmap'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--neon-blue)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              {item}
            </a>
          ))}
          <a
            href="https://stellarterm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
          >
            <span>Launch App</span>
          </a>
        </div>

        <div className="mobile-menu">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid-bg" />

      {/* Glow orbs */}
      <div
        className="glow-orb"
        style={{ width: 600, height: 600, background: 'var(--neon-blue)', top: '-10%', right: '-15%' }}
      />
      <div
        className="glow-orb"
        style={{ width: 400, height: 400, background: 'var(--neon-purple)', bottom: '10%', left: '-10%' }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(0,212,255,0.2)',
              background: 'rgba(0,212,255,0.05)',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--neon-cyan)',
                boxShadow: '0 0 8px var(--neon-cyan)',
                animation: 'dotPulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'var(--neon-cyan)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Live on Stellar Network
            </span>
          </div>

          <h1 className="hero-headline">
            Discover Trending<br />Stellar Tokens<br />
            <span style={{ color: 'var(--neon-cyan)' }}>Before Everyone Else</span>
          </h1>

          <p className="hero-sub">
            Track fresh ecosystem trends, meme tokens, and high-potential Stellar
            assets in real time. Powered by on-chain AI trend analysis.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://stellarterm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>Explore Stellar Market</span>
            </a>
            <a href="#tokens" className="btn-secondary">
              View Trending Tokens
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Tokens Tracked', value: '1,847' },
              { label: 'Daily Volume', value: '$48.2M' },
              { label: 'Active Wallets', value: '94,132' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--neon-blue)',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards */}
        <div style={{ position: 'relative', height: 420, display: 'flex', alignItems: 'center' }}>
          {[
            { top: '5%', right: '5%', token: TOKENS[4], delay: '0s' },
            { top: '35%', right: '18%', token: TOKENS[0], delay: '-2s' },
            { top: '65%', right: '2%', token: TOKENS[1], delay: '-4s' },
          ].map(({ top, right, token, delay }, i) => (
            <div
              key={i}
              className="floating-card glass-card"
              style={{
                position: 'absolute',
                top,
                right,
                padding: '1rem 1.25rem',
                minWidth: 200,
                animationDelay: delay,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <div
                  className="token-icon"
                  style={{
                    background: `linear-gradient(135deg, ${token.color}20, ${token.color}05)`,
                    border: `1px solid ${token.color}30`,
                    color: token.color,
                    width: 36,
                    height: 36,
                    fontSize: '0.6rem',
                  }}
                >
                  {token.symbol}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '0.85rem' }}>
                    {token.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{token.symbol}</div>
                </div>
                <div className={`trend-badge ${token.up ? 'trend-up' : 'trend-down'}`} style={{ marginLeft: 'auto' }}>
                  {token.change}
                </div>
              </div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 600, color: token.color }}>
                ${token.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Ticker ────────────────────────────────────────────────────────────────

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      style={{
        borderTop: '1px solid rgba(0,212,255,0.08)',
        borderBottom: '1px solid rgba(0,212,255,0.08)',
        background: 'rgba(5,8,15,0.8)',
        padding: '0.75rem 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="ticker-wrap">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: 'var(--text-secondary)' }}>{item.symbol}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.price}</span>
              <span className={item.up ? 'neon-text-cyan' : ''} style={!item.up ? { color: '#ff4d8d' } : {}}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Trending Tokens ───────────────────────────────────────────────────────

function TrendingTokens() {
  return (
    <section id="tokens" style={{ background: 'var(--dark-800)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-label">Real-time Data</div>
          <h2 className="section-title">
            Trending Stellar <span className="neon-text-blue">Tokens</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 480 }}>
            AI-powered trend scores updated every 60 seconds. Fresh alpha from the Stellar DEX.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {TOKENS.map((token, i) => (
            <div
              key={token.id}
              className="token-card reveal"
              style={{ animationDelay: `${i * 0.08}s`, transitionDelay: `${i * 0.08}s` }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    className="token-icon"
                    style={{
                      background: `linear-gradient(135deg, ${token.color}22, ${token.color}08)`,
                      border: `1px solid ${token.color}30`,
                      color: token.color,
                    }}
                  >
                    {token.symbol.slice(0, 4)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{token.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono'" }}>
                      {token.symbol}/XLM
                    </div>
                  </div>
                </div>
                <TrendScoreRing score={token.trendScore} color={token.color} />
              </div>

              {/* Price row */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: token.color,
                  }}
                >
                  ${token.price}
                </div>
                <span className={`trend-badge ${token.up ? 'trend-up' : 'trend-down'}`}>
                  {token.up ? '▲' : '▼'} {token.change}
                </span>
              </div>

              {/* Chart */}
              <MiniChart points={token.chartPoints} color={token.color} />

              {/* Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.5rem',
                  margin: '0.75rem 0 1rem',
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}
              >
                {[
                  { label: 'Vol 24h', value: token.volume },
                  { label: 'MCap', value: token.mcap },
                  { label: 'Score', value: `${token.trendScore}/100` },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Trend Score label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.75rem',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '6px',
                  background: `${token.color}10`,
                  border: `1px solid ${token.color}20`,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill={token.color}>
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7zM9 21h6v1H9z" />
                </svg>
                <span style={{ fontSize: '0.7rem', color: token.color, fontFamily: "'JetBrains Mono'" }}>
                  AI Trend Score: {token.trendScore >= 90 ? 'EXPLOSIVE' : token.trendScore >= 75 ? 'BULLISH' : token.trendScore >= 60 ? 'MODERATE' : 'COOLING'}
                </span>
              </div>

              <a
                href="https://stellarterm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="trade-btn"
                style={{ width: '100%', borderColor: `${token.color}30`, color: token.color }}
              >
                Trade on StellarTerm
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Live Market ───────────────────────────────────────────────────────────

function LiveMarket() {
  const [activities, setActivities] = useState(ACTIVITIES.slice(0, 5))
  const [xlmPrice] = useState('0.1247')
  const [xlmChange] = useState('+2.34%')

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)]
      setActivities((prev) => [newActivity, ...prev.slice(0, 4)])
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="market">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-label">Live Data</div>
          <h2 className="section-title">
            Market <span className="neon-text-cyan">Intelligence</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* XLM Widget */}
          <div className="price-widget reveal">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Stellar Lumens
                </div>
                <div className="price-display">${xlmPrice}</div>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #00d4ff, #a855f7, #06ffd4, #00d4ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--dark-800)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 800,
                    fontSize: '0.65rem',
                    color: 'var(--neon-cyan)',
                  }}
                >
                  XLM
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="trend-badge trend-up">{xlmChange} 24h</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MCap: $3.42B</span>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,212,255,0.08)' }}>
              {[
                { label: 'Vol 24h', val: '$182M' },
                { label: 'Circ. Supply', val: '29.3B' },
                { label: 'All-time High', val: '$0.938' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.35rem 0',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          <div
            className="glass-card reveal"
            style={{ padding: '1.5rem', gridColumn: 'span 2' }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Market Heatmap
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(2, 80px)',
                gap: '6px',
              }}
            >
              {HEATMAP.map((cell, i) => (
                <div
                  key={i}
                  className="heatmap-cell"
                  style={{
                    background: cell.color,
                    border: `1px solid ${cell.color.replace('0.', '0.4').slice(0, -1)}`,
                    gridColumn: i === 0 ? 'span 2' : undefined,
                    gridRow: i === 0 ? 'span 2' : undefined,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: i === 0 ? '0.85rem' : '0.7rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {cell.symbol}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      color: cell.change.startsWith('+') ? 'var(--neon-cyan)' : '#ff4d8d',
                      fontWeight: 600,
                    }}
                  >
                    {cell.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-card reveal" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--neon-cyan)',
                  boxShadow: '0 0 8px var(--neon-cyan)',
                  animation: 'dotPulse 1.5s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Live Activity
              </span>
            </div>
            {activities.map((act, i) => (
              <div key={`${act.token}-${i}`} className="activity-item">
                <div
                  className="activity-dot"
                  style={{
                    background: act.color,
                    boxShadow: `0 0 6px ${act.color}`,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                    <span style={{ color: act.color }}>{act.action}</span>{' '}
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.72rem' }}>{act.token}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono'" }}>
                    {act.amount} @ ${act.price}
                  </div>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono'", flexShrink: 0 }}>
                  {Math.floor(Math.random() * 30 + 1)}s ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Why Stellar ───────────────────────────────────────────────────────────

const WHY_FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Fast Transactions',
    desc: 'Stellar settles transactions in 3–5 seconds — orders of magnitude faster than legacy blockchain networks.',
    stat: '3-5s',
    statLabel: 'Finality',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Ultra-Low Fees',
    desc: 'Transaction costs are fractions of a cent. Trade hundreds of tokens without fee anxiety.',
    stat: '$0.00001',
    statLabel: 'Per Tx',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: 'Decentralized DEX',
    desc: 'The Stellar DEX is built directly into the protocol. No wrapped tokens, no bridge risks.',
    stat: '100%',
    statLabel: 'On-chain',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'Global Payments',
    desc: 'Built for cross-border finance. Move value to 180+ countries with automatic path payment routing.',
    stat: '180+',
    statLabel: 'Countries',
  },
]

function WhyStellar() {
  return (
    <section id="ecosystem" style={{ background: 'var(--dark-800)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>The Foundation</div>
          <h2 className="section-title">
            Why <span className="gradient-text">Stellar</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 520, margin: '0.75rem auto 0' }}>
            The infrastructure powering the next generation of tokenized finance.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {WHY_FEATURES.map((f, i) => (
            <div
              key={i}
              className="feature-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: 'var(--neon-purple)',
                  marginBottom: '0.2rem',
                }}
              >
                {f.stat}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono'", marginBottom: '0.75rem' }}>
                {f.statLabel}
              </div>
              <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Roadmap ───────────────────────────────────────────────────────────────

const ROADMAP = [
  {
    quarter: 'Q2 2025',
    title: 'Trend Discovery Engine',
    desc: 'Real-time on-chain signal aggregation across the Stellar DEX. Token trending scores, liquidity depth analysis, and whale wallet tracking go live.',
    status: 'live',
    items: ['On-chain signal aggregation', 'Liquidity depth analysis', 'Whale wallet alerts'],
  },
  {
    quarter: 'Q3 2025',
    title: 'AI Token Scanner',
    desc: 'Machine learning model trained on Stellar DEX patterns to identify emerging tokens before they trend. Early-access alerts for community members.',
    status: 'building',
    items: ['ML pattern recognition', 'Early-access alerts', 'Risk scoring system'],
  },
  {
    quarter: 'Q4 2025',
    title: 'Community Launchpad',
    desc: 'A fair-launch platform for new Stellar ecosystem tokens. Community voting, vetting, and initial liquidity provision through decentralized pools.',
    status: 'planned',
    items: ['Fair-launch protocol', 'Community governance', 'Liquidity bootstrapping'],
  },
]

function Roadmap() {
  return (
    <section id="roadmap">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-label">Protocol Development</div>
          <h2 className="section-title">
            Ecosystem <span className="neon-text-blue">Roadmap</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {ROADMAP.map((item, i) => (
            <div key={i} className="roadmap-item reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="roadmap-dot" />
              <div className="roadmap-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      color: 'var(--neon-blue)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.quarter}
                  </span>
                  <span
                    style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      ...(item.status === 'live'
                        ? { background: 'rgba(6,255,212,0.12)', color: 'var(--neon-cyan)', border: '1px solid rgba(6,255,212,0.25)' }
                        : item.status === 'building'
                        ? { background: 'rgba(0,212,255,0.1)', color: 'var(--neon-blue)', border: '1px solid rgba(0,212,255,0.2)' }
                        : { background: 'rgba(168,85,247,0.1)', color: 'var(--neon-purple)', border: '1px solid rgba(168,85,247,0.2)' }),
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 1rem' }}>
                  {item.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {item.items.map((it, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--neon-cyan)',
                          flexShrink: 0,
                        }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Community ─────────────────────────────────────────────────────────────

function Community() {
  return (
    <section style={{ background: 'var(--dark-800)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Join the Movement</div>
          <h2 className="section-title">
            Build with the <span className="neon-text-purple">Community</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 480, margin: '0.75rem auto 0' }}>
            Connect with thousands of Stellar ecosystem builders, traders, and token hunters.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <a
            href="#"
            className="community-btn"
            style={{
              borderColor: 'rgba(114,137,218,0.3)',
              color: '#7289da',
              background: 'rgba(114,137,218,0.07)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(114,137,218,0.14)'
              el.style.borderColor = 'rgba(114,137,218,0.5)'
              el.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(114,137,218,0.07)'
              el.style.borderColor = 'rgba(114,137,218,0.3)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#7289da">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.056a19.91 19.91 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Join Discord
          </a>

          <a
            href="#"
            className="community-btn"
            style={{
              borderColor: 'rgba(0,136,204,0.3)',
              color: '#0088cc',
              background: 'rgba(0,136,204,0.07)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(0,136,204,0.14)'
              el.style.borderColor = 'rgba(0,136,204,0.5)'
              el.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(0,136,204,0.07)'
              el.style.borderColor = 'rgba(0,136,204,0.3)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0088cc">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram Channel
          </a>

          <a
            href="#"
            className="community-btn"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              color: 'var(--text-primary)',
              background: 'rgba(255,255,255,0.04)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.08)'
              el.style.borderColor = 'rgba(255,255,255,0.25)'
              el.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.04)'
              el.style.borderColor = 'rgba(255,255,255,0.12)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
        </div>

        {/* Social proof */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { n: '18,400+', label: 'Discord members' },
            { n: '9,200+', label: 'Telegram subscribers' },
            { n: '31,700+', label: 'X followers' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: 'var(--neon-purple)',
                }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        background: 'var(--dark-900)',
        borderTop: '1px solid rgba(0,212,255,0.08)',
        padding: '4rem 2rem 2rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <div className="nav-logo" style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>
              STELLAR<span style={{ color: 'var(--neon-cyan)' }}>PULSE</span>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 240 }}>
              Your real-time intelligence layer for the Stellar blockchain ecosystem.
            </p>
          </div>

          {[
            {
              title: 'Explore',
              links: [
                { label: 'Stellar Blockchain', href: 'https://stellar.org' },
                { label: 'Stellar DEX', href: 'https://stellarterm.com' },
                { label: 'XLM Trading', href: 'https://stellarterm.com' },
                { label: 'Stellar Meme Tokens', href: '#tokens' },
                { label: 'Crypto Trends', href: '#market' },
              ],
            },
            {
              title: 'Resources',
              links: [
                { label: 'Stellar Docs', href: 'https://developers.stellar.org' },
                { label: 'StellarTerm', href: 'https://stellarterm.com' },
                { label: 'Stellar Expert', href: 'https://stellar.expert' },
                { label: 'StellarBeat', href: 'https://stellarbeat.io' },
              ],
            },
            {
              title: 'Protocol',
              links: [
                { label: 'Roadmap', href: '#roadmap' },
                { label: 'Community', href: '#community' },
                { label: 'AI Trend Engine', href: '#tokens' },
                { label: 'Privacy Policy', href: '#' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-link"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0,212,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
            © 2025 StellarPulse. Not financial advice. All token data is for informational purposes only.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(139,174,196,0.4)', margin: 0, fontFamily: "'JetBrains Mono'" }}>
            Built on Stellar · Deployed on Netlify
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Particles ─────────────────────────────────────────────────────────────

function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number; color: string }[] = []

    const COLORS = ['rgba(0,212,255,', 'rgba(6,255,212,', 'rgba(168,85,247,']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${0.15 + Math.sin(Date.now() * 0.001 + p.a) * 0.1})`
        ctx.fill()
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return canvasRef
}

// ─── Scroll reveal hook ────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Mouse glow hook ───────────────────────────────────────────────────────

function useMouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return glowRef
}

// ─── Main Page ─────────────────────────────────────────────────────────────

function StellarPulse() {
  const [loaded, setLoaded] = useState(false)
  const particlesRef = useParticles()
  const glowRef = useMouseGlow()

  useScrollReveal()

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <canvas ref={particlesRef} id="particle-canvas" />
      <div ref={glowRef} className="mouse-glow" />

      <div className="main-content" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Nav />
        <Hero />
        <Ticker />
        <TrendingTokens />
        <div className="section-divider" />
        <LiveMarket />
        <div className="section-divider" />
        <WhyStellar />
        <div className="section-divider" />
        <Roadmap />
        <div className="section-divider" />
        <Community />
        <Footer />
      </div>
    </>
  )
}
