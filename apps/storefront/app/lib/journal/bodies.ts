import type {MDXContent} from 'mdx/types';

import type {JournalBodyModule} from './types';

const BODY_MODULES = import.meta.glob<JournalBodyModule>(
  '../../../content/journal/**/index.mdx',
  {eager: true},
);

export function getJournalBody(slug: string): MDXContent | null {
  for (const [path, journalModule] of Object.entries(BODY_MODULES)) {
    if (path.includes(`/journal/${slug}/index.mdx`)) {
      return journalModule.default;
    }
  }

  return null;
}
