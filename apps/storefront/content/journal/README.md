# Journal content

Each journal entry lives at `content/journal/<slug>/index.mdx`. Post imagery is
declared in frontmatter and served from the matching folder under `public/journal`.

```yaml
listImage:
  src: /journal/example-post/list.png
  alt: A concise description of the list-page image
articleImage:
  src: /journal/example-post/article.png
  alt: A concise description of the full article image
  caption: An optional visible caption
```

Reading time is calculated from the MDX body by default. Editors can override
it with a positive whole number when the intended package copy needs a fixed
value:

```yaml
readingMinutes: 8
```

`listImage` is used by the featured card, article cards, and related-article
cards. Prepare it as a 4:3 crop that stays legible at card size.

`articleImage` is used at the top of the article and in the article's social and
structured-data metadata. It may use a different composition and aspect ratio.

Both `src` values must be root-relative public paths. Alternative text is
required for both images; the article caption is optional.
