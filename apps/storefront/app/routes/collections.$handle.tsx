import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {redirect, useLoaderData} from 'react-router';
import type {ProductItemFragment} from 'storefrontapi.generated';

import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/product/ProductItem';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

import type {Route} from './+types/collections.$handle';

export const meta: Route.MetaFunction = ({data}) => {
  const title = data?.collection.title ?? 'Collection';

  return [
    {title: `${title} | Just Plain Coffee`},
    {
      name: 'description',
      content:
        data?.collection.description ||
        `Shop ${title.toLowerCase()} from Just Plain Coffee.`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  const isMerch = collection.handle === 'merch';

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-12 md:px-10 md:pt-20 md:pb-16">
        <p className="text-sm font-bold tracking-[0.14em] text-primary uppercase">
          {isMerch ? 'Just Plain Goods' : 'The collection'}
        </p>
        <h1 className="mt-4 max-w-[11ch] text-6xl leading-none md:text-8xl">
          {collection.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700 md:text-2xl">
          {collection.description ||
            (isMerch
              ? 'Useful things, plainly made. No lifestyle transformation required.'
              : 'Everything in one place. Pick the one you want.')}
        </p>
      </section>

      <section className="border-t border-neutral-300 bg-neutral-100 px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PaginatedResourceSection<ProductItemFragment>
            ariaLabel={`${collection.title} products`}
            connection={collection.products}
            resourcesClassName="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {({node: product, index}) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 6 ? 'eager' : 'lazy'}
              />
            )}
          </PaginatedResourceSection>
        </div>
      </section>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    availableForSale
    id
    handle
    productType
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {
      value
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
