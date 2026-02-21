# EVIOS Call-One Template

Personalized, animated single-page website shown to prospects after booking a cold call with EVIOS. Replaces traditional PowerPoint slides with a dynamic, interactive experience that pulls prospect-specific data into a dark, modern presentation.

## Quick Start

```bash
npm install
cp .env.local.example .env.local   # add your DATABASE_URL
npm run db:migrate                  # create the table
npm run dev                         # http://localhost:3000
```

### Viewing a prospect locally

Append `?slug=<prospect-slug>` to the URL:

```
http://localhost:3000?slug=acme-plumbing
```

In production, the middleware rewrites `<slug>.evioshq.com` → `?slug=<slug>` automatically.

---

## Architecture Overview

```
src/
├── app/
│   ├── api/discovery/[slug]/route.ts  # REST API — GET/PUT/DELETE discovery data
│   ├── globals.css                    # Tailwind + CSS variables + keyframe animations
│   ├── layout.tsx                     # Root layout (fonts, metadata)
│   └── page.tsx                       # Main entry — reads slug, loads config, renders sections
├── components/
│   ├── ThemeProvider.tsx     # Injects CSS variable overrides from ProspectConfig.theme
│   ├── Navbar.tsx            # Fixed nav bar, appears on scroll
│   ├── Hero.tsx              # Full-screen intro with staggered animations + watermark slot
│   ├── TeamSection.tsx       # EVIOS founders with interactive bios
│   ├── ProcessSection.tsx    # Three-step process, interactive two-column layout
│   ├── StatsSection.tsx      # Animated metrics, personalized with prospect data
│   ├── DiscoveryIntro.tsx    # Transition into workshop — easter egg slot
│   ├── DiscoverySnapshot.tsx # Structured business data capture (DB-backed)
│   ├── ProcessMapper.tsx     # Interactive process mapping & pain points (DB-backed)
│   ├── Closing.tsx           # Sign-off with live summary of captured data + easter egg slot
│   └── ScrollReveal.tsx      # Reusable scroll-triggered animation wrapper
├── config/
│   ├── types.ts              # ProspectConfig, ThemeConfig, LinkedInData types
│   └── prospects.ts          # Prospect data store (add new prospects here)
├── hooks/
│   ├── useInView.ts          # IntersectionObserver hook
│   ├── useAnimatedCounter.ts # Number animation hook
│   └── usePersistedState.ts  # Shared hook: API-first persistence with localStorage fallback
├── lib/
│   └── db.ts                 # Neon serverless client
└── middleware.ts              # Subdomain → slug rewriting for Vercel

db/
├── migrate.sql               # Table creation DDL
└── migrate.ts                # Script to run migrations (npm run db:migrate)
```

### Page Flow

1. **Hero** — EVIOS logo, "Prepared exclusively for [Company]", prospect logo, contact info
2. **TeamSection** — Carl-Luca, Zad, Facundo with click-to-reveal bios
3. **ProcessSection** — How EVIOS works (three interactive tabs)
4. **StatsSection** — Key metrics animated on scroll, personalized pain points
5. **DiscoveryIntro** — Transition text, pre-call notes, easter egg
6. **DiscoverySnapshot** — Interactive business context capture (team size, revenue, software, goals)
7. **ProcessMapper** — Map prospect's current pipeline stages and flag pain points
8. **Closing** — Summary of captured data (polls every 5s for live updates), sign-off, easter egg

---

## Data Persistence

### How It Works

Discovery data (Business Snapshot + Process Mapper) is stored in a **Neon Postgres database** via API routes, with automatic **localStorage fallback** when the DB isn't configured.

```
Browser → PUT /api/discovery/:slug → Neon Postgres
Browser → GET /api/discovery/:slug → Neon Postgres
```

If `DATABASE_URL` is not set, the API returns `503` and the components seamlessly fall back to localStorage. This means the site works locally without a database — you just don't get cross-device sync.

### Database Schema

One table, two rows per prospect:

```sql
CREATE TABLE discovery_data (
  slug       TEXT      NOT NULL,
  data_type  TEXT      NOT NULL CHECK (data_type IN ('snapshot', 'mapper')),
  payload    JSONB     NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (slug, data_type)
);
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/discovery/:slug` | Returns `{ snapshot: {...}, mapper: {...} }` |
| `PUT` | `/api/discovery/:slug` | Upserts data. Body: `{ type: "snapshot"\|"mapper", payload: {...} }` |
| `DELETE` | `/api/discovery/:slug` | Removes all discovery data for this slug |

### Persistence Behavior

- **DiscoverySnapshot** and **ProcessMapper** use the `usePersistedState` hook
- On mount: tries API first, falls back to localStorage if API returns 503 or fails
- On change: debounced save (600ms) to API, falls back to localStorage on error
- **Closing** section fetches from API and polls every 5 seconds for live summary updates

---

## Neon Database Setup (Per-Prospect)

Each prospect gets their own Neon project. With ~7 concurrent prospects max and active cleanup, this stays comfortably within Neon's free tier (10 projects).

### Manual Setup

