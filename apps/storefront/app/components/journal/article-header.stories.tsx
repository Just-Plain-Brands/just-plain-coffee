import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {ArticleHeader} from './article-header';
import {
  LONG_TITLE_JOURNAL_ENTRY,
  RECIPE_JOURNAL_ENTRY,
  STORY_JOURNAL_ENTRY,
} from './storybook/journal-story-fixtures';

const meta = {
  title: 'Journal/Article Header',
  component: ArticleHeader,
  args: {entry: RECIPE_JOURNAL_ENTRY},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof ArticleHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recipe = {} satisfies Story;

export const Story = {
  args: {entry: STORY_JOURNAL_ENTRY},
} satisfies Story;

export const LongHeadline = {
  args: {entry: LONG_TITLE_JOURNAL_ENTRY},
} satisfies Story;

export const WithShareActions = {
  args: {
    canonicalUrl: 'https://example.com/journal/how-to-make-cold-brew',
  },
} satisfies Story;
