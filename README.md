# Just Plain Coffee
> [!NOTE]
> **Work in progress.** This storefront is under active development. Some flows,
> integrations, and documentation are incomplete or may change.
> 
<img width="1795" height="1097" alt="Screenshot 2026-08-19 at 5 50 51 PM" src="https://github.com/user-attachments/assets/19782015-cc05-4fb9-87ce-e5ec4451d556" />
<img width="1577" height="1237" alt="Screenshot 2026-08-19 at 5 51 20 PM" src="https://github.com/user-attachments/assets/e869eb48-a171-46e6-be60-fd7e2a7191fc" />


Just Plain Coffee is a headless Shopify storefront built with Hydrogen. The
repository includes the customer-facing commerce application, an MDX journal,
and a separate Storybook workspace for developing and reviewing the interface.

## What is implemented

- Product, collection, search, cart, and policy routes backed by Shopify
- Customer account, address, profile, order, and subscription views
- An MDX journal with article pages, related content, an RSS feed, and SEO
  metadata
- Reusable UI components documented with colocated Storybook stories
- Generated GraphQL types for Shopify's Storefront and Customer Account APIs

## Repository structure

```text
apps/
├── storefront/               Shopify Hydrogen application
│   ├── app/
│   │   ├── components/       UI, commerce, navigation, and content components
│   │   ├── graphql/          Customer Account API operations
│   │   ├── lib/              Domain logic and Shopify integrations
│   │   ├── routes/           React Router route modules
│   │   └── styles/           Global styles and Tailwind entry points
│   ├── content/journal/      MDX articles and frontmatter
│   ├── public/               Deployable images and static files
│   └── scripts/              Schema and code-generation utilities
└── storybook/                Independent Storybook application and config

docs/                         Architecture notes, guides, and research
```

The repository is a pnpm workspace coordinated by Turborepo. Components remain
owned by the storefront, with their stories kept beside them; the Storybook app
provides the isolated development environment. More detail is available in
[`docs/architecture/repository-layout.md`](docs/architecture/repository-layout.md).

## Main technologies

| Area                  | Libraries and tools                                                                            | Role                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Commerce              | [Shopify Hydrogen](https://shopify.dev/custom-storefronts/hydrogen), GraphQL, Hydrogen codegen | Storefront runtime, Shopify API access, and generated API types       |
| Application           | React 19, [React Router 7](https://reactrouter.com/start/framework/routing), TypeScript, Vite  | Server-rendered route modules, UI, types, and builds                  |
| Interface             | Tailwind CSS 4, Base UI, Embla Carousel, Lucide, Sonner                                        | Styling, accessible primitives, interaction, icons, and notifications |
| Content               | MDX, Remark, Rehype                                                                            | Journal articles, frontmatter, and Markdown processing                |
| Component development | Storybook 10, Storybook Docs, Storybook a11y                                                   | Isolated component development and accessibility checks               |
| Workspace             | pnpm, Turborepo                                                                                | Dependency management, task orchestration, and caching                |
| Code quality          | Oxlint, Oxfmt, Lefthook                                                                        | Type-aware linting, formatting, and Git hooks                         |

## Local development

### Requirements

- Node.js 22.22 or newer in the Node 22 line, or Node.js 24
- pnpm 11.9.0
- Shopify storefront credentials for commerce data and customer account flows

Install dependencies and start the storefront from the repository root:

```bash
pnpm install
pnpm dev
```

Environment and Shopify setup notes are documented in
[`apps/storefront/README.md`](apps/storefront/README.md).

## Commands

| Command          | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| `pnpm dev`       | Start the Hydrogen storefront                     |
| `pnpm storybook` | Start Storybook on port 6006                      |
| `pnpm codegen`   | Regenerate Shopify GraphQL and React Router types |
| `pnpm check`     | Check formatting, linting, and TypeScript         |
| `pnpm format`    | Format the repository with Oxfmt                  |
| `pnpm build`     | Build every application through Turborepo         |
| `pnpm preview`   | Build and preview the storefront locally          |

Lefthook formats and lints staged files before commits. Before a push, it runs
the complete check and production build.
