import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {Breadcrumbs} from './Breadcrumbs';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [
      {kind: 'link', label: 'Shop', to: '/collections/all'},
      {kind: 'link', label: 'Merch', to: '/collections/merch'},
      {kind: 'current', label: 'The Plain Tee'},
    ],
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const SingleLevel = {
  args: {
    items: [{kind: 'current', label: 'All coffee'}],
  },
} satisfies Story;

export const Empty = {
  args: {
    items: [],
  },
} satisfies Story;

export const LongTrail = {
  args: {
    items: [
      {kind: 'link', label: 'Shop', to: '/collections/all'},
      {kind: 'link', label: 'Coffee', to: '/collections/coffee'},
      {kind: 'link', label: 'Single origin', to: '/collections/single-origin'},
      {kind: 'link', label: 'Ethiopia', to: '/collections/ethiopia'},
      {kind: 'current', label: 'Kayon Mountain Natural Process'},
    ],
  },
} satisfies Story;

export const LongLabels = {
  args: {
    items: [
      {
        kind: 'link',
        label: 'Seasonal and limited-release merchandise',
        to: '/collections/seasonal-merch',
      },
      {
        kind: 'current',
        label: 'The extremely comfortable heavyweight garment-dyed tee',
      },
    ],
  },
} satisfies Story;

export const MobileOverflow = {
  args: LongTrail.args,
  decorators: [
    (Story) => (
      <div className="w-[320px] overflow-hidden rounded-2xl border border-neutral-300 bg-background p-4">
        <Story />
      </div>
    ),
  ],
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
} satisfies Story;
