---
name: motoko-ui
description: Guidance for building and documenting Motoko UI components.
---

# Motoko UI

Use this skill when adding components, docs pages, or registry entries to Motoko UI.

## Layout

- Components: `apps/www/registry/motokoui/`
- Registry catalog: `apps/www/registry.json`
- Built registry: `apps/www/public/r/` (via `pnpm --filter=www build:registry`)
- Docs: `apps/www/content/docs/`
- Site config: `apps/www/config/site.ts`, `apps/www/config/docs.ts`

## Workflow

1. Add or update the component under `registry/motokoui/`
2. Add an item entry to `apps/www/registry.json` (name, deps, files, cssVars if needed)
3. Add a docs MDX page under `content/docs/`
4. Register the page in `config/docs.ts` sidebar if needed
5. Run `pnpm --filter=www build:registry` then `pnpm --filter=www dev`
6. Verify `/docs` and `/r/<name>.json`

## Rules

- Match existing Motoko UI branding and patterns
- Do not copy Magic UI component implementations unless requested
- Keep docs short and installation-focused
