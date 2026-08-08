import type {JournalKind} from './types';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
});

export function formatJournalDate(publishedAt: string): string {
  return DATE_FORMATTER.format(new Date(`${publishedAt}T00:00:00Z`));
}

export function getJournalKindLabel(kind: JournalKind): string {
  switch (kind) {
    case 'recipe':
      return 'Recipe';
    case 'story':
      return 'Story';
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
