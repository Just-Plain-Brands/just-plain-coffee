import {getPaginationVariables} from '@shopify/hydrogen';
import {useLoaderData} from 'react-router';
import type {CoffeeProductCardFragment} from 'storefrontapi.generated';

import {ProductCard} from '~/components/catalog/product-card';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {getRoastPresentation} from '~/lib/coffee/presentation';
import {COFFEE_PRODUCT_CARD_FRAGMENT} from '~/lib/shopify/catalog-fragments';

import type {Route} from './+types/collections.all';

export const meta: Route.MetaFunction = () => [
  {title: 'Shop coffee | Just Plain Coffee'},
  {
    name: 'description',
    content:
      'Shop the complete Just Plain Coffee range: straightforward specialty coffee in a very good-looking carton.',
  },
];

export async function loader({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});
  const {products} = await context.storefront.query(CATALOG_QUERY, {
    variables: paginationVariables,
  });

  return {products};
}

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <main>
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl rounded-4xl bg-orange-200 px-7 py-14 text-center md:px-14 md:py-20">
          <p className="text-sm font-bold tracking-[0.14em] text-orange-900/70 uppercase">
            The collection
          </p>
          <h1 className="mt-4 text-6xl leading-none md:text-8xl">
            Four coffees. Zero regrets.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-900/75">
            Straightforward coffee with nothing hiding in the back. The only
            hard part is picking a cap color.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="catalog-heading"
        className="mx-auto max-w-7xl px-5 pb-20 md:px-10 md:pb-28"
      >
        <h2 className="sr-only" id="catalog-heading">
          Coffee catalog
        </h2>
        <PaginatedResourceSection<CoffeeProductCardFragment>
          connection={products}
          resourcesClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {({node: product}) => (
            <ProductCard
              key={product.id}
              presentation={getRoastPresentation({
                title: product.title,
                tags: product.tags,
              })}
              product={product}
            />
          )}
        </PaginatedResourceSection>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col gap-5 rounded-4xl bg-neutral-900 p-8 text-neutral-100 md:flex-row md:items-center md:justify-between md:p-12">
          <p className="font-display text-3xl md:text-5xl">
            Can&apos;t decide? It&apos;s Medium. It&apos;s always Medium.
          </p>
          <a
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-orange-500 px-7 font-bold transition hover:bg-orange-600"
            href="#catalog-heading"
          >
            Find Medium
          </a>
        </div>
      </section>
    </main>
  );
}

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
    ) {
      nodes {
        ...CoffeeProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COFFEE_PRODUCT_CARD_FRAGMENT}
` as const;
