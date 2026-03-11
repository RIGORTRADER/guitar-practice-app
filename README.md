# Bugün Gitarda Ne Çalışsam?

A small Next.js app that helps a guitarist generate a focused daily practice plan, log completed sessions, and review practice balance across core areas.

The current product is intentionally lightweight: one main page, local-only persistence, and a small recommendation engine backed by curated task data.

## Project Overview

This app is a front-end MVP for structured guitar practice.

Users can:
- choose a focus area
- choose a session duration
- choose a difficulty level
- generate a short practice plan
- log the actual minutes they practiced
- review simple summary metrics and recent sessions

There is no backend, user account system, or cloud sync. All session history is stored in the browser.

## Main Features

- Practice plan generation based on focus, duration, and difficulty
- Mixed recommendation mode for undecided sessions (`Kararsızım`)
- Basic avoidance of repeating the previous category in mixed mode
- Session logging with safe minute sanitization
- Local session history stored in `localStorage`
- Summary cards for total sessions, total minutes, and category balance

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- Node built-in test runner (`node:test`) with TypeScript compiled through `tsc`

## Project Structure

```text
src/
  app/
    globals.css          Global Tailwind import and app-wide styles
    layout.tsx           Root layout and metadata
    page.tsx             Main page container and state orchestration
  components/
    GeneratedPlan.tsx    Plan display and session save form
    SelectionPanel.tsx   Focus, duration, and difficulty controls
    SessionHistory.tsx   Recent session list
    SessionSummary.tsx   Summary metrics and category balance
  data/
    tasks.ts             Curated practice task dataset and shared task types
  lib/
    practice-options.ts  Shared UI option constants
    recommendation.ts    Recommendation logic
    recommendation.test.ts
    sessions.ts          Session sanitization and minute clamping helpers
    sessions.test.ts
```

## Recommendation Logic

The recommendation engine lives in [src/lib/recommendation.ts](/Users/omurlualtinisik/guitar-practice-app/src/lib/recommendation.ts).

At a high level:

1. The app maps duration to a target item count.
   - `10` minutes -> `2` items
   - `15-20` minutes -> `3` items
   - `30+` minutes -> `4` items
2. For a specific focus, it first tries to use tasks with the requested difficulty.
3. If there are not enough tasks at that difficulty, it fills the remaining slots from the same focus using other difficulties.
4. For `Kararsızım`, it builds a mixed pool from the main categories instead of using one category-specific bucket.
5. In mixed mode, if a `lastCategory` is provided and there are enough alternatives, it avoids repeating that category.
6. The selected pool is shuffled before the final list is returned.

The task dataset is currently static and stored in [src/data/tasks.ts](/Users/omurlualtinisik/guitar-practice-app/src/data/tasks.ts).

## Session Persistence

Session history is stored in the browser under the `localStorage` key:

```text
guitar-practice-sessions
```

Notes:

- Persistence is client-side only.
- Stored data is sanitized when loaded.
- Malformed session records are dropped.
- Partial or legacy records are normalized with safe defaults when possible.
- Logged practice minutes are clamped to a safe range before saving.

This means the app is resilient to many common `localStorage` corruption or manual-edit cases, but data is still device- and browser-specific.

## Local Development

Requirements:

- Node.js 20+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build locally
- `npm run lint` - run ESLint
- `npm test` - compile test files and run business-logic tests with Node's test runner

## Testing Approach

The current tests focus on core business logic, not UI rendering.

Covered areas:

- recommendation sizing by duration bucket
- difficulty fallback behavior
- mixed-mode handling of the previous category
- unknown-focus edge cases
- minute clamping and sanitization
- malformed and partial session record handling

The test setup is intentionally simple:

- source tests live beside the logic in `src/lib`
- TypeScript tests are compiled using [tsconfig.test.json](/Users/omurlualtinisik/guitar-practice-app/tsconfig.test.json)
- Node's built-in test runner executes the compiled output

## Deployment Notes

This app is suitable for deployment as a standard Next.js application on platforms like Vercel or other Node-compatible hosts.

Production-facing notes:

- There is no backend or database dependency.
- The app no longer depends on external Google font fetching during build.
- Session history is browser-local, so deployments do not share user data across devices.
- A production deployment should still run `npm run lint`, `npm test`, and `npm run build` in CI.

## Known Limitations

- Single-page MVP with no routing beyond the home page
- No backend, authentication, or cloud sync
- No UI integration or end-to-end tests yet
- Task content is hardcoded in a large TypeScript data file
- Recommendation quality is rule-based and intentionally simple
- Session history is limited to the current browser's `localStorage`

## Suggested Next Improvements

- Add component-level integration tests for the main user flows
- Move the task dataset into a more maintainable content format
- Improve recommendation quality using session history beyond just `lastCategory`
- Add app-specific Open Graph image and web app manifest
- Replace the remaining single-page MVP assumptions with a clearer domain structure if the product grows
- Add CI to run lint, tests, and production build automatically

## Handoff Notes

For future development, the most important files to understand first are:

- [src/app/page.tsx](/Users/omurlualtinisik/guitar-practice-app/src/app/page.tsx)
- [src/lib/recommendation.ts](/Users/omurlualtinisik/guitar-practice-app/src/lib/recommendation.ts)
- [src/lib/sessions.ts](/Users/omurlualtinisik/guitar-practice-app/src/lib/sessions.ts)
- [src/data/tasks.ts](/Users/omurlualtinisik/guitar-practice-app/src/data/tasks.ts)

Together, these define the current product behavior, persistence model, and recommendation rules.
