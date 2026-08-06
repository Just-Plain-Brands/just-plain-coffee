import type {Meta, StoryObj} from '@storybook/react-vite';

import {JournalMastheadArtwork} from './journal-masthead-artwork';

const meta = {
  title: 'Journal/Journal Masthead Artwork',
  component: JournalMastheadArtwork,
  decorators: [
    (Story) => (
      <div className="w-[min(760px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
  parameters: {layout: 'centered'},
} satisfies Meta<typeof JournalMastheadArtwork>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
