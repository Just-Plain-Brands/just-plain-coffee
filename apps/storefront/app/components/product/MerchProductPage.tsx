import {Image, Money, type MappedProductOptions} from '@shopify/hydrogen';
import {
  ImagesIcon,
  LockKeyholeIcon,
  PackageCheckIcon,
  RulerIcon,
} from 'lucide-react';
import {Suspense, useMemo, useState} from 'react';
import {Await} from 'react-router';
import type {
  ProductFragment,
  ProductRecommendationsQuery,
} from 'storefrontapi.generated';

import {FactSheet, type FactSheetItem} from '~/components/marketing/fact-sheet';
import {
  HighlightGrid,
  type HighlightGridItem,
} from '~/components/marketing/highlight-grid';
import {Breadcrumbs} from '~/components/navigation/Breadcrumbs';
import {
  GalleryCarousel,
  type GalleryCarouselItem,
} from '~/components/product/GalleryCarousel';
import {ProductForm} from '~/components/product/ProductForm';
import {ProductPrice} from '~/components/product/ProductPrice';
import {
  ProductPurchasePanel,
  ProductPurchasePanelFooter,
  ProductPurchasePanelHeader,
} from '~/components/product/ProductPurchasePanel';
import type {RelatedProduct} from '~/components/product/RelatedProductCard';
import {
  RelatedProducts,
  RelatedProductsLoading,
} from '~/components/product/RelatedProducts';
import type {PurchaseSelection} from '~/lib/shopify/subscriptions';

interface MerchProductPageProps {
  product: ProductFragment;
  productOptions: MappedProductOptions[];
  recommendations: Promise<RecommendedProduct[]>;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}

type RecommendedProduct = NonNullable<
  ProductRecommendationsQuery['productRecommendations']
>[number];

const ONE_TIME_PURCHASE = {
  kind: 'one-time',
} satisfies PurchaseSelection;

function ignorePurchaseSelectionChange() {}

