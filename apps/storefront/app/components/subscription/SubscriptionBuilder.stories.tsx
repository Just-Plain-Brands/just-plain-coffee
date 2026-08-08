import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {ProductSellingPlanAllocationFragment} from 'storefrontapi.generated';

import {Button} from '~/components/ui/button';
import {ROAST_PRESENTATIONS} from '~/lib/coffee/presentation';

import {
  SubscriptionBuilder,
  type SubscriptionBuilderProduct,
  type SubscriptionBuilderSelection,
} from './SubscriptionBuilder';

const PRICE = {
  amount: '18.00',
  currencyCode: 'USD',
} satisfies MoneyV2;

function createSellingPlan(
  weeks: number,
  price: string,
  roastId: string,
): ProductSellingPlanAllocationFragment {
  return {
    checkoutChargeAmount: {amount: price, currencyCode: 'USD'},
    remainingBalanceChargeAmount: {amount: '0.00', currencyCode: 'USD'},
    priceAdjustments: [
      {
        compareAtPrice: PRICE,
        perDeliveryPrice: {amount: price, currencyCode: 'USD'},
        price: {amount: price, currencyCode: 'USD'},
      },
    ],
    sellingPlan: {
      id: `gid://shopify/SellingPlan/${roastId}-${weeks}`,
      name: `Deliver every ${weeks} weeks`,
      options: [{name: 'Delivery every', value: `${weeks} weeks`}],
      recurringDeliveries: true,
    },
  };
}

const PRODUCTS = Object.values(ROAST_PRESENTATIONS).map((presentation) => {
  const title = `${presentation.shortName} Roast`;

  return {
    availableForSale: true,
    featuredImage: null,
    handle: `${presentation.id}-roast`,
    id: `gid://shopify/Product/${presentation.id}`,
    presentation: {
      ...presentation,
      accentName: presentation.shortName,
      displayName: presentation.shortName,
      eyebrow: `Organic coffee · ${presentation.shortName} roast`,
    },
    selectedOrFirstAvailableVariant: {
      availableForSale: true,
      id: `gid://shopify/ProductVariant/${presentation.id}`,
      price: PRICE,
      product: {handle: `${presentation.id}-roast`, title},
      selectedOptions: [{name: 'Title', value: 'Default Title'}],
      sellingPlanAllocations: {
        nodes: [
          createSellingPlan(2, '15.30', presentation.id),
          createSellingPlan(4, '15.30', presentation.id),
          createSellingPlan(6, '15.30', presentation.id),
        ],
      },
    },
    tags: [presentation.id, 'coffee'],
    title,
  } satisfies SubscriptionBuilderProduct;
});

function StoryAction({selection}: {selection: SubscriptionBuilderSelection}) {
  return (
    <Button
      className="h-12 w-full rounded-full bg-green-100 px-5 text-green-900 hover:bg-green-200"
      onClick={() => undefined}
    >
      {selection.status === 'ready' ? 'Add subscription' : 'Shop coffee'}
    </Button>
  );
}

const meta = {
  title: 'Subscription/Subscription Builder',
  component: SubscriptionBuilder,
  args: {
    products: PRODUCTS,
    renderAction: (selection) => <StoryAction selection={selection} />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SubscriptionBuilder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const DarkRoastStockUp = {
  args: {
    initialProductId: 'gid://shopify/Product/dark',
    initialQuantity: 3,
  },
} satisfies Story;

export const Mobile = {
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
} satisfies Story;

export const SubscriptionsUnavailable = {
  args: {
    products: [],
  },
} satisfies Story;
