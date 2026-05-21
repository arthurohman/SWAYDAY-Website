# SWAYDAY Website

Official website for SWAYDAY — a Swedish cover/event band available for weddings, corporate events, and concerts.

Built with **Next.js**, **Tailwind CSS v4**, and **next-intl** (Swedish/English). Hero background video is served from **Cloudflare R2**.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + custom brand tokens |
| Animations | Framer Motion |
| i18n | next-intl 4.9.1 (cookie-based, no URL prefixes) |
| Icons | lucide-react |
| Fonts | Bebas Neue + Inter (Google Fonts via next/font) |
| Video CDN | **Cloudflare R2** (public bucket) |

---

## Cloudflare R2

Background video assets are hosted on Cloudflare R2 for fast, bandwidth-efficient delivery.

- Bucket endpoint: `pub-9e5c7500d8b14a3196c2f3c24474759b.r2.dev`
- Current hero video: `background/disconnecting_background.mp4`
- To swap the video, upload a new `.mp4` to R2 and update `VIDEO_SRC` in [src/components/VideoHero.tsx](src/components/VideoHero.tsx)

---

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + static export check
```

---

## File Structure

```
src/
├── app/
│   ├── globals.css          ← Tailwind @theme brand tokens
│   ├── layout.tsx           ← Root layout: fonts, metadata, Providers + Navbar + Footer
│   ├── providers.tsx        ← Client: NextIntlClientProvider + locale context
│   ├── page.tsx             ← Home: VideoHero, AboutSection, SpotifySection, SocialsRow
│   └── book/
│       └── page.tsx         ← Book Us page
├── components/
│   ├── Navbar.tsx           ← Transparent→solid on scroll, mobile hamburger, EN/SV toggle
│   ├── VideoHero.tsx        ← Fullscreen hero — VIDEO_SRC points to Cloudflare R2
│   ├── AboutSection.tsx     ← Band bio + photo
│   ├── SpotifySection.tsx   ← 3x Spotify embed iframes
│   ├── SocialsRow.tsx       ← Instagram, TikTok, Spotify, YouTube, Facebook
│   ├── LiveVideoGallery.tsx ← Live performance video gallery
│   └── Footer.tsx
├── data/
│   └── events.json          ← Past gigs list
└── i18n/
    └── request.ts           ← next-intl server config
messages/
├── sv.json                  ← Swedish strings (default)
└── en.json                  ← English strings
public/
├── logo/
└── images/
    └── band.jpg
```

---

## Content To Update

| What | Where |
|---|---|
| Spotify track IDs | `src/components/SpotifySection.tsx` — replace `TRACK_ID_1/2/3` |
| Social handles | `src/components/SocialsRow.tsx` — verify all URLs |
| Past gigs | `src/data/events.json` |
| Hero video | `src/components/VideoHero.tsx` — update `VIDEO_SRC` if swapping video |

---

## Environment Variables

| Variable | Purpose | Where to set |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `metadataBase` for OG/social preview images | Hosting dashboard or `.env.local` |

---

## Deployment — GitHub Pages

The site generates as a fully static export (`out/`). To deploy to GitHub Pages with a custom domain:

### 1. Enable static export

In [next.config.ts](next.config.ts), add `output: 'export'` to the config object:

```ts
const nextConfig: NextConfig = {
  output: 'export',
};
```

> With a custom domain at the root you do **not** need `basePath`. Only add it if you're serving from a sub-path like `username.github.io/repo-name` without a custom domain.

### 2. Add a GitHub Actions deploy workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://yourdomain.com
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Replace `https://yourdomain.com` with your actual domain once you buy it.

### 3. Add a CNAME file for your custom domain

Create `public/CNAME` containing just your domain (no `https://`):

```
yourdomain.com
```

Next.js copies everything in `public/` into `out/` at build time, so GitHub Pages will pick this up automatically.

### 4. Enable GitHub Pages in repo settings

1. Go to your repo on GitHub → **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Save

### 5. Point your domain to GitHub Pages (do this after buying the domain)

Add these DNS records at your registrar:

**Apex domain (`yourdomain.com`):**

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www subdomain (recommended):**

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `yourusername.github.io` |

DNS propagation typically takes a few minutes to a few hours. Once live, GitHub Pages automatically provisions a free HTTPS certificate via Let's Encrypt.

### 6. Enable HTTPS

Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is provisioned (usually a few minutes after DNS propagates).

---

## Known Non-Fatal Warning

During static generation, `next-intl` logs an `ENVIRONMENT_FALLBACK` warning. The build still succeeds and both pages generate correctly — safe to ignore.
