import {Text} from '~/components/ui/text';
import type {JournalSummary} from '~/lib/journal/types';
import {cn} from '~/lib/utils';

const CARD_TONE_CLASSES = {
  cream: 'bg-neutral-100',
  olive: 'bg-green-500 text-green-900',
  orange: 'bg-orange-200',
} as const;

export function ArticleHero({entry}: {entry: JournalSummary}) {
  const {articleImage} = entry;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <figure>
        <div
          className={cn(
            'relative min-h-72 overflow-hidden rounded-lg border border-ink/30 md:aspect-[2/1] md:min-h-0',
            CARD_TONE_CLASSES[entry.cardTone],
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:radial-gradient(var(--green-700)_0.7px,transparent_0.8px)] [background-size:7px_7px] opacity-15"
          />
          {entry.kind === 'recipe' ? (
            <Text
              as="span"
              className="absolute top-5 left-5 z-10 -rotate-8 rounded-[50%] border-2 border-orange-900/30 bg-orange-600 px-4 py-3 text-center text-[10px] leading-[1.05] tracking-[0.08em] text-neutral-100 shadow-soft md:top-9 md:left-9 md:px-5 md:text-xs"
              variant="package-sm"
            >
              No tiny
              <br />
              apron
              <br />
              required
            </Text>
          ) : null}
          <img
            alt={articleImage.alt}
            className="absolute inset-y-4 right-4 h-[calc(100%-2rem)] w-[82%] object-contain object-right md:right-8 md:w-[78%]"
            src={articleImage.src}
          />
        </div>
        {articleImage.caption ? (
          <figcaption className="mt-3 text-center text-sm text-neutral-700">
            {articleImage.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
