import {ArticleCard} from '~/components/journal/journal-card';
import type {JournalSummary} from '~/lib/journal/types';

export function RelatedArticles({
  entries,
}: {
  entries: readonly JournalSummary[];
}) {
  if (entries.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <p className="font-package text-xs text-orange-700">Keep reading</p>
      <h2 className="mt-3 text-4xl md:text-5xl">More useful bits.</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <ArticleCard entry={entry} key={entry.slug} />
        ))}
      </div>
    </section>
  );
}
