# Just Plain Coffee

This repository contains the Just Plain Coffee applications, shared packages,
raw design assets, and project documentation.

## Repository layout

- `apps/storefront` — Shopify Hydrogen storefront
- `assets` — editable source assets that are not deployed directly
- `docs` — architecture notes, guides, and research
- `packages` — reusable workspace packages as they are introduced

See [`docs/architecture/repository-layout.md`](docs/architecture/repository-layout.md)
for the ownership rules behind this structure.

## Requirements

- Node.js 22.22 or newer in the Node 22 line, or Node.js 24
- pnpm 11.9.0

## Commands

Run commands from the repository root:

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm dev` starts only the storefront. `pnpm dev:all` will start every
workspace development task once additional applications are present.
