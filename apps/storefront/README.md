# Just Plain Coffee storefront

The storefront is a Shopify Hydrogen application built with React Router, Vite,
and Tailwind CSS. It is one application in the repository's pnpm workspace.

[Hydrogen documentation](https://shopify.dev/custom-storefronts/hydrogen)
[React Router documentation](https://reactrouter.com/start/framework/routing)

## Getting started

Install dependencies and start the storefront from the repository root:

```bash
pnpm install
pnpm dev
```

## Building for production

```bash
pnpm build
```

The storefront build disables Hydrogen's application-directory lockfile check
because this monorepo uses the authoritative `pnpm-lock.yaml` at the repository
root.

## Local development

```bash
pnpm dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>

## Newsletter signups

The journal newsletter form stores signups as Shopify customer profiles with
email marketing consent. Configure a server-only Admin API access token from an
installed Shopify app that has the `write_customers` scope:

```dotenv
PRIVATE_ADMIN_API_TOKEN=shpat_...
```

The form uses `PUBLIC_STORE_DOMAIN` for the Admin API by default. If that value
is a custom storefront domain, also set the store's `*.myshopify.com` domain:

```dotenv
PRIVATE_ADMIN_STORE_DOMAIN=your-store.myshopify.com
```

Shopify treats customer email addresses as protected customer data, so the app
must also meet Shopify's protected customer data requirements.
