import {Image, Money} from '@shopify/hydrogen';
import {ArrowUpRightIcon} from 'lucide-react';
import {Link} from 'react-router';
import type {ProductItemFragment} from 'storefrontapi.generated';

import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  return (
    <Link
      className="group min-w-0 no-underline"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div
        className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-4xl bg-surface p-8"
        style={{backgroundColor: product.tintColorMetafield?.value}}
      >
        <span className="absolute top-5 left-5 rounded-full bg-neutral-100 px-3 py-2 text-[10px] font-bold tracking-[0.12em] uppercase shadow-soft">
          {product.availableForSale
            ? product.productType || 'Just plain goods'
            : 'Sold out'}
        </span>
        {image ? (
          <Image
            alt={image.altText || product.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
            data={image}
            loading={loading}
            sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
          />
        ) : (
          <span className="font-display text-5xl text-neutral-600">Plain.</span>
        )}
        <span className="absolute right-5 bottom-5 grid size-12 place-items-center rounded-full bg-neutral-900 text-neutral-100 shadow-soft transition group-hover:rotate-6 group-hover:bg-orange-700">
          <ArrowUpRightIcon className="size-5" />
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pt-5">
        <div className="min-w-0">
          <h2 className="text-2xl leading-none">{product.title}</h2>
          <p className="mt-2 text-sm text-neutral-700">
            {product.productType || 'Everyday goods'}
          </p>
        </div>
        <span className="shrink-0 font-bold">
          <Money data={product.priceRange.minVariantPrice} />
        </span>
      </div>
    </Link>
  );
}
