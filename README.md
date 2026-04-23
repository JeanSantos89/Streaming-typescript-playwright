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

Tests run automatically on every push to `main` and on pull requests via GitHub Actions (`.github/workflows/playwright.yml`).

Credentials are stored as repository secrets:
- `TMDB_USERNAME`
- `TMDB_PASSWORD`

The HTML report and test artifacts are uploaded as workflow artifacts after each run.

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
