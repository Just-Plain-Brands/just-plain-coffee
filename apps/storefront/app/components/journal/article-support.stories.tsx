import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {ArticleHero} from './article-hero';
import {ArticleTableOfContents} from './article-toc';
import {RecipeFacts} from './recipe-facts';
import {RelatedArticles} from './related-articles';
import {
  RECIPE_JOURNAL_ENTRY,
  STORY_JOURNAL_ENTRY,
} from './storybook/journal-story-fixtures';

const meta = {
  title: 'Journal/Article Supporting Components',
  component: ArticleHero,
  args: {entry: RECIPE_JOURNAL_ENTRY},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof ArticleHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecipeHero = {} satisfies Story;

export const StoryHero = {
  args: {entry: STORY_JOURNAL_ENTRY},
} satisfies Story;

export const TableOfContents = {
  render: () => (
    <div className="mx-auto w-52 py-10">
      <ArticleTableOfContents headings={RECIPE_JOURNAL_ENTRY.headings} />
    </div>
  ),
} satisfies Story;

export const RecipeFactsPanel = {
  render: () => (
    <div className="mx-auto w-[min(280px,calc(100vw-2rem))] py-10">
      <RecipeFacts facts={RECIPE_JOURNAL_ENTRY.recipe} />
    </div>
  ),
} satisfies Story;

export const RelatedArticleGrid = {
  render: () => (
    <RelatedArticles entries={[STORY_JOURNAL_ENTRY, RECIPE_JOURNAL_ENTRY]} />
  ),
} satisfies Story;
