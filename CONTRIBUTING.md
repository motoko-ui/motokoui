# Contributing to Motoko UI

Thanks for your interest in contributing.

## Setup

1. Fork and clone the repository
2. Install dependencies with `pnpm install`
3. Copy `apps/www/.env.example` to `apps/www/.env.local`
4. Start the app with `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the site |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm format:check` | Check formatting |

## Project layout

- `apps/www` — marketing site and documentation
- `apps/www/content/docs` — MDX docs pages
- `apps/www/registry` — component sources; build with `pnpm --filter=www build:registry` → `public/r`
- `skills/` — agent skills

## Pull requests

Keep PRs focused. Follow conventional commits (`feat:`, `fix:`, `docs:`, etc.).
