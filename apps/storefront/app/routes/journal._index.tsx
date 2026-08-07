import {data, useActionData, useFetcher, useLoaderData} from 'react-router';

import {JournalIndexPage} from '~/components/journal/journal-index-page';
import {getJournalIndex} from '~/lib/journal/content';
import {
  NEWSLETTER_HONEYPOT_FIELD,
  normalizeNewsletterEmail,
  type NewsletterSignupActionResponse,
} from '~/lib/newsletter';
import {subscribeToNewsletter} from '~/lib/shopify/newsletter.server';

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

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return data<NewsletterSignupActionResponse>(
      {kind: 'error', message: 'Method not allowed.'},
      {headers: {Allow: 'POST'}, status: 405},
    );
  }

  const formData = await request.formData();
  const honeypot = formData.get(NEWSLETTER_HONEYPOT_FIELD);

  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return data<NewsletterSignupActionResponse>({
      kind: 'success',
      message: "You're on the list. Keep an eye on your inbox.",
    });
  }

  const email = normalizeNewsletterEmail(formData.get('email'));

  if (!email) {
    return data<NewsletterSignupActionResponse>(
      {kind: 'error', message: 'Enter a valid email address.'},
      {status: 400},
    );
  }

  const accessToken = readOptionalEnvironmentVariable(
    context.env,
    'PRIVATE_ADMIN_API_TOKEN',
  )?.trim();
  const storeDomain = (
    readOptionalEnvironmentVariable(
      context.env,
      'PRIVATE_ADMIN_STORE_DOMAIN',
    ) ?? context.env.PUBLIC_STORE_DOMAIN
  ).trim();

  if (!accessToken || !storeDomain) {
    console.error('Newsletter signup is missing Shopify Admin API settings.');
    return data<NewsletterSignupActionResponse>(
      {
        kind: 'error',
        message: 'Signup is temporarily unavailable. Please try again later.',
      },
      {status: 503},
    );
  }

  try {
    await subscribeToNewsletter({accessToken, email, storeDomain});

    return data<NewsletterSignupActionResponse>({
      kind: 'success',
      message: "You're on the list. Keep an eye on your inbox.",
    });
  } catch (error: unknown) {
    console.error('Shopify newsletter signup failed.', error);
    return data<NewsletterSignupActionResponse>(
      {
        kind: 'error',
        message: "We couldn't sign you up. Please try again.",
      },
      {status: 502},
    );
  }
}

function readOptionalEnvironmentVariable(
  env: object,
  key: 'PRIVATE_ADMIN_API_TOKEN' | 'PRIVATE_ADMIN_STORE_DOMAIN',
) {
  if (!hasProperty(env, key)) return undefined;

  return typeof env[key] === 'string' ? env[key] : undefined;
}

function hasProperty<Key extends PropertyKey>(
  value: object,
  key: Key,
): value is Record<Key, unknown> {
  return key in value;
}

export default function JournalIndexRoute() {
  const {entries} = useLoaderData<typeof loader>();
  const actionResponse = useActionData<typeof action>();
  const newsletterFetcher = useFetcher<NewsletterSignupActionResponse>();
  const response = newsletterFetcher.data ?? actionResponse;

  return (
    <JournalIndexPage
      entries={entries}
      newsletter={{
        onSubmit: (event) => {
          event.preventDefault();
          void newsletterFetcher.submit(event.currentTarget, {method: 'post'});
        },
        response,
        submitting: newsletterFetcher.state !== 'idle',
      }}
    />
  );
}
