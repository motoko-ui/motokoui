# Motoko UI — Agent Guide

This monorepo hosts Motoko UI: a Next.js docs + marketing site for React components.

## Stack

- pnpm workspaces + Turborepo
- Next.js 15 (App Router) in `apps/www`
- React 19, Tailwind CSS 4, fumadocs-mdx for docs
- shadcn/ui patterns under `apps/www/components/ui`

## Key Principles

- Prefer existing patterns in `apps/www` over inventing new structure
- Keep changes scoped; do not port Magic UI component content unless asked
- Registry sources live in `apps/www/registry/motokoui`
- Built registry JSON is generated to `apps/www/public/r` via `pnpm --filter=www build:registry`
- Docs live in `apps/www/content/docs` as MDX

## Before Writing Code

1. Check `apps/www/config/site.ts` and `apps/www/config/docs.ts` for nav/branding
2. Follow TypeScript strictness and accessibility basics
3. Use `pnpm` only (enforced via `only-allow`)

## Common Commands

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm --filter=www build
pnpm lint
pnpm typecheck
```

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Landing |
| `/docs` | Documentation |
| `/docs/installation` | Install guide |

## Do Not

- Commit secrets or `.env.local`
- Add Magic UI component sources unless explicitly requested
- Use npm/yarn instead of pnpm
