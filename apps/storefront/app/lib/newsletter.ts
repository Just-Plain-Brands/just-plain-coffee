export const NEWSLETTER_HONEYPOT_FIELD = 'website';

export type NewsletterSignupActionResponse =
  | {kind: 'success'; message: string}
  | {kind: 'error'; message: string};

export function normalizeNewsletterEmail(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return null;

  const email = value.trim().toLowerCase();

  if (
    email.length === 0 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return null;
  }

  return email;
}
