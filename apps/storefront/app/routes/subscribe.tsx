import {Link, useLoaderData} from 'react-router';

import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/cart/AddToCartButton';
import {
  SubscriptionBuilder,
  type SubscriptionBuilderSelection,
} from '~/components/subscription/SubscriptionBuilder';
import {Button} from '~/components/ui/button';
import {getProductPresentation} from '~/lib/coffee/presentation';
import {getCompleteRoastRange} from '~/lib/coffee/roast-range';

import type {Route} from './+types/subscribe';

export const meta: Route.MetaFunction = () => [
  {title: 'Build a coffee subscription | Just Plain Coffee'},
  {
    name: 'description',
    content:
      'Choose your Just Plain Coffee roast, delivery frequency, and carton quantity, then add the subscription to your cart.',
  },
];

export async function loader({context}: Route.LoaderArgs) {
  const {shop} = await context.storefront.query(SUBSCRIPTION_PRODUCTS_QUERY);
  const products = getCompleteRoastRange(
    getReferencedProducts(shop.coreRoasts),
  ).map((product) => ({
    ...product,
    presentation: getProductPresentation({
      title: product.title,
      tags: product.tags,
      tagline: product.taglineMetafield?.value,
      tintColor: product.tintColorMetafield?.value,
      primaryColor: product.primaryColorMetafield?.value,
    }),
  }));

  return {products};
}

export default function SubscribePage() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <main>
      <SubscriptionBuilder
        products={products}
        renderAction={(selection) => (
          <SubscriptionCartAction selection={selection} />
        )}
      />
    </main>
  );
}

function SubscriptionCartAction({
  selection,
}: {
  selection: SubscriptionBuilderSelection;
}) {
  const {open} = useAside();

  if (selection.status === 'unavailable') {
    return (
      <Button
        className="h-12 w-full rounded-full bg-green-100 px-5 text-green-900"
        render={<Link prefetch="intent" to="/collections/all" />}
      >
        Shop coffee
      </Button>
    );
  }

  return (
    <AddToCartButton
      analytics={{
        products: [
          {
            productGid: selection.product.id,
            quantity: selection.quantity,
            variantGid: selection.variant.id,
          },
        ],
      }}
      className="h-12 w-full bg-green-100 px-5 text-green-900 hover:bg-green-200"
      lines={[
        {
          merchandiseId: selection.variant.id,
          quantity: selection.quantity,
          selectedVariant: selection.variant,
          sellingPlanId: selection.allocation.sellingPlan.id,
        },
      ]}
      onClick={() => open('cart')}
    >
      Add subscription
    </AddToCartButton>
  );
}

const SUBSCRIPTION_PRODUCTS_QUERY = `#graphql
  query SubscriptionProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    shop {
      coreRoasts: metafield(namespace: "custom", key: "core_roasts") {
        references(first: 5) {
          nodes {
            __typename
            ... on Product {
              ...SubscriptionProduct
            }
          }
        }
      }
    }
  }

  fragment SubscriptionProduct on Product {
    availableForSale
    id
    handle
    title
    tags
    taglineMetafield: metafield(namespace: "custom", key: "tagline") {
      value
    }
    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {
      value
    }
    primaryColorMetafield: metafield(namespace: "custom", key: "primary_color") {
      value
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    selectedOrFirstAvailableVariant {
      availableForSale
      id
      price {
        amount
        currencyCode
      }
      product {
        handle
        title
      }
      selectedOptions {
        name
        value
      }
      sellingPlanAllocations(first: 10) {
        nodes {
          ...SubscriptionSellingPlanAllocation
        }
      }
    }
  }

  fragment SubscriptionSellingPlanAllocation on SellingPlanAllocation {
    checkoutChargeAmount {
      amount
      currencyCode
    }
    remainingBalanceChargeAmount {
      amount
      currencyCode
    }
    priceAdjustments {
      compareAtPrice {
        amount
        currencyCode
      }
      perDeliveryPrice {
        amount
        currencyCode
      }
      price {
        amount
        currencyCode
      }
    }
    sellingPlan {
      id
      name
      options {
        name
        value
      }
      recurringDeliveries
    }
  }
` as const;

function getReferencedProducts<Node extends {__typename?: string | undefined}>(
  metafield:
    | {references?: {nodes: readonly Node[]} | null | undefined}
    | null
    | undefined,
): Extract<Node, {__typename: 'Product'}>[] {
  return metafield?.references?.nodes.filter(isProductReference) ?? [];
}

function isProductReference<Node extends {__typename?: string | undefined}>(
  node: Node,
): node is Extract<Node, {__typename: 'Product'}> {
  return node.__typename === 'Product';
}
