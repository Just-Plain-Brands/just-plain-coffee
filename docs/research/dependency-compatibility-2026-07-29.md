# Dependency Compatibility Review

> Historical note: the TypeScript and lint-tooling recommendations in this
> review were superseded on 2026-07-31. The repository now runs the TypeScript 7
> compiler alongside the TypeScript 6 compatibility API and uses Oxlint instead
> of ESLint.

Date: 2026-07-29

This review uses published package metadata and official upstream documentation rather than remembered version information.

## Decisions

| Area                     | Decision                                                                                                                                              | Evidence                                                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| React                    | Upgrade to React and React DOM 19.2.8, with matching React 19 types                                                                                   | Hydrogen 2026.4.4 accepts `^19.2.3` in its React peer range. A Shopify maintainer also confirmed that Hydrogen 2025.7.3 introduced React 19 support.               |
| React Router             | Stay on 7.16.0                                                                                                                                        | Hydrogen 2026.4.4 requires `react-router` and `@react-router/dev` `~7.16.0`. Router 8.3.0 is outside that supported range.                                         |
| Router 8 preparation     | Enable the two supported Router 8 request-semantics future flags, remove the unused `react-router-dom` compatibility package, and require Node 22.22+ | React Router recommends adopting future flags before the major upgrade. Router 8 removes the `react-router-dom` re-export package and requires Node 22.22+.        |
| Shopify CLI              | Upgrade the project-local CLI from 3.93.2 to 4.5.2                                                                                                    | 4.5.2 is the current published CLI. Its `shopify hydrogen` commands were verified locally after installation.                                                      |
| Vite                     | Keep 8.1.5                                                                                                                                            | It is current and Hydrogen accepts Vite 8.                                                                                                                         |
| TypeScript               | Keep 5.9.3                                                                                                                                            | TypeScript 7 is outside `@typescript-eslint/parser` 8.65's `<6.1.0` peer range and outside the supported React Router 7 toolchain.                                 |
| GraphQL                  | Keep 16.14.2                                                                                                                                          | GraphQL 17 is outside the peer ranges of the installed GraphQL Code Generator 5 and GraphQL Config 5 packages.                                                     |
| ESLint                   | Keep the ESLint 9 toolchain                                                                                                                           | Current `eslint-plugin-react` and `eslint-plugin-import` peer ranges do not include ESLint 10. Upgrading only the core would create an unsupported lint graph.     |
| Hydrogen code generation | Keep Codegen CLI 5.0.2 and Hydrogen Codegen 0.3.3                                                                                                     | These are the exact versions used by the current Hydrogen skeleton/toolchain. A Codegen 7-only upgrade would split the project from Hydrogen's supported baseline. |
| Tailwind and shadcn      | Keep Tailwind CSS 4.3.3, `@tailwindcss/vite` 4.3.3, Base UI 1.6.0, and shadcn 4.16.0                                                                  | These resolve to their current published versions and declare compatibility with the installed React/Vite versions.                                                |

## React 19 conclusion

The linked discussion comment is correct. Hydrogen's current package metadata declares:

- `react`: `^18.3.1 || ~19.0.3 || ~19.1.4 || ^19.2.3`
- `vite`: `^5.1.0 || ^6.2.1 || ^7.0.0 || ^8.0.0`

React 19.2.8 therefore falls inside Hydrogen's supported peer contract.

There is one known upstream caveat. Hydrogen still depends on `use-resize-observer@9.1.0` for development tooling, and that package advertises React 16–18 peers. npm consequently prints a peer warning and may place React DOM 18 below that development-only dependency. Shopify tracks the warning in Hydrogen issue 3428. The app does not suppress it with `legacy-peer-deps` or force an unverified override.

## React Router 8 conclusion

React Router 8.3.0 is published, but it is not currently a supported Hydrogen pairing:

1. Hydrogen 2026.4.4 pins both `react-router` and `@react-router/dev` to `~7.16.0`.
2. Router 8 Framework Mode requires React/React DOM 19.2.7+, Node 22.22+, Vite 7+, and the Vite Environment API future flag.
3. Hydrogen's own Router preset support matrix marks `v8_viteEnvironmentApi` as blocked and explicitly sets it to `false`.
4. This app still has route `meta` callbacks using Router 7's `data` field; Router 8 replaces it with `loaderData`.

Installing Router 8 now would require overriding Hydrogen's peers and bypassing a capability that its preset deliberately blocks. The supported path is React 19.2 + Router 7.16, with compatible future flags adopted in advance.

## Security advisory status

`npm audit` reports 37 transitive findings in the full development graph and 5 in the production graph. `npm audit fix` has no non-breaking updates available.

The production findings are:

- React Router 7.16 is covered by current high-severity advisories. npm identifies Router 8.3 as the fixed release, but that release is outside Hydrogen's peer range and requires the Hydrogen-blocked Vite Environment API.
- Lodash is pulled through Shopify's GraphQL code-generation packages. npm's proposed remediation is a breaking GraphQL Code Generator 7 upgrade, outside the current Hydrogen codegen baseline.
- The remaining full-graph findings are primarily in MiniOxygen/Miniflare development tooling and the ESLint/file-route toolchain. npm's suggested forced fixes include invalid downgrades or unsupported majors.

No `overrides`, `legacy-peer-deps`, or `npm audit fix --force` changes were added. Those would make the installation appear quieter while moving it outside Shopify's supported dependency graph. The Router advisories should be treated as an upstream release blocker to monitor, not as resolved.

## Direct dependency audit

The lockfile was checked with `npm outdated` and live peer metadata:

- Already current in their supported lines: Hydrogen 2026.4.4, Hydrogen Codegen 0.3.3, MiniOxygen 4.2.0, Oxygen worker types 4.2.0, Vite 8.1.5, Tailwind 4.3.3, Base UI 1.6.0, shadcn 4.16.0, lucide-react 1.27.0, Sonner 2.0.7, TypeScript 5.9.3, and GraphQL 16.14.2.
- Intentionally held at compatible majors: React Router 7, TypeScript 5, GraphQL 16, ESLint 9, and GraphQL Code Generator 5.
- Upgraded after compatibility checks: React 19.2.8, React DOM 19.2.8, matching React types, and Shopify CLI 4.5.2.
- Removed: unused `react-router-dom`, which is only a compatibility re-export in Router 7 and is removed in Router 8.

## Primary sources

- [Hydrogen discussion: React 19 support confirmation](https://github.com/Shopify/hydrogen/discussions/2841#discussioncomment-15555091)
- [Hydrogen current package manifest](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/package.json)
- [Hydrogen React current package manifest](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen-react/package.json)
- [Hydrogen issue 3428: React 19 peer warnings](https://github.com/Shopify/hydrogen/issues/3428)
- [React Router v8 upgrade guide](https://reactrouter.com/upgrading/v7)
- [React Router future flags](https://reactrouter.com/upgrading/future)
- [Shopify CLI documentation](https://shopify.dev/docs/api/shopify-cli)
- [Shopify CLI Hydrogen commands](https://shopify.dev/docs/api/shopify-cli/hydrogen)
