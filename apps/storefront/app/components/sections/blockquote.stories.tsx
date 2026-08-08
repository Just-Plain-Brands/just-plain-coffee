import type {Meta, StoryObj} from '@storybook/react-vite';

import {Blockquote} from './blockquote';

const meta = {
  title: 'Sections/Blockquote',
  component: Blockquote,
  args: {
    caption: '— The entire marketing department',
    quote:
      "“We're not going to tell you it tastes like blackcurrant and honeysuckle. It tastes like coffee. Exceptionally good coffee.”",
  },
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithoutCaption = {
  args: {
    caption: undefined,
    quote: '“Good coffee. No performance required.”',
  },
} satisfies Story;
