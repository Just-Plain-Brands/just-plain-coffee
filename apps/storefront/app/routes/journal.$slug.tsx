import {useLoaderData} from 'react-router';

import {JournalArticlePage} from '~/components/journal/journal-article-page';
import {getJournalBody} from '~/lib/journal/bodies';
import {getJournalEntry, getJournalIndex} from '~/lib/journal/content';
import {JournalStructuredData} from '~/lib/journal/seo';

import type {Route} from './+types/journal.$slug';

export const meta: Route.MetaFunction = ({data}) => {
  if (!data) return [{title: 'Journal | Just Plain Coffee'}];

  const articleImageUrl = new URL(
    data.entry.articleImage.src,
    data.canonicalUrl,
  ).toString();

  return [
    {title: `${data.entry.title} | Just Plain Coffee`},
    {name: 'description', content: data.entry.description},
    {property: 'og:title', content: data.entry.title},
    {property: 'og:description', content: data.entry.description},
    {property: 'og:type', content: 'article'},
    {property: 'og:image', content: articleImageUrl},
    {property: 'og:image:alt', content: data.entry.articleImage.alt},
    {tagName: 'link', rel: 'canonical', href: data.canonicalUrl},
  ];
};

export function loader({params, request}: Route.LoaderArgs) {
  const entry = params.slug ? getJournalEntry(params.slug) : null;

  if (!entry) {
    throw new Response('Journal entry not found.', {status: 404});
  }

  const canonicalUrl = new URL(
    `/journal/${entry.slug}`,
    request.url,
  ).toString();
  const relatedEntries = getJournalIndex()
    .filter((candidate) => candidate.slug !== entry.slug)
    .sort((left, right) => {
      const leftScore = countSharedTags(entry.tags, left.tags);
      const rightScore = countSharedTags(entry.tags, right.tags);
      return rightScore - leftScore;
    })
    .slice(0, 3);

  return {canonicalUrl, entry, relatedEntries};
}

export default function JournalEntryRoute() {
  const {canonicalUrl, entry, relatedEntries} = useLoaderData<typeof loader>();
  const Content = getJournalBody(entry.slug);

  if (!Content) {
    throw new Error(`Missing MDX body for journal entry: ${entry.slug}.`);
  }

  return (
    <>
      <JournalStructuredData entry={entry} url={canonicalUrl} />
      <JournalArticlePage
        canonicalUrl={canonicalUrl}
        Content={Content}
        entry={entry}
        relatedEntries={relatedEntries}
      />
    </>
  );
}

function countSharedTags(
  leftTags: readonly string[],
  rightTags: readonly string[],
): number {
  const rightTagSet = new Set(rightTags);
  return leftTags.reduce(
    (count, tag) => count + (rightTagSet.has(tag) ? 1 : 0),
    0,
  );
}
