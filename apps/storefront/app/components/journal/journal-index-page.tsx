import type {FormEventHandler} from 'react';

import {
  ArticleCard,
  FeaturedArticleCard,
} from '~/components/journal/journal-card';
import {JournalMastheadArtwork} from '~/components/journal/journal-masthead-artwork';
import {NewsletterSignup} from '~/components/marketing/newsletter-signup';
import {Eyebrow} from '~/components/ui/text';
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
