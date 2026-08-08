import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {ArticleCard, FeaturedArticleCard} from './journal-card';
import {
  COFFEE_CAKE_JOURNAL_ENTRY,
  CREAM_STORY_ENTRY,
  LONG_TITLE_JOURNAL_ENTRY,
  RECIPE_JOURNAL_ENTRY,
  STORY_JOURNAL_ENTRY,
} from './storybook/journal-story-fixtures';

const meta = {
  title: 'Journal/Article Card',
  component: ArticleCard,
  args: {entry: RECIPE_JOURNAL_ENTRY},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[min(380px,calc(100vw-2rem))]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {layout: 'centered'},
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recipe = {} satisfies Story;

export const CoffeeCake = {
  args: {entry: COFFEE_CAKE_JOURNAL_ENTRY},
} satisfies Story;

export const Story = {
  args: {entry: STORY_JOURNAL_ENTRY},
} satisfies Story;

export const CreamTone = {
  args: {entry: CREAM_STORY_ENTRY},
} satisfies Story;

export const LongTitle = {
  args: {entry: LONG_TITLE_JOURNAL_ENTRY},
} satisfies Story;

export const FeaturedRecipe = {
  decorators: [
    (Story) => (
      <div className="w-[min(1180px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
  render: () => <FeaturedArticleCard entry={RECIPE_JOURNAL_ENTRY} />,
} satisfies Story;

export const FeaturedStory = {
  decorators: [
    (Story) => (
      <div className="w-[min(1180px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
  render: () => <FeaturedArticleCard entry={STORY_JOURNAL_ENTRY} />,
} satisfies Story;
