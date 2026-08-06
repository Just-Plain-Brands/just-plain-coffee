import {LinkIcon, MailIcon} from 'lucide-react';

import {
  JournalCategory,
  JournalMetaLine,
} from '~/components/journal/journal-card';
import {Breadcrumbs} from '~/components/navigation/Breadcrumbs';
import {Button, buttonVariants} from '~/components/ui/button';
import {Body, Text} from '~/components/ui/text';
import type {JournalSummary} from '~/lib/journal/types';
import {cn} from '~/lib/utils';

interface ArticleHeaderProps {
  canonicalUrl?: string;
  entry: JournalSummary;
}

export function ArticleHeader({canonicalUrl, entry}: ArticleHeaderProps) {
  const hasAccentPeriod = entry.title.endsWith('.');
  const title = hasAccentPeriod ? entry.title.slice(0, -1) : entry.title;
  const mailHref = canonicalUrl
    ? `mailto:?subject=${encodeURIComponent(entry.title)}&body=${encodeURIComponent(canonicalUrl)}`
    : undefined;
  const facebookHref = canonicalUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`
    : undefined;
  const xHref = canonicalUrl
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(entry.title)}`
    : undefined;

  return (
    <header className="pt-8 md:pt-12">
      <Breadcrumbs
        className="mx-auto mb-9 max-w-7xl px-5 md:px-10"
        items={[
          {kind: 'link', label: 'Journal', to: '/journal'},
          {
            kind: 'current',
            label: entry.kind === 'recipe' ? 'Recipes' : 'Stories',
          },
        ]}
      />
      <div className="mx-auto max-w-5xl px-5 pb-10 text-center md:px-10 md:pb-14">
        <div className="flex justify-center">
          <JournalCategory
            className="border-orange-600 bg-transparent px-4 py-1 font-bold tracking-[0.12em] text-orange-700 uppercase"
            kind={entry.kind}
          />
        </div>
        <Text
          as="h1"
          className="mx-auto mt-5 max-w-[20ch] leading-[0.94] text-balance md:text-6xl"
          variant="display-xl"
        >
          {title}
          {hasAccentPeriod ? <span className="text-orange-600">.</span> : null}
        </Text>
        <Body className="mx-auto mt-4 max-w-xl text-neutral-700">
          {entry.description}
        </Body>
        <JournalMetaLine
          className="mt-5 font-bold tracking-[0.14em] text-neutral-700 uppercase"
          entry={entry}
        />
        {canonicalUrl && facebookHref && xHref && mailHref ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              aria-label="Copy article link"
              className="rounded-full border-ink/30 bg-transparent"
              onClick={() => {
                void navigator.clipboard.writeText(canonicalUrl);
              }}
              size="icon-sm"
              title="Copy article link"
              variant="outline"
            >
              <LinkIcon />
            </Button>
            <a
              aria-label="Share article on Facebook"
              className={cn(
                buttonVariants({size: 'icon-sm', variant: 'outline'}),
                'rounded-full border-ink/30 bg-transparent',
              )}
              href={facebookHref}
              rel="noreferrer"
              target="_blank"
              title="Share on Facebook"
            >
              <span aria-hidden="true" className="font-package font-bold">
                f
              </span>
            </a>
            <a
              aria-label="Share article on X"
              className={cn(
                buttonVariants({size: 'icon-sm', variant: 'outline'}),
                'rounded-full border-ink/30 bg-transparent',
              )}
              href={xHref}
              rel="noreferrer"
              target="_blank"
              title="Share on X"
            >
              <span aria-hidden="true" className="text-xs font-bold">
                𝕏
              </span>
            </a>
            <a
              aria-label="Share article by email"
              className={cn(
                buttonVariants({size: 'icon-sm', variant: 'outline'}),
                'rounded-full border-ink/30 bg-transparent',
              )}
              href={mailHref}
              title="Share by email"
            >
              <MailIcon />
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
