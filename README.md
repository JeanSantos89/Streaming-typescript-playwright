# Streaming Automation — TMDB E2E Test Suite

Playwright + TypeScript end-to-end automation suite for [The Movie Database (TMDB)](https://www.themoviedb.org), covering authentication, search, ranking, filtering, watchlist management, and pagination.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev) | ^1.57.0 | Browser automation |
| TypeScript | via `@types/node` | Type safety |
| Node.js | 18+ | Runtime |
| dotenv | ^17.2.3 | Environment variable management |

---

## Project Structure

```
.
├── src/
│   ├── elements/           # Locator classes (one per page area)
│   │   ├── CommonElements.ts   # Shared locators (logo, nav, menu)
│   │   ├── AuthElements.ts
│   │   ├── HomeElements.ts
│   │   ├── MoviesElements.ts
│   │   ├── RankingElements.ts
│   │   ├── InterestElements.ts
│   │   └── PaginationElements.ts
│   ├── pages/              # Page Object classes (actions + assertions)
│   │   ├── BasePage.ts         # Shared navigation and interaction helpers
│   │   ├── AuthPage.ts         # Login, logout, cookie banner
│   │   ├── HomePage.ts         # Search flows, movie details
│   │   ├── MoviesPage.ts       # Filter application
│   │   ├── RankingPage.ts      # Top-rated navigation
│   │   ├── InterestPage.ts     # Watchlist CRUD
│   │   └── PaginationPage.ts   # Infinite scroll / load more
│   ├── fixtures/
│   │   └── testData.ts     # Test constants (movie names, dates, selectors)
│   ├── utils/
│   │   └── assertions.ts   # Custom assertion helpers
│   └── globalSetup.ts      # Pre-run environment variable validation
├── tests/
│   ├── e2e/                # End-to-end test specs
│   │   ├── auth.spec.ts        # CT01, CT02
│   │   ├── Interest.spec.ts    # CT03
│   │   ├── MovieFilter.spec.ts # CT05
│   │   ├── Pagination.spec.ts  # CT06, CT07
│   │   ├── ranking.spec.ts     # CT08, CT09
│   │   └── search.spec.ts      # CT10, CT11
│   ├── smoke/
│   │   └── smoke.spec.ts       # CT12, CT13, CT14
│   └── seed.spec.ts        # Sanity check
├── evidence/               # Test artifacts (auto-generated)
│   ├── report/             # HTML report
│   └── test-results/       # Screenshots, videos, traces
├── .github/workflows/      # CI/CD pipeline
├── playwright.config.ts
└── package.json
```

---

## Setup

### Prerequisites

- Node.js 18+
- npm 9+
- A [TMDB account](https://www.themoviedb.org/signup) with username and password

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JeanSantos89/Streaming-typescript-playwright.git
cd Streaming-typescript-playwright

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

### Environment Variables

Create a `.env` file in the project root:

```env
TMDB_USERNAME=your_username
TMDB_PASSWORD=your_password
```

> The `globalSetup` step validates these variables before any test runs and throws a clear error if they are missing.

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run all tests with browser UI visible |
| `npm run test:smoke` | Run only smoke tests |
| `npm run test:e2e` | Run only E2E tests |
| `npm run test:debug` | Run in debug mode (step-by-step) |
| `npm run test:report` | Open the last HTML report |

### Run a specific test file

```bash
npx playwright test tests/e2e/auth.spec.ts
```

### Run a specific test by title

```bash
npx playwright test -g "CT01"
```

---

## Test Coverage

| ID | Suite | Description | Auth Required |
|----|-------|-------------|:---:|
| CT01 | E2E | Login com credenciais válidas | No |
| CT02 | E2E | Login seguido de logout | No |
| CT03 | E2E | Adicionar e remover item da watchlist | Yes |
| CT05 | E2E | Aplicar filtros completos e verificar resultados | No |
| CT06 | E2E | Scroll e paginação como usuário logado | Yes |
| CT07 | E2E | Scroll e paginação como visitante | No |
| CT08 | E2E | Visualizar ranking como usuário logado | Yes |
| CT09 | E2E | Visualizar ranking como visitante | No |
| CT10 | E2E | Pesquisa sem resultados | No |
| CT11 | E2E | Pesquisa com termo parcial | No |
| CT12 | Smoke | Home page carregada corretamente | No |
| CT13 | Smoke | Pesquisa básica funcional | No |
| CT14 | Smoke | Exibir detalhes de conteúdo | No |

---

## Architecture

### Page Object Model (POM)

The project uses a two-layer POM:

```
BasePage
└── AuthPage          (login, logout, cookie banner)
    ├── HomePage      (search, movie details)
    ├── MoviesPage    (filter application)
    ├── RankingPage   (top-rated navigation)
    ├── InterestPage  (watchlist CRUD)
    └── PaginationPage (load-more / infinite scroll)
```

**BasePage** provides protected helpers used by all pages:
- `navigateTo(url)` — navigate and wait for load
- `clickAndWait(locator)` — click and wait for load state
- `fillAndSubmit(locator, text)` — fill input and press Enter
- `expectVisible(locator)` — assert element visibility
- `expectLoaded()` — assert nav bar is visible

### Element Layer

Each page has a corresponding `*Elements` class that centralizes all locators. Shared navigation locators (`logoHome`, `moviesBar`, `popular`) live in `CommonElements` and are extended by the relevant element classes, eliminating duplication.

```
CommonElements        (logoHome, moviesBar, popular)
├── MoviesElements    (filter inputs, genre selectors)
├── RankingElements   (extends CommonElements only)
├── InterestElements  (watchlist buttons, profile links)
└── PaginationElements (movie cards, load-more button)
```

---

## Evidence & Artifacts

On test failure, Playwright automatically captures:

- **Screenshot** — full-page snapshot at the moment of failure
- **Video** — recording of the entire test run
- **Trace** — interactive timeline for debugging in [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)

All artifacts are saved to `evidence/test-results/`. The HTML report is generated at `evidence/report/`.

---

## CI/CD

Tests run automatically on every push to `main` and on pull requests via GitHub Actions (`.github/workflows/playwright.yml`), split into three gates:

- **`assert-quality-audit`** — static check, no browser, no secrets. See [Test Quality Audit](#test-quality-audit) below.
- **`e2e-guest`** — runs every spec that does not require a TMDB login (CT05, CT07, CT09, CT10, CT11, CT12, CT13, CT14, and the sanity check). No secret needed; this is the required gate for most PRs.
- **`e2e-authenticated`** — runs the specs that perform a real TMDB login (CT01, CT02, CT03, CT06, CT08). It needs the repository secrets below and fails fast with a clear message if they are missing, instead of failing deep inside Playwright. **This job is best-effort and informative, not a required quality gate** — see below.

### Why `e2e-authenticated` is best-effort, not a gate

This job logs into the real, production TMDB website — a third-party service we don't control. TMDB runs bot-detection (AWS WAF) in front of its login, and that WAF has twice blocked this job's automated login outright: the job just hung on "Run authenticated tests" for 15+ minutes with no error, no timeout, nothing — it had to be cancelled by hand both times.

We are **not** going to try to evade that protection (fake user-agent, stealth plugins, artificial human-like delays, etc.). TMDB is someone else's real production service, not a test sandbox, and circumventing their bot defenses would violate their terms of use regardless of the automation's intent. That's a hard line, not a trade-off to optimize around.

So instead of pretending this job can be a reliable gate, or letting it hang forever, we made it honest about its own limits:

- `timeout-minutes: 5` — a real, successful login takes seconds; if it's still running after 5 minutes, that's the WAF blocking it, not a slow test. Fail fast instead of hanging until the default 1-hour timeout.
- `continue-on-error: true` — a failure (or timeout) in this job does **not** fail the overall workflow run. The gates we actually control — `assert-quality-audit` and `e2e-guest` — stay required and blocking.

This is not a flaw in the test framework. It's an inherent limitation of testing real automated login against a live third-party service that actively tries to detect and block automation. When this job does pass, its green run and uploaded report are still useful signal — just not a merge requirement.

This repo has no backend/API test layer — TMDB here is exercised through the public UI, not the official TMDB API, so there is no separate "API gate"; the authenticated job is the closest equivalent since it is the one gated by a credential.

Credentials are stored as repository secrets (Settings > Secrets and variables > Actions):
- `TMDB_USERNAME`
- `TMDB_PASSWORD`

These must be a real TMDB account's username and password (not an API key) — the suite logs in through the website's login form.

The HTML report and test artifacts are uploaded as workflow artifacts after each run, one set per job (`*-guest` / `*-authenticated`).

---

## Test Quality Audit

A test that passes without actually checking anything is worse than no test: it
looks like coverage but proves nothing. This repo has already shipped real
selector bugs (TMDB's Kendo→Tailwind migration, a pagination bug, a geoIP bug
in the movie filter) that slipped past a suite that was all green. Since then,
every test in this repo has been reviewed by hand at least once to make sure
it actually asserts something — but hand review doesn't scale and doesn't run
on every PR.

`scripts/audit-test-quality.js` is a static gate (no dependencies, no browser)
that scans `tests/**/*.spec.ts` plus the Page Objects/Elements in `src/pages`
and `src/elements`, and fails the build if it finds:

- a `test(...)`/`it(...)` whose body has no real proof of anything — no direct
  `expect(...)`, and no call to a Page Object method that itself contains an
  `expect(...)` (the suite follows the Page Object Model, so most assertions
  live inside page methods like `expectLoaded()`, not inline in the spec);
- an obviously tautological assert: `expect(x).toBe(x)` with the identical
  expression on both sides, or `expect(true).toBe(true)` /
  `expect(true).toBeTruthy()` with a literal `true`.

Run it locally with:

```bash
node scripts/audit-test-quality.js
```

It runs as its own CI job (`assert-quality-audit`), independent of the guest
and authenticated E2E jobs, so a spec that is green for the wrong reason fails
the build even if the browser run itself passes.

---

## Troubleshooting

**Tests fail with "Missing required environment variables"**
→ Ensure your `.env` file exists and contains `TMDB_USERNAME` and `TMDB_PASSWORD`.

**Cookie banner blocks test flow**
→ `AuthPage.goto()` automatically dismisses the cookie consent banner before any interaction.

**Flaky tests on CI**
→ The config has `retries: 2` — each failing test is retried twice before being marked as failed.

**Browsers not found**
→ Run `npx playwright install` to download the required browser binaries.
