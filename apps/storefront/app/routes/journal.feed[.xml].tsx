import {getJournalIndex} from '~/lib/journal/content';

import type {Route} from './+types/journal.feed[.xml]';

export function loader({request}: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const entries = getJournalIndex();
  const updated =
    entries[0]?.publishedAt ?? new Date().toISOString().slice(0, 10);
  const items = entries
    .map((entry) => {
      const url = `${origin}/journal/${entry.slug}`;
      return `
        <entry>
          <title>${escapeXml(entry.title)}</title>
          <id>${url}</id>
          <link href="${url}" />
          <updated>${entry.publishedAt}T00:00:00Z</updated>
          <summary>${escapeXml(entry.description)}</summary>
        </entry>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>Just Plain Coffee Journal</title>
      <id>${origin}/journal</id>
      <link href="${origin}/journal" />
      <link href="${origin}/journal/feed.xml" rel="self" />
      <updated>${updated}T00:00:00Z</updated>
      ${items}
    </feed>`;

  return new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
