import type {ReactNode} from 'react';

import {ArticleTableOfContents} from '~/components/journal/article-toc';
import {RecipeFacts} from '~/components/journal/recipe-facts';
import type {JournalSummary} from '~/lib/journal/types';
import {cn} from '~/lib/utils';

export function ArticleLayout({
  children,
  entry,
}: {
  children: ReactNode;
  entry: JournalSummary;
}) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-10 md:py-16 lg:items-start',
        entry.kind === 'recipe'
          ? 'lg:grid-cols-[150px_minmax(0,1fr)_230px] lg:gap-8 xl:grid-cols-[160px_minmax(0,640px)_304px]'
          : 'lg:max-w-5xl lg:grid-cols-[160px_minmax(0,720px)]',
      )}
    >
      <ArticleTableOfContents headings={entry.headings} />
      <div className="min-w-0">{children}</div>
      {entry.kind === 'recipe' ? <RecipeFacts facts={entry.recipe} /> : null}
    </div>
  );
}
