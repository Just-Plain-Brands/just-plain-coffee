import type {
  JournalArticleImage,
  JournalCardTone,
  JournalImage,
  JournalKind,
  JournalMeta,
  RecipeFacts,
} from './types';

const JOURNAL_KINDS = ['recipe', 'story'] as const;
const JOURNAL_CARD_TONES = ['cream', 'orange', 'olive'] as const;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseJournalMeta({
  slug,
  value,
}: {
  slug: string;
  value: unknown;
}): JournalMeta {
  const data = requireRecord(value, `${slug} frontmatter`);
  const kind = requireOneOf<JournalKind>(
    data.kind,
    JOURNAL_KINDS,
    `${slug}.kind`,
  );
  const base = {
    title: requireString(data.title, `${slug}.title`),
    description: requireString(data.description, `${slug}.description`),
    readingMinutes: optionalPositiveInteger(
      data.readingMinutes,
      `${slug}.readingMinutes`,
    ),
    publishedAt: requireIsoDate(data.publishedAt, `${slug}.publishedAt`),
    featured: requireBoolean(data.featured, `${slug}.featured`),
    draft: requireBoolean(data.draft, `${slug}.draft`),
    cardTone: requireOneOf<JournalCardTone>(
      data.cardTone,
      JOURNAL_CARD_TONES,
      `${slug}.cardTone`,
    ),
    tags: requireStringArray(data.tags, `${slug}.tags`),
    listImage: parseListImage({slug, value: data.listImage}),
    articleImage: parseArticleImage({slug, value: data.articleImage}),
  };

  switch (kind) {
    case 'story':
      return {...base, kind};
    case 'recipe':
      return {
        ...base,
        kind,
        recipe: parseRecipeFacts({slug, value: data.recipe}),
      };
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

function parseListImage({
  slug,
  value,
}: {
  slug: string;
  value: unknown;
}): JournalImage {
  const image = requireRecord(value, `${slug}.listImage`);

  return {
    src: requireImagePath(image.src, `${slug}.listImage.src`),
    alt: requireString(image.alt, `${slug}.listImage.alt`),
  };
}

function parseArticleImage({
  slug,
  value,
}: {
  slug: string;
  value: unknown;
}): JournalArticleImage {
  const image = requireRecord(value, `${slug}.articleImage`);

  return {
    src: requireImagePath(image.src, `${slug}.articleImage.src`),
    alt: requireString(image.alt, `${slug}.articleImage.alt`),
    caption: optionalString(image.caption, `${slug}.articleImage.caption`),
  };
}

function parseRecipeFacts({
  slug,
  value,
}: {
  slug: string;
  value: unknown;
}): RecipeFacts {
  const recipe = requireRecord(value, `${slug}.recipe`);
  const steepMinutes = requireRecord(
    recipe.steepMinutes,
    `${slug}.recipe.steepMinutes`,
  );
  const minimum = requirePositiveNumber(
    steepMinutes.minimum,
    `${slug}.recipe.steepMinutes.minimum`,
  );
  const maximum = requirePositiveNumber(
    steepMinutes.maximum,
    `${slug}.recipe.steepMinutes.maximum`,
  );

  if (minimum > maximum) {
    throw new Error(
      `${slug}.recipe.steepMinutes.minimum must not exceed maximum.`,
    );
  }

  return {
    prepMinutes: requirePositiveNumber(
      recipe.prepMinutes,
      `${slug}.recipe.prepMinutes`,
    ),
    steepMinutes: {minimum, maximum},
    yield: requireString(recipe.yield, `${slug}.recipe.yield`),
    ratio: requireString(recipe.ratio, `${slug}.recipe.ratio`),
  };
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, path: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${path} must be a non-empty string.`);
  }

  return value.trim();
}

function requireImagePath(value: unknown, path: string): string {
  const imagePath = requireString(value, path);

  if (!imagePath.startsWith('/') || imagePath.startsWith('//')) {
    throw new Error(`${path} must be a root-relative path beginning with /.`);
  }

  return imagePath;
}

function optionalString(value: unknown, path: string): string | undefined {
  if (value === undefined) return undefined;
  return requireString(value, path);
}

function optionalPositiveInteger(
  value: unknown,
  path: string,
): number | undefined {
  if (value === undefined) return undefined;

  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    throw new Error(`${path} must be a positive integer.`);
  }

  return value;
}

function requireBoolean(value: unknown, path: string): boolean {
  if (typeof value !== 'boolean') {
    throw new Error(`${path} must be a boolean.`);
  }

  return value;
}

function requirePositiveNumber(value: unknown, path: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new Error(`${path} must be a positive number.`);
  }

  return value;
}

function requireStringArray(value: unknown, path: string): readonly string[] {
  if (!Array.isArray(value)) {
    throw new Error(`${path} must be an array of strings.`);
  }

  return value.map((item, index) => requireString(item, `${path}[${index}]`));
}

function requireOneOf<const TValue extends string>(
  value: unknown,
  options: readonly TValue[],
  path: string,
): TValue {
  if (typeof value === 'string') {
    for (const option of options) {
      if (value === option) return option;
    }
  }

  throw new Error(`${path} must be one of: ${options.join(', ')}.`);
}

function requireIsoDate(value: unknown, path: string): string {
  const date = requireString(value, path);

  if (
    !ISO_DATE_PATTERN.test(date) ||
    Number.isNaN(Date.parse(`${date}T00:00:00Z`))
  ) {
    throw new Error(`${path} must use YYYY-MM-DD format.`);
  }

  return date;
}
