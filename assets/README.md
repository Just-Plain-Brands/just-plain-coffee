# Source assets

This directory contains editable source material that should be retained in
Git but is not served directly by an application.

Organize assets by their purpose:

- `brand` for master logos and brand source files
- `design/figma` for Figma exports and related design sources
- `packaging` for packaging artwork and dielines
- `photography` for original product photography

Deployable web assets belong in the owning application's `public` directory.
For example, a source packaging design belongs here, while an optimized SVG
used by the storefront belongs in `apps/storefront/public`.

Large binary formats such as `.fig`, `.psd`, and `.ai` should use Git LFS once
those formats are introduced.
