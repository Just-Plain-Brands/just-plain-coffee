import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  CalendarClockIcon,
  CoffeeIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from 'lucide-react';

import {HighlightGrid, HighlightGridLoading} from './highlight-grid';

const MERCH_HIGHLIGHTS = [
  {
    id: 'shipping',
    icon: <TruckIcon />,
    label: 'Free shipping',
    description: 'Orders over $40',
  },
  {
    id: 'returns',
    icon: <RotateCcwIcon />,
    label: 'Easy returns',
    description: 'Within 30 days',
  },
  {
    id: 'quality',
    icon: <ShieldCheckIcon />,
    label: 'Built to last',
    description: 'Heavyweight cotton',
  },
] as const;

const meta = {
  title: 'Marketing/Highlight Grid',
  component: HighlightGrid,
  args: {
    items: MERCH_HIGHLIGHTS,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[min(720px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HighlightGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MerchHighlights = {} satisfies Story;

export const CoffeeHighlights = {
  args: {
    items: [
      {
        id: 'fresh',
        icon: <SparklesIcon />,
        label: 'Roasted fresh',
        description: 'Every weekday',
      },
      {
        id: 'schedule',
        icon: <CalendarClockIcon />,
        label: 'Pause anytime',
        description: 'Flexible subscriptions',
      },
      {
        id: 'whole-bean',
        icon: <CoffeeIcon />,
        label: 'Whole bean',
        description: 'Or ground to order',
      },
    ],
  },
} satisfies Story;

export const SingleItem = {
  args: {
    items: [MERCH_HIGHLIGHTS[0]],
  },
} satisfies Story;

export const Empty = {
  args: {
    items: [],
  },
} satisfies Story;

export const Loading = {
  render: () => <HighlightGridLoading />,
} satisfies Story;

export const LongCopy = {
  args: {
    items: [
      {
        id: 'shipping',
        icon: <TruckIcon />,
        label: 'Complimentary standard shipping',
        description:
          'Automatically applied to qualifying orders over forty dollars after discounts.',
      },
      ...MERCH_HIGHLIGHTS.slice(1),
    ],
  },
} satisfies Story;

export const MobileStack = {
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
} satisfies Story;
