import type {MDXContent} from 'mdx/types';

import {ArticleHeader} from '~/components/journal/article-header';
import {ArticleHero} from '~/components/journal/article-hero';
import {ArticleLayout} from '~/components/journal/article-layout';
import {RelatedArticles} from '~/components/journal/related-articles';
import {MdxRenderer} from '~/components/mdx/mdx-renderer';
import type {JournalSummary} from '~/lib/journal/types';

interface JournalArticlePageProps {
  canonicalUrl?: string;
  Content: MDXContent;
  entry: JournalSummary;
  relatedEntries?: readonly JournalSummary[];
}

const EMPTY_RELATED_ENTRIES: readonly JournalSummary[] = [];

export function JournalArticlePage({
  canonicalUrl,
  Content,
  entry,
  relatedEntries = EMPTY_RELATED_ENTRIES,
}: JournalArticlePageProps) {
  return (
    <div>
      <ArticleHeader canonicalUrl={canonicalUrl} entry={entry} />
      <ArticleHero entry={entry} />
      <ArticleLayout entry={entry}>
        <MdxRenderer Content={Content} />
      </ArticleLayout>
      <RelatedArticles entries={relatedEntries} />
    </div>
  );
}
