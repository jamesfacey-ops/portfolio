import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const W = 1200;
const H = 630;

const BG = '#0f1117';
const SURFACE = '#1a1d27';
const ACCENT = '#6366f1';
const TEXT = '#e2e8f0';
const MUTED = '#64748b';
const BORDER = '#2a2d3a';

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function ogSvg({ title, subtitle, tag }) {
  title = esc(title); subtitle = esc(subtitle); tag = esc(tag);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>

  <!-- Top border accent -->
  <rect width="${W}" height="4" fill="${ACCENT}"/>

  <!-- Surface card -->
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}"
    rx="16" ry="16"
    fill="${SURFACE}" stroke="${BORDER}" stroke-width="1"/>

  <!-- Tag pill -->
  <rect x="100" y="110" width="${tag.length * 10 + 40}" height="36"
    rx="18" ry="18"
    fill="${ACCENT}" fill-opacity="0.15" stroke="${ACCENT}" stroke-width="1"/>
  <text x="${100 + tag.length * 5 + 20}" y="133"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="14" font-weight="500"
    fill="${ACCENT}" text-anchor="middle">${tag}</text>

  <!-- Title -->
  <text x="100" y="230"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="52" font-weight="700"
    fill="${TEXT}">${title}</text>

  <!-- Subtitle -->
  <text x="100" y="300"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="22" font-weight="400"
    fill="${MUTED}">${subtitle}</text>

  <!-- Bottom divider -->
  <line x1="100" y1="460" x2="${W - 100}" y2="460"
    stroke="${BORDER}" stroke-width="1"/>

  <!-- Domain -->
  <text x="100" y="510"
    font-family="ui-monospace, 'JetBrains Mono', monospace"
    font-size="18" font-weight="400"
    fill="${MUTED}">portfolio.jnkfacey.com</text>

  <!-- Author -->
  <text x="${W - 100}" y="510"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="18" font-weight="600"
    fill="${TEXT}" text-anchor="end">James Facey</text>
</svg>`;
}

const images = [
  {
    file: 'public/og-image.png',
    svg: ogSvg({
      title: 'James Facey',
      subtitle: 'AI Integration & Backend Engineer',
      tag: 'Portfolio'
    })
  },
  {
    file: 'public/og/shamus.png',
    svg: ogSvg({
      title: 'Shamus',
      subtitle: 'AI teaching assistant with full classroom management',
      tag: 'Case Study'
    })
  },
  {
    file: 'public/og/orchestrator.png',
    svg: ogSvg({
      title: 'Orchestrator',
      subtitle: 'Multi-agent AI system for homelab automation',
      tag: 'Case Study'
    })
  },
  {
    file: 'public/og/fraya.png',
    svg: ogSvg({
      title: 'Fraya',
      subtitle: 'Personal AI assistant with voice, calendar & smart home',
      tag: 'Case Study'
    })
  }
];

await mkdir('public/og', { recursive: true });

for (const { file, svg } of images) {
  await sharp(Buffer.from(svg))
    .png()
    .toFile(file);
  console.log('Generated:', file);
}

console.log('Done — all OG images generated.');