1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project (name it after the prospect slug)
3. Copy the connection string
4. Set it as `DATABASE_URL` in `.env.local` (local) or Vercel env vars (production)
5. Run the migration:
   ```bash
   DATABASE_URL="postgresql://..." npm run db:migrate
   ```

### Automated Setup via Neon API (for OpenClaw)

```bash
# 1. Create a Neon project
RESPONSE=$(curl -s -X POST https://console.neon.tech/api/v2/projects \
  -H "Authorization: Bearer $NEON_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"project": {"name": "<slug>"}}')

# 2. Extract the connection string
DATABASE_URL=$(echo $RESPONSE | jq -r '.connection_uris[0].connection_uri')

# 3. Run migration
DATABASE_URL="$DATABASE_URL" npm run db:migrate

# 4. Set in Vercel env vars
vercel env add DATABASE_URL production <<< "$DATABASE_URL"
```

### Teardown (When Prospect Is Done)

```bash
# Option A: Delete just the data
curl -X DELETE https://<slug>.evioshq.com/api/discovery/<slug>

# Option B: Delete the entire Neon project (preferred)
curl -X DELETE https://console.neon.tech/api/v2/projects/<project-id> \
  -H "Authorization: Bearer $NEON_API_KEY"
```

---

## How to Add a New Prospect

### 1. Create the prospect config

Open `src/config/prospects.ts` and add a new entry to the `prospects` object:

```typescript
"<slug>": {
  slug: "<slug>",                          // URL-safe, lowercase, hyphens only
  companyName: "Acme Plumbing Co.",
  contactFirstName: "John",
  contactLastName: "Smith",
  contactTitle: "Owner & General Manager",
  logoUrl: "/prospects/<slug>/logo.png",   // place file in public/prospects/<slug>/
  industry: "Plumbing",                    // used in StatsSection
  linkedin: {
    profileUrl: "https://linkedin.com/in/...",
    university: "University of Texas at Austin",
    degree: "Business Administration",
    previousCompanies: ["Roto-Rooter", "ServiceMaster"],
    yearsInBusiness: 12,
    interests: ["Golf", "BBQ Competitions"],
    funFact: "Started his first plumbing business at age 23",
  },
  callNotes: "Struggling with lead response time...",   // optional, shown in DiscoveryIntro
  painPoints: [                                          // optional, shown in StatsSection
    "Slow lead response — 30+ minute average",
    "Manual dispatch with pen and paper",
  ],
  suggestedSolutions: [                                  // optional, shown in StatsSection
    "AI Voice Agent for instant lead response",
    "Automated dispatch & routing system",
  ],
  theme: {                                               // optional, see Theming section
    accent: "#BF5700",
    accentLight: "#E87511",
    accentDark: "#994600",
    themeLabel: "ut-austin",
    watermarkUrl: "/prospects/<slug>/watermark.png",
    easterEggIntro: "Hook 'em, John. 🤘",
    easterEggClosing: "Let's get this Longhorn operation running.",
  },
},
```

### 2. Add prospect assets

```
public/prospects/<slug>/
├── logo.png            # Company logo (transparent background, ~300px wide)
└── watermark.png       # Optional theme watermark (large, used at 3% opacity in Hero)
```

### 3. Provision database

```bash
# Via Neon API or dashboard — see "Neon Database Setup" section above
```

### 4. Test locally

```
http://localhost:3000?slug=<slug>
```

### 5. Deploy

Push to the repo. Vercel will automatically serve it at `<slug>.evioshq.com`.

---

## Theming System

Every prospect can have a fully custom color theme. The `theme` field in `ProspectConfig` controls the entire site's accent color scheme and special content.

### ThemeConfig Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `accent` | hex string | `"#0A7AFF"` | Primary accent color (buttons, glows, text highlights) |
| `accentLight` | hex string | `"#3D9AFF"` | Lighter variant for hover states |
| `accentDark` | hex string | `"#0860CC"` | Darker variant for pressed states |
| `watermarkUrl` | string | — | Image shown faintly (3% opacity) in Hero background |
| `easterEggIntro` | string | — | Personalized text in the DiscoveryIntro section |
| `easterEggClosing` | string | — | Personalized text in the Closing section |
| `themeLabel` | string | — | Internal label for reference (e.g. `"star-wars"`, `"ut-austin"`) |

### How It Works

1. `ThemeProvider` (wraps the entire page) reads `prospect.theme`
2. It resolves missing fields against `DEFAULT_THEME` from `types.ts`
3. It sets CSS custom properties on `<html>`:
   - `--color-evios` — hex value
   - `--color-evios-light` — hex value
   - `--color-evios-dark` — hex value
   - `--color-evios-rgb` — comma-separated RGB (e.g. `"10, 122, 255"`)
   - `--color-evios-light-rgb` — comma-separated RGB
4. All components use these variables via Tailwind classes (`text-evios`, `bg-evios`, `border-evios`) and inline `rgba(var(--color-evios-rgb), <alpha>)` for glows/shadows
5. Changing `accent` automatically changes every glow, shadow, border, and text highlight site-wide

### Theme Ideas by Research Signal