export function MerchProductPage({
  product,
  productOptions,
  recommendations,
  selectedVariant,
}: MerchProductPageProps) {
  const galleryItems = useMemo(() => getGalleryItems(product), [product]);
  const [selectedMediaId, setSelectedMediaId] = useState(
    galleryItems[0]?.id ?? '',
  );
  const [quantity, setQuantity] = useState(1);
  const merchCollection = product.collections.nodes.find(
    (collection) => collection.handle === 'merch',
  );
  const facts = getFacts(product);
  const highlights = getHighlights({
    mediaCount: galleryItems.length,
    product,
    selectedVariant,
  });

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <Breadcrumbs
          className="mb-7"
          items={[
            {kind: 'link', label: 'Shop', to: '/collections/all'},
            {
              kind: 'link',
              label: merchCollection?.title ?? 'Merch',
              to: `/collections/${merchCollection?.handle ?? 'merch'}`,
            },
            {kind: 'current', label: product.title},
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-start">
          <GalleryCarousel
            className="lg:sticky lg:top-32"
            items={galleryItems}
            onSelectedIdChange={setSelectedMediaId}
            selectedId={selectedMediaId}
          />

          <ProductPurchasePanel className="py-2 lg:py-6">
            <ProductPurchasePanelHeader
              eyebrow={product.eyebrowMetafield?.value ?? 'Just Plain Merch'}
              price={
                <ProductPrice
                  compareAtPrice={selectedVariant?.compareAtPrice}
                  price={selectedVariant?.price}
                />
              }
              title={product.title}
            >
              <p>{product.taglineMetafield?.value ?? product.description}</p>
            </ProductPurchasePanelHeader>

            <ProductForm
              onPurchaseSelectionChange={ignorePurchaseSelectionChange}
              productOptions={productOptions}
              purchaseSelection={ONE_TIME_PURCHASE}
              quantity={{
                max: selectedVariant?.availableForSale ? undefined : 1,
                onChange: setQuantity,
                value: quantity,
              }}
              sellingPlanAllocations={[]}
              selectedVariant={selectedVariant}
            />

            <ProductPurchasePanelFooter>
              <HighlightGrid items={highlights} />
            </ProductPurchasePanelFooter>
          </ProductPurchasePanel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        <FactSheet
          description={
            product.factSheetDescriptionMetafield?.value ?? product.description
          }
          eyebrow={
            product.factSheetEyebrowMetafield?.value ?? 'What you need to know'
          }
          items={facts}
          title={
            product.factSheetTitleMetafield?.value ?? 'The useful details.'
          }
        />
      </section>

      <Suspense fallback={<RelatedProductsLoading />}>
        <Await resolve={recommendations}>
          {(products) => (
            <RelatedProducts
              action={{label: 'Shop all merch', to: '/collections/merch'}}
              description="A few useful things that happen to look good together."
              eyebrow="Related goods"
              products={products.map(toRelatedProduct)}
              title="More plain stuff."
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function getGalleryItems(product: ProductFragment): GalleryCarouselItem[] {
  return product.media.nodes.flatMap((media, index) => {
    if (media.__typename !== 'MediaImage' || !media.image) return [];

    const label =
      media.alt || media.image.altText || `Product view ${index + 1}`;
    const image = (
      <Image
        alt={label}
        className="h-full w-full object-contain"
        data={media.image}
        loading={index === 0 ? 'eager' : 'lazy'}
        sizes="(min-width: 64rem) 55vw, 100vw"
      />
    );

    return [{id: media.id, label, media: image, thumbnail: image}];
  });
}

function getFacts(product: ProductFragment): FactSheetItem[] {
  const items: FactSheetItem[] = [];
  const configuredFacts = [
    ['material', 'Material', product.materialMetafield?.value],
    ['weight', 'Weight', product.fabricWeightMetafield?.value],
    ['fit', 'Fit', product.fitMetafield?.value],
    ['care', 'Care', product.careMetafield?.value],
  ] as const;

  for (const [id, label, value] of configuredFacts) {
    if (value) items.push({id, label, value});
  }

  const sizeOption = product.options.find(
    (option) => option.name.toLowerCase() === 'size',
  );
  if (sizeOption) {
    items.push({
      id: 'sizes',
      label: 'Sizes',
      value: sizeOption.optionValues.map((value) => value.name).join(' · '),
    });
  }

  items.push({
    id: 'availability',
    label: 'Availability',
    value: product.availableForSale ? 'In stock' : 'Currently sold out',
  });

  return items;
}

function getHighlights({
  mediaCount,
  product,
  selectedVariant,
}: {
  mediaCount: number;
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}): HighlightGridItem[] {
  const sizeOption = product.options.find(
    (option) => option.name.toLowerCase() === 'size',
  );

  return [
    {
      description: sizeOption
        ? `${sizeOption.optionValues.length} sizes`
        : 'Shopify variants',
      icon: <RulerIcon />,
      id: 'options',
      label: 'Your choice',
    },
    {
      description: `${mediaCount} product ${mediaCount === 1 ? 'view' : 'views'}`,
      icon: <ImagesIcon />,
      id: 'media',
      label: 'See the details',
    },
    {
      description: selectedVariant?.availableForSale
        ? 'Ready to add'
        : 'Currently sold out',
      icon: selectedVariant?.availableForSale ? (
        <PackageCheckIcon />
      ) : (
        <LockKeyholeIcon />
      ),
      id: 'availability',
      label: selectedVariant?.availableForSale
        ? 'Available now'
        : 'Check back soon',
    },
  ];
}

function toRelatedProduct(product: RecommendedProduct): RelatedProduct {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange.minVariantPrice;
  const isSale = Number(compareAtPrice.amount) > Number(price.amount);

  return {
    availability: product.availableForSale
      ? {kind: 'available', to: `/products/${product.handle}`}
      : {kind: 'unavailable', label: 'Sold out'},
    backgroundColor: product.tintColorMetafield?.value ?? '#eee7db',
    category: product.productType || 'Just plain goods',
    id: product.id,
    image: product.featuredImage ? (
      <Image
        alt={product.featuredImage.altText ?? product.title}
        className="h-full w-full object-contain"
        data={product.featuredImage}
        loading="lazy"
        sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 78vw"
      />
    ) : (
      <span className="font-display text-4xl text-neutral-600">Plain.</span>
    ),
    price: isSale
      ? {
          compareAtPrice: <Money data={compareAtPrice} />,
          kind: 'sale',
          price: <Money data={price} />,
        }
      : {kind: 'standard', price: <Money data={price} />},
    title: product.title,
  };
}
