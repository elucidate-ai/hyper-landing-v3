# Repository Guidelines

## Project Structure & Module Organization
`src/main.tsx` bootstraps React + router, and `src/App.tsx` contains the lazy-loaded route map.  
Landing page variants live in `src/pages/<variant>/` (for example, `src/pages/storyteller/`) and should keep this pattern:
- `<Variant>Page.tsx` as the page entry
- `components/` for page-local UI blocks
- `<variant>.css` for page styling

Shared code belongs in `src/shared/components`, `src/shared/hooks`, and `src/shared/utils`.  
`src/hub/` contains the hub/root experience, and `src/data/content.ts` stores shared content data.  
`public/` is for static assets copied as-is; `dist/` is generated build output.

## Build, Test, and Development Commands
Use `pnpm` in this repo:
- `pnpm dev`: start local Vite dev server.
- `pnpm build`: run TypeScript project build (`tsc -b`) and produce a production bundle.
- `pnpm preview`: serve the production build locally.
- `pnpm lint`: run ESLint checks.

## Coding Style & Naming Conventions
This project uses TypeScript + React with strict compiler settings (`tsconfig.app.json`).
- Match existing formatting: 2-space indentation, single quotes, trailing commas where applicable.
- Use PascalCase for React components/files (for example, `StorytellerPage.tsx`, `STHero.tsx`).
- Use kebab-case for route folders and page CSS files (for example, `straight-shooter/straight-shooter.css`).
- Keep reusable logic in `src/shared/*`; keep page-specific code inside its page folder.

## Testing Guidelines
There is currently no committed automated test framework.  
Before opening a PR, run:
- `pnpm lint`
- `pnpm build`

Also do a manual smoke test in `pnpm dev` for `/` and any changed routes, on desktop and mobile widths. If you add tests, prefer Vitest + React Testing Library with `*.test.ts(x)` files colocated near components.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects (for example, `Fix build`, `Fix storyteller`). Keep commit messages concise and focused on one logical change.

PRs should include:
- a short summary of what changed and why
- impacted routes/files
- screenshots (or a short recording) for UI updates
- linked issue/task when available
- verification notes (`pnpm lint`, `pnpm build`, manual route checks)
