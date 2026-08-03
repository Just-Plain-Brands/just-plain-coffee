import {ArrowUpRightIcon} from 'lucide-react';
import type {ReactNode} from 'react';
import {Link} from 'react-router';

import {cn} from '~/lib/utils';

export type RelatedProductPrice =
  | {kind: 'standard'; price: ReactNode}
  | {compareAtPrice: ReactNode; kind: 'sale'; price: ReactNode};

export type RelatedProductAvailability =
  | {kind: 'available'; to: string}
  | {kind: 'unavailable'; label: string};

export interface RelatedProduct {
  availability: RelatedProductAvailability;
  backgroundColor?: string;
  category: string;
  id: string;
  image: ReactNode;
  price: RelatedProductPrice;
  title: string;
}

interface RelatedProductCardProps {
  className?: string;
  product: RelatedProduct;
}

export function RelatedProductCard({
  className,
  product,
}: RelatedProductCardProps) {
  const stage = (
    <>
      <span className="absolute top-5 left-5 rounded-full bg-neutral-100 px-3 py-2 text-[10px] font-bold tracking-[0.12em] uppercase shadow-soft">
        {product.availability.kind === 'unavailable'
          ? product.availability.label
          : product.category}
      </span>
      <div className="grid h-full w-full place-items-center [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain [&_svg]:max-h-full [&_svg]:max-w-full">
        {product.image}
      </div>
      {product.availability.kind === 'available' ? (
        <span className="absolute right-5 bottom-5 grid size-12 place-items-center rounded-full bg-neutral-900 text-neutral-100 shadow-soft transition group-hover:rotate-6 group-hover:bg-orange-700">
          <ArrowUpRightIcon className="size-5" />
        </span>
      ) : null}
    </>
  );

  return (
    <article className={cn('group min-w-0', className)}>
      {product.availability.kind === 'available' ? (
        <Link
          aria-label={`View ${product.title}`}
          className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-4xl p-7"
          style={{backgroundColor: product.backgroundColor}}
          to={product.availability.to}
        >
          {stage}
        </Link>
      ) : (
        <div
          className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-4xl p-7 opacity-65 grayscale-[20%]"
          style={{backgroundColor: product.backgroundColor}}
        >
          {stage}
        </div>
      )}

      <div className="flex items-start justify-between gap-4 px-1 pt-5">
        <div className="min-w-0">
          <h3 className="text-2xl leading-none">
            {product.availability.kind === 'available' ? (
              <Link
                className="underline-offset-4 hover:underline"
                to={product.availability.to}
              >
                {product.title}
              </Link>
            ) : (
              product.title
            )}
          </h3>
          <p className="mt-2 text-sm text-neutral-700">{product.category}</p>
        </div>
        <div className="shrink-0 text-right font-bold">
          <span
            className={cn(product.price.kind === 'sale' && 'text-orange-700')}
          >
            {product.price.price}
          </span>
          {product.price.kind === 'sale' ? (
            <s className="ml-2 text-sm font-medium text-neutral-700">
              {product.price.compareAtPrice}
            </s>
          ) : null}
        </div>
      </div>
    </article>
  );
}
