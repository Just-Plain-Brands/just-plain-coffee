import {
  getSelectedProductOptions,
  Analytics,
  Image,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {Link, useLoaderData} from 'react-router';

import {CartonIllustration} from '~/components/catalog/carton-illustration/carton-illustration';
import {ProductForm} from '~/components/product/ProductForm';
import {ProductPrice} from '~/components/product/ProductPrice';
import {buttonVariants} from '~/components/ui/button';
import {getRoastPresentation} from '~/lib/coffee/presentation';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

import type {Route} from './+types/products.$handle';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.product.title ?? 'Coffee'} | Just Plain Coffee`},
    {
      name: 'description',
      content: data?.product.seo.description ?? data?.product.description,
    },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;
  const presentation = getRoastPresentation({
    title,
    tags: product.tags,
  });
  const productDetails = [
    ['Origin', product.originMetafield?.value ?? presentation.origin],
    ['Format', product.formatMetafield?.value ?? '12 oz carton'],
    ['Coffee', product.coffeeMetafield?.value ?? 'Whole bean'],
  ] as const;

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-10 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div
          className="relative grid min-h-[580px] place-items-center overflow-hidden rounded-4xl lg:sticky lg:top-36"
          style={{backgroundColor: presentation.tintColor}}
        >
          <div
            aria-hidden="true"
            className="absolute -rotate-8 font-display text-[clamp(6rem,16vw,12rem)] leading-none"
            style={{color: presentation.wordColor}}
          >
            {presentation.shortName}.
          </div>
          <div className="relative h-[490px] w-[333px] rotate-2">
            {product.featuredImage ? (
              <Image
                alt={product.featuredImage.altText ?? title}
                className="h-full w-full object-contain"
                data={product.featuredImage}
                loading="eager"
                sizes="(min-width: 64rem) 333px, 80vw"
              />
            ) : (
              <CartonIllustration className="origin-top-left scale-[0.98]" />
            )}
          </div>
        </div>

        <div className="py-3 lg:py-8">
          <p className="text-sm font-bold tracking-[0.14em] text-orange-700 uppercase">
            Organic coffee · {presentation.shortName} roast
          </p>
          <h1 className="mt-4 text-6xl leading-none md:text-8xl">{title}</h1>
          <div className="mt-5 text-2xl font-bold">
            <ProductPrice
              compareAtPrice={selectedVariant?.compareAtPrice}
              price={selectedVariant?.price}
            />
          </div>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-neutral-700">
            {presentation.description} One ingredient. Nothing performed.
          </p>

          <div className="mt-9 rounded-3xl bg-neutral-100 p-6 md:p-8">
            <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            />
            <p className="mt-4 text-center text-sm text-neutral-600">
              Roasted to order · Ships in 1–2 business days
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-neutral-300 sm:grid-cols-3">
            {productDetails.map(([label, value]) => (
              <div className="bg-neutral-100 p-5" key={label}>
                <dt className="text-xs font-bold tracking-[0.12em] text-neutral-600 uppercase">
                  {label}
                </dt>
                <dd className="mt-2 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          {descriptionHtml ? (
            <div className="mt-10 border-t border-neutral-300 pt-8">
              <h2 className="text-3xl">The details</h2>
              <div
                className="mt-4 max-w-none space-y-4 leading-relaxed text-neutral-700"
                dangerouslySetInnerHTML={{__html: descriptionHtml}}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col gap-5 rounded-4xl bg-green-900 p-8 text-green-100 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-4xl md:text-5xl">Want to compare caps?</h2>
            <p className="mt-3 text-green-100/70">
              See the complete roast range. No personality quiz required.
            </p>
          </div>
          <Link
            className={buttonVariants({
              className:
                'h-12 rounded-full bg-green-100 px-7 text-base text-green-900 hover:bg-green-200',
            })}
            prefetch="intent"
            to="/collections/all"
          >
            Shop all coffee
          </Link>
        </div>
      </section>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </main>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    tags
    vendor
    handle
    descriptionHtml
    description
    featuredImage {
      id
      altText
      url
      width
      height
    }
    originMetafield: metafield(namespace: "custom", key: "origin") {
      value
    }
    formatMetafield: metafield(namespace: "custom", key: "format") {
      value
    }
    coffeeMetafield: metafield(namespace: "custom", key: "coffee") {
      value
    }
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
