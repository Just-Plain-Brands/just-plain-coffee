import {
  getSelectedProductOptions,
  Analytics,
  Image,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {Link, useLoaderData, useSearchParams} from 'react-router';

import {CartonIllustration} from '~/components/catalog/carton-illustration/carton-illustration';
import {MerchProductPage} from '~/components/product/MerchProductPage';
import {ProductForm} from '~/components/product/ProductForm';
import {ProductPrice} from '~/components/product/ProductPrice';
import {buttonVariants} from '~/components/ui/button';
import {
  getProductPresentation,
  isBundleProduct,
} from '~/lib/coffee/presentation';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {
  SELLING_PLAN_PARAM,
  type PurchaseSelection,
} from '~/lib/shopify/subscriptions';

import type {Route} from './+types/products.$handle';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.product.title ?? 'Product'} | Just Plain Coffee`},
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
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);
  const deferredData = loadDeferredData(args, {
    isMerch: isMerchProduct(criticalData.product),
    productId: criticalData.product.id,
  });

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
function loadDeferredData(
  {context}: Route.LoaderArgs,
  {isMerch, productId}: {isMerch: boolean; productId: string},
) {
  if (!isMerch) {
    return {recommendations: Promise.resolve([])};
  }

  const recommendations = context.storefront
    .query(PRODUCT_RECOMMENDATIONS_QUERY, {
      variables: {productId},
    })
    .then(({productRecommendations}) => productRecommendations ?? [])
    .catch((error: Error) => {
      console.error('Unable to load product recommendations', error);
      return [];
    });

  return {recommendations};
}

export default function Product() {
  const {product, recommendations} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

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

  if (isMerchProduct(product)) {
    return (
      <>
        <MerchProductPage
          key={product.id}
          product={product}
          productOptions={productOptions}
          recommendations={recommendations}
          selectedVariant={selectedVariant}
        />
        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                price: selectedVariant?.price.amount || '0',
                quantity: 1,
                title: product.title,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                vendor: product.vendor,
              },
            ],
          }}
        />
      </>
    );
  }

  const {title, descriptionHtml} = product;
  const sellingPlanAllocations = isBundleProduct(product.tags)
    ? []
    : (selectedVariant?.sellingPlanAllocations.nodes ?? []);
  const selectedSellingPlanId = searchParams.get(SELLING_PLAN_PARAM);
  const selectedSellingPlanAllocation =
    sellingPlanAllocations.find(
      (allocation) => allocation.sellingPlan.id === selectedSellingPlanId,
    ) ?? null;
  const purchaseSelection: PurchaseSelection = selectedSellingPlanAllocation
    ? {kind: 'subscription', allocation: selectedSellingPlanAllocation}
    : {kind: 'one-time'};

  const handlePurchaseSelectionChange = (sellingPlanId: string | null) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    if (sellingPlanId) {
      nextSearchParams.set(SELLING_PLAN_PARAM, sellingPlanId);
    } else {
      nextSearchParams.delete(SELLING_PLAN_PARAM);
    }

    setSearchParams(nextSearchParams, {
      preventScrollReset: true,
      replace: true,
    });
  };

  const presentation = getProductPresentation({
    title,
    tags: product.tags,
    tagline: product.taglineMetafield?.value,
    tintColor: product.tintColorMetafield?.value,
    primaryColor: product.primaryColorMetafield?.value,
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
            style={{color: presentation.primaryColor}}
          >
            {presentation.accentName}.
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
          <p className="text-sm font-bold tracking-[0.14em] text-primary uppercase">
            {presentation.eyebrow}
          </p>
          <h1 className="mt-4 text-6xl leading-none md:text-8xl">{title}</h1>
          <div className="mt-5 text-2xl font-bold">
            <ProductPrice
              compareAtPrice={selectedVariant?.compareAtPrice}
              price={selectedVariant?.price}
              sellingPlanAllocation={selectedSellingPlanAllocation}
            />
          </div>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-neutral-700">
            {presentation.tagline} One ingredient. Nothing performed.
          </p>

          <div className="mt-9 rounded-3xl bg-neutral-100 p-6 md:p-8">
            <ProductForm
              onPurchaseSelectionChange={handlePurchaseSelectionChange}
              productOptions={productOptions}
              purchaseSelection={purchaseSelection}
              sellingPlanAllocations={sellingPlanAllocations}
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
    sellingPlanAllocations(first: 10) {
      nodes {
        ...ProductSellingPlanAllocation
      }
    }
  }
  fragment ProductSellingPlanAllocation on SellingPlanAllocation {
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

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    availableForSale
    id
    title
    tags
    vendor
    handle
    productType
    descriptionHtml
    description
    collections(first: 20) {
      nodes {
        handle
        title
      }
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    media(first: 20) {
      nodes {
        __typename
        ... on MediaImage {
          id
          alt
          image {
            id
            altText
            url
            width
            height
          }
        }
      }
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
    taglineMetafield: metafield(namespace: "custom", key: "tagline") {
      value
    }
    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {
      value
    }
    primaryColorMetafield: metafield(namespace: "custom", key: "primary_color") {
      value
    }
    pageTypeMetafield: metafield(namespace: "custom", key: "product_page_type") {
      value
    }
    eyebrowMetafield: metafield(namespace: "custom", key: "pdp_eyebrow") {
      value
    }
    factSheetEyebrowMetafield: metafield(namespace: "custom", key: "fact_sheet_eyebrow") {
      value
    }
    factSheetTitleMetafield: metafield(namespace: "custom", key: "fact_sheet_title") {
      value
    }
    factSheetDescriptionMetafield: metafield(namespace: "custom", key: "fact_sheet_description") {
      value
    }
    materialMetafield: metafield(namespace: "custom", key: "material") {
      value
    }
    fabricWeightMetafield: metafield(namespace: "custom", key: "fabric_weight") {
      value
    }
    fitMetafield: metafield(namespace: "custom", key: "fit") {
      value
    }
    careMetafield: metafield(namespace: "custom", key: "care") {
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

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendations(
    $country: CountryCode
    $language: LanguageCode
    $productId: ID!
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId, intent: RELATED) {
      availableForSale
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        id
        altText
        url
        width
        height
      }
      handle
      id
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      productType
      tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {
        value
      }
      title
    }
  }
` as const;

function isMerchProduct(product: {
  collections: {nodes: Array<{handle: string}>};
  pageTypeMetafield?: {value: string} | null;
}) {
  return (
    product.pageTypeMetafield?.value.toLowerCase() === 'merch' ||
    product.collections.nodes.some(
      (collection) => collection.handle === 'merch',
    )
  );
}
