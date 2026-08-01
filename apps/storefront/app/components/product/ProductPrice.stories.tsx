import type {Meta, StoryObj} from '@storybook/react-vite';

import {ProductPrice} from './ProductPrice';

const meta = {
  title: 'Product/Product Price',
  component: ProductPrice,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductPrice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard = {
  args: {
    price: {
      amount: '18.00',
      currencyCode: 'USD',
    },
  },
} satisfies Story;

export const OnSale = {
  args: {
    price: {
      amount: '14.00',
      currencyCode: 'USD',
    },
    compareAtPrice: {
      amount: '18.00',
      currencyCode: 'USD',
    },
  },
} satisfies Story;

export const Unavailable = {} satisfies Story;
