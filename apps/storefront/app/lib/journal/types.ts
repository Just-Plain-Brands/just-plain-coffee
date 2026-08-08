import type {MDXContent} from 'mdx/types';

export type JournalKind = 'recipe' | 'story';
export type JournalCardTone = 'cream' | 'orange' | 'olive';

export interface JournalImage {
  src: string;
  alt: string;
}

export interface JournalArticleImage extends JournalImage {
  caption?: string;
}

interface JournalMetaBase {
  title: string;
  description: string;
  readingMinutes?: number;
  publishedAt: string;
  featured: boolean;
  draft: boolean;
  cardTone: JournalCardTone;
  tags: readonly string[];
  listImage: JournalImage;
  articleImage: JournalArticleImage;
}

export interface RecipeFacts {
  prepMinutes: number;
  steepMinutes: {
    minimum: number;
    maximum: number;
  };
  yield: string;
  ratio: string;
}

export type JournalMeta =
  | (JournalMetaBase & {
      kind: 'story';
    })
  | (JournalMetaBase & {
      kind: 'recipe';
      recipe: RecipeFacts;
    });

export interface JournalHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export type JournalSummary = JournalMeta & {
  slug: string;
  readingMinutes: number;
  headings: readonly JournalHeading[];
};

export interface JournalBodyModule {
  default: MDXContent;
}
