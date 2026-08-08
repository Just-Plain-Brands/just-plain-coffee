import type {FormEventHandler} from 'react';

import {
  ArticleCard,
  FeaturedArticleCard,
} from '~/components/journal/journal-card';
import {NewsletterSignup} from '~/components/marketing/newsletter-signup';
import {SplitHero} from '~/components/sections/split-hero';
import type {JournalSummary} from '~/lib/journal/types';
import type {NewsletterSignupActionResponse} from '~/lib/newsletter';

export type JournalNewsletterSignup = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  response?: NewsletterSignupActionResponse;
  submitting: boolean;
};

export function JournalIndexPage({
  entries,
  newsletter,
}: {
  entries: readonly JournalSummary[];
  newsletter?: JournalNewsletterSignup;
}) {
  const response = newsletter?.response;
  const isSubmitting = newsletter?.submitting ?? false;
  const isSubscribed = response?.kind === 'success';
  const isNewsletterDisabled = !newsletter || isSubmitting || isSubscribed;
  const featured = entries.find((entry) => entry.featured) ?? entries[0];
  const remaining = featured
    ? entries.filter((entry) => entry.slug !== featured.slug)
    : entries;

  return (
    <div>
      <SplitHero
        eyebrow="Stories, recipes & useful bits"
        heading={
          <>
            Good reads.
            <br />
            No foam<span className="text-orange-600">.</span>
          </>
        }
        image={<JournalMastheadArtwork />}
        imageContainerClassName="hidden lg:block"
        subheading="Straightforward guides, honest answers, and simple recipes for making better coffee at home."
      />

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

      <div className="mx-auto max-w-7xl px-5 pb-6 md:px-10">
        <NewsletterSignup
          description="New recipes, helpful guides, and the odd bag drop. No fluff. No spam. Just the good stuff."
          feedback={response}
          formProps={{
            'aria-label': 'Newsletter signup',
            method: 'post',
            onSubmit: newsletter?.onSubmit,
          }}
          image={{
            alt: '',
            src: '/carton-mascots/straight-talker.webp',
          }}
          input={{
            'aria-invalid': response?.kind === 'error' || undefined,
            disabled: isNewsletterDisabled,
            label: 'Email address',
          }}
          submitButton={{
            disabled: isNewsletterDisabled,
            label: isSubmitting
              ? 'Signing up…'
              : isSubscribed
                ? "You're in"
                : 'Sign me up',
          }}
          title={
            <>
              One useful email. Occasionally
              <span className="text-orange-600">.</span>
            </>
          }
        />
      </div>
    </div>
  );
}

export function JournalMastheadArtwork() {
  return (
    <div
      aria-label="The Just Plain Coffee carton mascot gives a thumbs up"
      className="pointer-events-none relative isolate min-h-72 overflow-hidden select-none"
      role="img"
    >
      <div
        aria-hidden="true"
        className="absolute right-[16%] bottom-[4%] h-3 w-[54%] rounded-full bg-ink/15 blur-[3px]"
      />
      <img
        alt="The Just Plain Coffee carton mascot gives a thumbs up"
        className="h-[380px] w-full object-contain"
        src="/mascots/carton-mascot-thumbs-up.svg"
      />
      <span
        aria-hidden="true"
        className="absolute right-[8%] bottom-[43%] flex rotate-[18deg] items-end gap-2"
      >
        <span className="h-4 w-0.5 rounded-full bg-orange-600" />
        <span className="mb-1 h-3 w-0.5 rounded-full bg-orange-600" />
        <span className="mb-2 h-2.5 w-0.5 rounded-full bg-orange-600" />
      </span>
      <span className="absolute right-[2%] bottom-[19%] -rotate-6 rounded-[50%] border-2 border-orange-900/30 bg-orange-600 px-5 py-3 text-center font-package text-xs leading-[1.05] font-bold tracking-[0.08em] text-neutral-100 uppercase shadow-soft md:right-[4%]">
        Freshly
        <br />
        printed
      </span>
    </div>
  );
}
