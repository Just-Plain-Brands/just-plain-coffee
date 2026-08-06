import {ArrowRightIcon} from 'lucide-react';
import {Link} from 'react-router';

import {buttonVariants} from '~/components/ui/button';
import {Body, Supporting, Text, textVariants} from '~/components/ui/text';
import {
  formatJournalDate,
  getJournalKindLabel,
} from '~/lib/journal/presentation';
import type {JournalSummary} from '~/lib/journal/types';
import {cn} from '~/lib/utils';

const CARD_TONE_CLASSES = {
  cream: 'bg-neutral-100',
  olive: 'bg-green-500 text-green-900',
  orange: 'bg-orange-200',
} as const;

export function FeaturedArticleCard({entry}: {entry: JournalSummary}) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-ink/30 bg-green-200 md:grid-cols-[0.92fr_1.08fr]">
      <div className="flex flex-col items-start justify-center p-7 md:p-10 lg:py-11 lg:pr-8 lg:pl-12">
        <JournalCategory
          className="border-ink/35 bg-neutral-100 px-4 uppercase"
          kind={entry.kind}
        />
        <Text
          as="h2"
          className="mt-5 max-w-[15ch] leading-[0.98] text-balance"
          variant="display-lg"
        >
          <Link className="hover:text-orange-700" to={`/journal/${entry.slug}`}>
            {entry.title}
          </Link>
        </Text>
        <Body className="mt-5 max-w-[42ch] text-green-900/80">
          {entry.description}
        </Body>
        <Text
          as="p"
          className="mt-6 text-xs text-green-900/80"
          variant="package-sm"
        >
          {entry.readingMinutes} min read
        </Text>
        <Link
          className={cn(
            buttonVariants({variant: 'ghost'}),
            'mt-6 h-12 rounded-full bg-neutral-900 px-6 text-base text-neutral-100 hover:bg-neutral-700 hover:text-neutral-100',
          )}
          to={`/journal/${entry.slug}`}
        >
          Read {entry.kind === 'recipe' ? 'the recipe' : 'the story'}
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
      <JournalHeroPreview
        entry={entry}
        className="min-h-80 rounded-none bg-transparent md:min-h-[420px]"
        imageClassName="object-contain p-5 md:p-7 lg:p-8"
      />
    </article>
  );
}

export function ArticleCard({entry}: {entry: JournalSummary}) {
  const kindLabel = entry.kind === 'recipe' ? 'Recipe' : 'Guide';
  const hasAccentPeriod = entry.title.endsWith('.');
  const title = hasAccentPeriod ? entry.title.slice(0, -1) : entry.title;

  return (
    <article
      className={cn(
        'flex min-h-full flex-col overflow-hidden rounded-lg border border-ink/30',
        CARD_TONE_CLASSES[entry.cardTone],
      )}
    >
      <div className="relative">
        <JournalHeroPreview
          entry={entry}
          className="aspect-[4/3] min-h-0 rounded-none bg-transparent"
          imageClassName="object-contain px-4 pt-5 pb-2"
        />
        <JournalCategory
          className={cn(
            'absolute top-4 left-4 border-current/35 bg-neutral-100 px-3 font-bold tracking-[0.08em] uppercase',
            entry.kind === 'recipe' ? 'text-orange-600' : 'text-green-600',
          )}
          kind={entry.kind}
          label={kindLabel}
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <Text
          as="h3"
          className={cn(
            'leading-[0.96]',
            entry.kind === 'recipe' ? 'max-w-[17ch]' : undefined,
          )}
          variant="display-md"
        >
          <Link className="hover:text-orange-700" to={`/journal/${entry.slug}`}>
            {title}
            {hasAccentPeriod ? (
              <span className="text-orange-600">.</span>
            ) : null}
          </Link>
        </Text>
        <Supporting className="mt-3 max-w-[42ch] text-current/75">
          {entry.description}
        </Supporting>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <Text as="span" className="text-xs" variant="package-sm">
            {entry.readingMinutes} min read
          </Text>
          <Link
            aria-label={`Read ${entry.title}`}
            className={cn(
              textVariants({variant: 'package-sm'}),
              'inline-flex items-center gap-1 text-xs hover:underline',
              entry.cardTone === 'olive'
                ? 'text-neutral-100'
                : 'text-orange-600',
            )}
            to={`/journal/${entry.slug}`}
          >
            Read the {kindLabel.toLowerCase()}
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function JournalCategory({
  className,
  kind,
  label,
}: Pick<JournalSummary, 'kind'> & {className?: string; label?: string}) {
  return (
    <span
      className={cn(
        'inline-flex w-max rounded-full border border-current/25 bg-neutral-100/75 px-3 py-1.5 font-package text-xs text-ink',
        className,
      )}
    >
      {label ?? getJournalKindLabel(kind)}
    </span>
  );
}

export function JournalMetaLine({
  className,
  entry,
}: {
  className?: string;
  entry: JournalSummary;
}) {
  return (
    <p className={cn('font-package text-xs text-neutral-700', className)}>
      {entry.readingMinutes} min read
      <span aria-hidden="true" className="px-2">
        •
      </span>
      <time dateTime={entry.publishedAt}>
        {formatJournalDate(entry.publishedAt)}
      </time>
    </p>
  );
}

function JournalHeroPreview({
  className,
  entry,
  imageClassName,
}: {
  className?: string;
  entry: JournalSummary;
  imageClassName?: string;
}) {
  const {listImage} = entry;

  return (
    <figure
      className={cn('overflow-hidden rounded-3xl bg-neutral-100/35', className)}
    >
      <img
        alt={listImage.alt}
        className={cn('h-full w-full object-cover', imageClassName)}
        loading="lazy"
        src={listImage.src}
      />
    </figure>
  );
}
