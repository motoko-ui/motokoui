---
name: motoko-ui
description: Guidance for building and documenting Motoko UI components.
---

# Motoko UI

Use this skill when adding components, docs pages, or registry entries to Motoko UI.

## Layout

- Components (future): `apps/www/registry/motokoui/`
- Docs: `apps/www/content/docs/`
- Site config: `apps/www/config/site.ts`, `apps/www/config/docs.ts`

## Workflow

1. Add or update the component under `registry/motokoui/`
2. Add a docs MDX page under `content/docs/`
3. Register the page in `config/docs.ts` sidebar if needed
4. Run `pnpm --filter=www dev` and verify `/docs`

## Rules

- Match existing Motoko UI branding and patterns
- Do not copy Magic UI component implementations unless requested
- Keep docs short and installation-focused
