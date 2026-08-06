import {useLoaderData} from 'react-router';

import {JournalIndexPage} from '~/components/journal/journal-index-page';
import {getJournalIndex} from '~/lib/journal/content';

import type {Route} from './+types/journal._index';

export const meta: Route.MetaFunction = () => [
  {title: 'Journal | Just Plain Coffee'},
  {
    name: 'description',
    content:
      'Straightforward coffee stories, honest answers, and simple recipes for making better coffee at home.',
  },
];

export function loader() {
  return {entries: getJournalIndex()};
}

export default function JournalIndexRoute() {
  const {entries} = useLoaderData<typeof loader>();

  return <JournalIndexPage entries={entries} />;
}
