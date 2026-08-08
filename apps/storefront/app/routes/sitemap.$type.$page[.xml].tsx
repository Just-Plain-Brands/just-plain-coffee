import {getSitemap} from '@shopify/hydrogen';

import {getJournalIndex} from '~/lib/journal/content';

import type {Route} from './+types/sitemap.$type.$page[.xml]';

export async function loader({
  request,
  params,
  context: {storefront},
}: Route.LoaderArgs) {
  if (params.type === 'journal') {
    if (params.page !== '1') {
      throw new Response('Journal sitemap page not found.', {status: 404});
    }

    const origin = new URL(request.url).origin;
    const urls = getJournalIndex()
      .map(
        (entry) =>
          `<url><loc>${origin}/journal/${entry.slug}</loc><lastmod>${entry.publishedAt}</lastmod></url>`,
      )
      .join('');

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
      {
        headers: {
          'Cache-Control': `public, max-age=${60 * 60 * 24}`,
          'Content-Type': 'application/xml; charset=utf-8',
        },
      },
    );
  }

  const response = await getSitemap({
    storefront,
    request,
    params,
    locales: ['EN-US', 'EN-CA', 'FR-CA'],
    getLink: ({type, baseUrl, handle, locale}) => {
      if (!locale) return `${baseUrl}/${type}/${handle}`;
      return `${baseUrl}/${locale}/${type}/${handle}`;
    },
  });

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
