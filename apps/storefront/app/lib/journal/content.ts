import {parseJournalMeta} from './metadata';
import type {JournalHeading, JournalSummary} from './types';

const FRONTMATTER_MODULES = import.meta.glob<unknown>(
  '../../../content/journal/**/index.mdx',
  {eager: true, import: 'frontmatter'},
);

const RAW_MODULES = import.meta.glob<unknown>(
  '../../../content/journal/**/index.mdx',
  {eager: true, import: 'default', query: '?raw'},
);

const JOURNAL_INDEX = buildJournalIndex();

export function getJournalIndex({
  includeDrafts = false,
}: {includeDrafts?: boolean} = {}): readonly JournalSummary[] {
  const today = new Date().toISOString().slice(0, 10);

  return JOURNAL_INDEX.filter(
    (entry) => (includeDrafts || !entry.draft) && entry.publishedAt <= today,
  );
}

export function getJournalEntry(
  slug: string,
  {includeDrafts = false}: {includeDrafts?: boolean} = {},
): JournalSummary | null {
  return (
    getJournalIndex({includeDrafts}).find((entry) => entry.slug === slug) ??
    null
  );
}

function buildJournalIndex(): readonly JournalSummary[] {
  const entries: JournalSummary[] = [];
  const slugs = new Set<string>();

  for (const [path, frontmatter] of Object.entries(FRONTMATTER_MODULES)) {
    const slug = getSlugFromPath(path);
    const raw = RAW_MODULES[path];
    const metadata = parseJournalMeta({slug, value: frontmatter});

    if (typeof raw !== 'string') {
      throw new Error(`Expected raw MDX source for ${path}.`);
    }

    if (slugs.has(slug)) {
      throw new Error(`Duplicate journal slug: ${slug}.`);
    }

    slugs.add(slug);
    entries.push({
      ...metadata,
      slug,
      readingMinutes: metadata.readingMinutes ?? getReadingMinutes(raw),
      headings: getHeadings(raw),
    });
  }

  return entries.sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}

function getSlugFromPath(path: string): string {
  const parts = path.split('/');
  const journalIndex = parts.lastIndexOf('journal');
  const slug = parts[journalIndex + 1];

  if (journalIndex < 0 || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Unable to derive a valid journal slug from ${path}.`);
  }

  return slug;
}

function getReadingMinutes(raw: string): number {
  const content = stripFrontmatter(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_#[\](){}>|~-]/g, ' ');
  const words = content.match(/[\p{L}\p{N}’'-]+/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(words / 220));
}

function getHeadings(raw: string): readonly JournalHeading[] {
  const headings: JournalHeading[] = [];
  const counts = new Map<string, number>();

  for (const line of stripFrontmatter(raw).split('\n')) {
    const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const marker = match[1];
    const title = match[2];
    if (!marker || !title) continue;

    const baseId = slugifyHeading(title);
    const count = counts.get(baseId) ?? 0;
    counts.set(baseId, count + 1);
    headings.push({
      id: count === 0 ? baseId : `${baseId}-${count}`,
      title,
      level: marker === '##' ? 2 : 3,
    });
  }

  return headings;
}

function slugifyHeading(title: string): string {
  return title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
}
