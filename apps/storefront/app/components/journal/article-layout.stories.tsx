import type {Meta, StoryObj} from '@storybook/react-vite';

import {MdxRenderer} from '~/components/mdx/mdx-renderer';

import {ArticleLayout} from './article-layout';
import {
  RecipeBodyFixture,
  StoryBodyFixture,
} from './storybook/journal-body-fixtures';
import {
  RECIPE_JOURNAL_ENTRY,
  STORY_JOURNAL_ENTRY,
} from './storybook/journal-story-fixtures';

const meta = {
  title: 'Journal/Article Layout',
  component: ArticleLayout,
  args: {
    children: <MdxRenderer Content={RecipeBodyFixture} />,
    entry: RECIPE_JOURNAL_ENTRY,
  },
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof ArticleLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recipe = {} satisfies Story;

export const Story = {
  args: {
    children: <MdxRenderer Content={StoryBodyFixture} />,
    entry: STORY_JOURNAL_ENTRY,
  },
} satisfies Story;
