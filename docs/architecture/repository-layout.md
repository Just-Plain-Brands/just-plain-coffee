# Repository layout

The repository root is a pnpm workspace coordinated by Turborepo. Each
top-level directory has one responsibility.

## Applications

`apps` contains independently runnable or deployable applications. The current
Shopify Hydrogen application lives at `apps/storefront`. Storybook will be
added later as `apps/storybook` so it can be developed and deployed
independently from the storefront.

Every application owns its runtime dependencies, build configuration,
environment variables, generated files, and deployable public assets.

## Packages

`packages` contains code with more than one application consumer. When
Storybook is introduced, reusable visual modules can move into `packages/ui`
and be referenced with the pnpm `workspace:` protocol.

Do not create generic `shared`, `common`, or `utils` packages. A package should
have a deliberate interface and at least two real consumers.

## Source assets

`assets` contains editable design, brand, packaging, and photography sources.
Applications must not import files directly from this directory. An optimized
or exported runtime asset belongs to the owning application, normally in its
`public` directory.

This separation prevents changes to raw design files from invalidating
application task caches.

## Documentation

`docs` contains human-readable project knowledge. Guides and research are not
workspace packages and do not participate in the application build graph.

## Root tooling

pnpm owns dependency installation, workspace linking, and `pnpm-lock.yaml`.
Turborepo owns task scheduling, dependency ordering, and caching. Oxlint and
Oxfmt provide repository-wide linting and formatting. Lefthook applies those
checks to staged files and runs the full verification workflow before pushes.
Root scripts provide stable entry points; application-specific implementations
remain in each workspace's `package.json`.

Hydrogen's lockfile check only inspects the application directory. The
storefront build disables that check because the committed workspace lockfile
at the repository root remains authoritative for installs and deployments.
