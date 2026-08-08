import type {JournalSummary} from './types';

export function JournalStructuredData({
  entry,
  url,
}: {
  entry: JournalSummary;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.title,
    description: entry.description,
    datePublished: entry.publishedAt,
    articleSection: entry.kind === 'recipe' ? 'Recipes' : 'Stories',
    image: new URL(entry.articleImage.src, url).toString(),
    keywords: entry.tags.join(', '),
    mainEntityOfPage: url,
    author: {
      '@type': 'Organization',
      name: 'Just Plain Coffee',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Just Plain Coffee',
    },
  };
  const serializedData = JSON.stringify(data)
    .replaceAll('&', '\\u0026')
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e');

  return <script type="application/ld+json">{serializedData}</script>;
}
