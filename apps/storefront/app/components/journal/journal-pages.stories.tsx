import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {JournalArticlePage} from './journal-article-page';
import {JournalIndexPage} from './journal-index-page';
import {
  RecipeBodyFixture,
  StoryBodyFixture,
} from './storybook/journal-body-fixtures';
import {
  JOURNAL_STORY_FIXTURES,
  RECIPE_JOURNAL_ENTRY,
  STORY_JOURNAL_ENTRY,
} from './storybook/journal-story-fixtures';

const meta = {
  title: 'Journal/Page Compositions',
  component: JournalIndexPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof JournalIndexPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Index = {
  args: {entries: JOURNAL_STORY_FIXTURES},
} satisfies Story;

export const RecipePage = {
  args: {entries: JOURNAL_STORY_FIXTURES},
  render: () => (
    <JournalArticlePage
      Content={RecipeBodyFixture}
      entry={RECIPE_JOURNAL_ENTRY}
      relatedEntries={[STORY_JOURNAL_ENTRY]}
    />
  ),
} satisfies Story;

export const StoryPage = {
  args: {entries: JOURNAL_STORY_FIXTURES},
  render: () => (
    <JournalArticlePage
      Content={StoryBodyFixture}
      entry={STORY_JOURNAL_ENTRY}
      relatedEntries={[RECIPE_JOURNAL_ENTRY]}
    />
  ),
} satisfies Story;
