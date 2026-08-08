import {getSitemapIndex} from '@shopify/hydrogen';

import {getJournalIndex} from '~/lib/journal/content';

import type {Route} from './+types/[sitemap.xml]';

export async function loader({
  request,
  context: {storefront},
}: Route.LoaderArgs) {
  const shopifyResponse = await getSitemapIndex({
    storefront,
    request,
  });
  const body = await shopifyResponse.text();
  const origin = new URL(request.url).origin;
  const latestJournalDate = getJournalIndex()[0]?.publishedAt;
  const journalSitemap = `<sitemap><loc>${origin}/sitemap/journal/1.xml</loc>${
    latestJournalDate ? `<lastmod>${latestJournalDate}</lastmod>` : ''
  }</sitemap>`;
  const response = new Response(
    body.replace('</sitemapindex>', `${journalSitemap}</sitemapindex>`),
    {
      headers: shopifyResponse.headers,
      status: shopifyResponse.status,
    },
  );

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
