import type {Meta, StoryObj} from '@storybook/react-vite';

import {ProductSpecifications} from './ProductSpecifications';

const APPAREL_SPECIFICATIONS = [
  {id: 'material', label: 'Material', value: '100% garment-dyed cotton'},
  {id: 'weight', label: 'Weight', value: '240 gsm'},
  {id: 'fit', label: 'Fit', value: 'Relaxed, unisex fit'},
  {id: 'care', label: 'Care', value: 'Machine wash cold'},
] as const;

const meta = {
  title: 'Product/Product Specifications',
  component: ProductSpecifications,
  args: {
    description:
      'Dense cotton, a relaxed shape, and a small chest print. Wash it, wear it, repeat.',
    eyebrow: 'Made like an actual shirt',
    items: APPAREL_SPECIFICATIONS,
    title: 'Substantial, without being precious.',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[min(1120px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductSpecifications>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Apparel = {} satisfies Story;

export const Coffee = {
  args: {
    description:
      'Sweet, balanced, and built for the first cup of the day. Easy through a dripper, press, or batch brewer.',
    eyebrow: 'Coffee details',
    items: [
      {id: 'origin', label: 'Origin', value: 'Antigua, Guatemala'},
      {id: 'process', label: 'Process', value: 'Washed'},
      {id: 'altitude', label: 'Altitude', value: '1,500–1,700 masl'},
      {id: 'notes', label: 'Tastes like', value: 'Cocoa, caramel, citrus'},
    ],
    title: 'A daily coffee with nothing to prove.',
  },
} satisfies Story;

export const Minimal = {
  args: {
    description: 'The essentials, plainly stated.',
    eyebrow: undefined,
    items: [
      {id: 'material', label: 'Material', value: 'Cotton'},
      {id: 'care', label: 'Care', value: 'Machine wash'},
    ],
    title: 'Product details.',
  },
} satisfies Story;

export const Empty = {
  args: {
    items: [],
  },
} satisfies Story;

export const LongValues = {
  args: {
    items: [
      {
        id: 'material',
        label: 'Material',
        value:
          'Long-staple, garment-dyed cotton with a softly brushed interior finish',
      },
      {
        id: 'construction',
        label: 'Construction',
        value:
          'Bound collar, reinforced shoulder seam, and double-needle sleeve and bottom hems',
      },
      ...APPAREL_SPECIFICATIONS.slice(2),
    ],
  },
} satisfies Story;
