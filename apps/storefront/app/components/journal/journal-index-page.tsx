import {
  ArticleCard,
  FeaturedArticleCard,
} from '~/components/journal/journal-card';
import {JournalMastheadArtwork} from '~/components/journal/journal-masthead-artwork';
import {Breadcrumbs} from '~/components/navigation/Breadcrumbs';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Body, Eyebrow, Text} from '~/components/ui/text';
import type {JournalSummary} from '~/lib/journal/types';

export function JournalIndexPage({
  entries,
}: {
  entries: readonly JournalSummary[];
}) {
  const featured = entries.find((entry) => entry.featured) ?? entries[0];
  const remaining = featured
    ? entries.filter((entry) => entry.slug !== featured.slug)
    : entries;

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Eyebrow className="text-primary">
              Stories, recipes & useful bits
            </Eyebrow>
            <h1 className="mt-5 max-w-[10ch] text-6xl leading-[0.9] md:text-8xl">
              Good reads.
              <br />
              No foam<span className="text-orange-600">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
              Straightforward guides, honest answers, and simple recipes for
              making better coffee at home.
            </p>
          </div>
          <JournalMastheadArtwork className="min-h-[380px] border-0 bg-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 md:px-10">
        {featured ? (
          <FeaturedArticleCard entry={featured} />
        ) : (
          <div className="rounded-4xl bg-neutral-100 p-10 text-center shadow-soft">
            <h2 className="text-4xl">Nothing printed yet.</h2>
            <p className="mt-3 text-neutral-700">
              Check back after the next pot.
            </p>
          </div>
        )}

        {remaining.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {remaining.map((entry) => (
              <ArticleCard entry={entry} key={entry.slug} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 md:px-10">
        <div className="grid overflow-hidden rounded-lg border border-ink/30 bg-neutral-100 md:grid-cols-[0.66fr_1.34fr]">
          <div className="relative min-h-52 overflow-hidden bg-orange-100 md:min-h-64">
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:radial-gradient(var(--orange-600)_0.7px,transparent_0.8px)] [background-size:7px_7px] opacity-15"
            />
            <img
              alt=""
              className="absolute -bottom-16 left-1/2 z-10 h-64 w-auto -translate-x-1/2 object-contain md:-bottom-20 md:h-80"
              src="/carton-mascots/straight-talker.webp"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:px-8 md:py-7 lg:px-10">
            <Text
              as="h2"
              className="leading-none md:text-4xl"
              variant="display-md"
            >
              One useful email. Occasionally
              <span className="text-orange-600">.</span>
            </Text>
            <Body className="mt-3 max-w-[42ch] text-neutral-700">
              New recipes, helpful guides, and the odd bag drop. No fluff. No
              spam. Just the good stuff.
            </Body>
            <div
              aria-label="Newsletter signup coming soon"
              className="mt-5 flex max-w-2xl"
              role="group"
            >
              <Input
                aria-label="Email address"
                className="h-11 rounded-l-full rounded-r-none border-ink/20 bg-neutral-100 px-5 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-100"
                disabled
                placeholder="Email address"
                type="email"
              />
              <Button
                className="h-11 rounded-l-none rounded-r-full bg-orange-600 px-7 text-neutral-100 hover:bg-orange-700 disabled:bg-orange-600 disabled:opacity-100"
                disabled
                type="button"
              >
                Sign me up
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
