# Storybook

Storybook runs as an independent workspace app while stories stay beside the
storefront components they document.

## Run Storybook

From the repository root:

```sh
pnpm storybook
```

Create a production build with:

```sh
pnpm storybook:build
```

## Add a story

Place `*.stories.tsx` beside its component:

```text
apps/storefront/app/components/ui/button.tsx
apps/storefront/app/components/ui/button.stories.tsx
```

Use Storybook's typed Component Story Format and connect the story metadata to
the component with `satisfies Meta<typeof Component>`. Add component-specific
decorators only when the component needs application context such as routing or
the cart aside provider.

The shared Storybook configuration loads the storefront's Tailwind stylesheet,
public assets, and `~` import alias.
