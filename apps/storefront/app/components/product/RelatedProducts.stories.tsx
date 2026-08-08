import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {RelatedProducts, RelatedProductsLoading} from './RelatedProducts';
import {RELATED_PRODUCT_STORY_FIXTURES} from './storybook/RelatedProductStoryFixtures';

const meta = {
  title: 'Product/Related Products',
  component: RelatedProducts,
  args: {
    action: {label: 'Shop all', to: '/collections/all'},
    description: 'A few useful things that happen to look good together.',
    eyebrow: 'Related goods',
    products: RELATED_PRODUCT_STORY_FIXTURES,
    title: 'More plain stuff.',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RelatedProducts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FourProducts = {} satisfies Story;

export const TwoProducts = {
  args: {
    products: RELATED_PRODUCT_STORY_FIXTURES.slice(0, 2),
  },
} satisfies Story;

export const SingleProduct = {
  args: {
    products: RELATED_PRODUCT_STORY_FIXTURES.slice(0, 1),
  },
} satisfies Story;

export const Empty = {
  args: {
    products: [],
  },
} satisfies Story;

export const Loading = {
  render: () => <RelatedProductsLoading />,
} satisfies Story;

export const MobileOverflow = {
  decorators: [
    (Story) => (
      <div className="w-[390px] max-w-full overflow-hidden">
        <Story />
      </div>
    ),
  ],
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
} satisfies Story;

export const MobileLoading = {
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
  render: () => <RelatedProductsLoading />,
} satisfies Story;
