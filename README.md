# Creative Portfolio — Next.js + TypeScript

A playful, hand-crafted creative portfolio, rebuilt with **Next.js (App Router)**
and **TypeScript**. Originally a static HTML/CSS/JS site (kept for reference in
[`_legacy/`](./_legacy)).

## Requirements

- Node.js 18.18+ (Node 20+ recommended)

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts (next/font), metadata
│   ├── page.tsx            # Page composition
│   ├── globals.css         # All styling + CSS animations (ported from styles.css)
│   └── components/
│       ├── Hero.tsx        # Hero section
│       ├── Featured.tsx    # Featured projects
│       ├── About.tsx       # About & connect, ID badge
│       ├── Resume.tsx      # Education, toolkit, career, capabilities
│       ├── QrCode.tsx      # Deterministic QR placeholder grid
│       └── MotionLayer.tsx # Client motion layer (reveal, tilt, magnetic, parallax)
├── public/images/          # Image assets (served from /images/...)
├── _legacy/                # Original static site (index.html, styles.css, script.js)
└── ...config files
```

## Fonts

Loaded with [`next/font/google`](https://nextjs.org/docs/app/api-reference/components/font)
and exposed as CSS variables (`--font-funnel`, `--font-inter`, `--font-geist`):

- **Funnel Sans** — headings / display
- **Inter** — body copy
- **Geist** — captions and small UI text

## Icons

Icons use [`lucide-react`](https://lucide.dev) (replacing the original Lucide CDN script).

## Color tokens — "Forest Sage"

Defined as CSS custom properties in `app/globals.css`:

| Token                | Value     | Use                    |
| -------------------- | --------- | ---------------------- |
| `--surface-primary`  | `#F5F3EE` | Page / primary surface |
| `--surface-secondary`| `#C8DBBC` | Secondary surface      |
| `--surface-tertiary` | `#D6E4E8` | Tertiary surface       |
| `--fg-primary`       | `#1B3A28` | Primary text           |
| `--fg-secondary`     | `#4A6B52` | Secondary text         |
| `--fg-inverse`       | `#FFFFFF` | Text on dark surfaces  |
| `--accent-primary`   | `#2D5E3A` | Primary accent         |
| `--accent-secondary` | `#4A8C5E` | Secondary accent       |

Radii: `--radius-card` (`28px`) and `--radius-pill` (`999px`).

## Motion

All client-side motion lives in `app/components/MotionLayer.tsx` (a `"use client"`
component that renders nothing and wires up DOM listeners after mount):

- **Hero hand breathing zoom** — CSS keyframes on `#hero-hand`.
- **Scroll reveal** — `[data-reveal]` elements fade/slide in via `IntersectionObserver`.
- **Card tilt** — `.tilt` elements tilt in 3D toward the cursor.
- **Magnetic buttons** — `.magnetic` elements drift toward the cursor.
- **Hero parallax** — `.hero-hand-wrap` shifts with the cursor over the hero.

All JS-driven motion (and the CSS breathing animation) is **disabled when the
visitor has `prefers-reduced-motion: reduce`** set; scroll-reveal elements are
shown immediately instead.