| Signal Found | Theme Suggestion |
|---|---|
| University of Texas alumni | `accent: "#BF5700"` (burnt orange), UT watermark, "Hook 'em" easter eggs |
| Cowboys fan | `accent: "#003594"` (navy), star watermark, football references |
| Star Wars fan | `accent: "#FFE81F"` (yellow), lightsaber watermark, "May the force" easter eggs |
| Military veteran | `accent: "#4B5320"` (army green), flag watermark, service acknowledgment |
| College sports | Use the school's primary color, mascot as watermark |

### No Theme (Default)

If `theme` is omitted or empty, the site uses EVIOS default blue (`#0A7AFF`). This is the base template look.

---

## CSS Variables Reference

All theme-aware colors are defined in `globals.css` and overridden at runtime by `ThemeProvider`:

```css
:root {
  --color-evios: #0A7AFF;          /* Primary accent (hex) */
  --color-evios-light: #3D9AFF;    /* Light variant (hex) */
  --color-evios-dark: #0860CC;     /* Dark variant (hex) */
  --color-evios-rgb: 10, 122, 255; /* For rgba() usage */
  --color-evios-light-rgb: 61, 154, 255;

  --color-bg: #050508;             /* Page background */
  --color-bg-elevated: #0A0A12;    /* Alternating section bg */
  --color-bg-card: #0E0E1A;        /* Card surfaces */
  --color-border: #161625;          /* Default borders */
  --color-text: #F0F0F5;            /* Primary text */
  --color-text-secondary: #7E8594;  /* Secondary text */
  --color-text-muted: #484D5A;      /* Muted text */
}
```

---

## Image Assets

```
public/
├── evios-logo-blue.png     # EVIOS logo (blue variant) — used in Hero + Closing
├── evios-logo-white.png    # EVIOS logo (white variant)
├── team/
│   ├── carl-luca.png       # Founder headshot
│   ├── zad.png             # Founder headshot (preprocessed for composition)
│   └── facundo.png         # Founder headshot
└── prospects/
    └── <slug>/
        ├── logo.png        # Prospect company logo
        └── watermark.png   # Optional theme watermark
```

---

## Deployment (Vercel)

1. Connect repo to Vercel
2. Add wildcard domain: `*.evioshq.com`
3. Set `DATABASE_URL` in Vercel environment variables
4. The middleware in `src/middleware.ts` extracts subdomain and rewrites to `?slug=`
5. Each prospect is accessible at `<slug>.evioshq.com`

---

## Automation Agent Checklist (OpenClaw)

When an AI agent creates a new prospect site, it should follow this sequence:

### Step 1: Research

Research the contact via LinkedIn and public sources:
- University, degree, previous companies
- Personal interests, fun facts
- Company details (industry, size, pain signals)

### Step 2: Choose a Theme

Based on research:
- Pick the strongest personal signal (college, sports team, hobby)
- Select `accent` / `accentLight` / `accentDark` hex colors
- Optionally source a watermark image
- Write personalized `easterEggIntro` and `easterEggClosing` text

### Step 3: Provision Neon Database

```bash
RESPONSE=$(curl -s -X POST https://console.neon.tech/api/v2/projects \
  -H "Authorization: Bearer $NEON_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"project": {"name": "<slug>"}}')

DATABASE_URL=$(echo $RESPONSE | jq -r '.connection_uris[0].connection_uri')
PROJECT_ID=$(echo $RESPONSE | jq -r '.project.id')
```

Store `PROJECT_ID` for later teardown.

### Step 4: Run Migration

```bash
DATABASE_URL="$DATABASE_URL" npm run db:migrate
```

### Step 5: Create Prospect Config

Add entry to `src/config/prospects.ts` with all fields populated from research.

### Step 6: Add Assets

- `public/prospects/<slug>/logo.png` — company logo
- `public/prospects/<slug>/watermark.png` — optional theme watermark

### Step 7: Set Vercel Env Var

```bash
vercel env add DATABASE_URL production <<< "$DATABASE_URL"
```

### Step 8: Build, Commit, Deploy

```bash
npm run build
git init && git add -A && git commit -m "Add prospect: <company-name>"
git remote add origin <repo-url>
git push -u origin main
```

### Step 9: Teardown (When Prospect Is Done)

```bash
# Delete the Neon project entirely
curl -X DELETE "https://console.neon.tech/api/v2/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $NEON_API_KEY"
```

### Files the Agent Modifies

| File | What Changes |
|---|---|
| `src/config/prospects.ts` | Add new entry to `prospects` object |
| `public/prospects/<slug>/logo.png` | New file — company logo |
| `public/prospects/<slug>/watermark.png` | New file — optional watermark |

**No other source files need modification.** The entire site dynamically renders from the config.

### Environment Variables Required

| Variable | Where | Description |
|---|---|---|
| `DATABASE_URL` | `.env.local` / Vercel | Neon Postgres connection string |
| `NEON_API_KEY` | OpenClaw env | Neon API key for project provisioning |

---

## Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **@neondatabase/serverless** — Postgres driver for edge/serverless
- **Lucide React** — Icon library
- **Vercel** — Deployment with wildcard subdomains
