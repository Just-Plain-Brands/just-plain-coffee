import type {Meta, StoryObj} from '@storybook/react-vite';
import {MemoryRouter} from 'react-router';

import {
  RelatedProductCard,
  RelatedProductCardLoading,
} from './RelatedProductCard';
import {ProductStoryArtwork} from './storybook/ProductStoryArtwork';
import {RELATED_PRODUCT_STORY_FIXTURES} from './storybook/RelatedProductStoryFixtures';

const meta = {
  title: 'Product/Related Product Card',
  component: RelatedProductCard,
  args: {
    product: RELATED_PRODUCT_STORY_FIXTURES[0],
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[min(300px,calc(100vw-2rem))]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RelatedProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const OnSale = {
  args: {
    product: RELATED_PRODUCT_STORY_FIXTURES[2],
  },
} satisfies Story;

export const Unavailable = {
  args: {
    product: {
      ...RELATED_PRODUCT_STORY_FIXTURES[1],
      availability: {kind: 'unavailable', label: 'Sold out'},
    },
  },
} satisfies Story;

export const Loading = {
  render: () => <RelatedProductCardLoading />,
} satisfies Story;

export const LongTitle = {
  args: {
    product: {
      id: 'long-title-shirt',
      category: 'Limited edition apparel',
      title: 'The Especially Heavy Garment-Dyed Plain Coffee Tee',
      backgroundColor: '#ffc6a5',
      image: (
        <ProductStoryArtwork
          color="#2e2b25"
          kind="shirt"
          label="Heavyweight Plain Coffee Tee"
        />
      ),
      price: {kind: 'standard', price: '$42'},
      availability: {
        kind: 'available',
        to: '/products/heavyweight-plain-coffee-tee',
      },
    },
  },
} satisfies Story;
