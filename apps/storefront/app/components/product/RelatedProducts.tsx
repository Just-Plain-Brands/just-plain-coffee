import {ArrowUpRightIcon, PackageOpenIcon} from 'lucide-react';
import {useId, type ComponentProps, type ReactNode} from 'react';
import {Link} from 'react-router';

import {Button} from '~/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import {EmptyState} from '~/components/ui/empty-state';
import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

import {
  RelatedProductCard,
  RelatedProductCardLoading,
  type RelatedProduct,
} from './RelatedProductCard';

interface RelatedProductsAction {
  label: string;
  to: string;
}

interface RelatedProductsProps {
  action?: RelatedProductsAction;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  products: readonly RelatedProduct[];
  title: ReactNode;
}

const RELATED_PRODUCTS_CAROUSEL_OPTIONS = {
  align: 'start',
} satisfies NonNullable<ComponentProps<typeof Carousel>['opts']>;

const RELATED_PRODUCT_LOADING_CARD_IDS = [
  'first',
  'second',
  'third',
  'fourth',
] as const;

export function RelatedProductsLoading({
  className,
}: Pick<RelatedProductsProps, 'className'>) {
  return (
    <section
      aria-busy="true"
      aria-label="Loading related products"
      className={cn(
        'border-t border-neutral-300 bg-neutral-100 px-5 py-16 md:px-10 md:py-24',
        className,
      )}
      role="status"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-36 rounded-full bg-neutral-300" />
            <Skeleton className="mt-4 h-14 w-80 max-w-full rounded-xl bg-neutral-300 [animation-delay:100ms] before:[animation-delay:100ms] md:h-16" />
            <div className="mt-5 grid max-w-xl gap-2.5">
              <Skeleton className="h-4 w-full rounded-full bg-neutral-200 [animation-delay:180ms] before:[animation-delay:180ms]" />
              <Skeleton className="h-4 w-3/4 rounded-full bg-neutral-200 [animation-delay:240ms] before:[animation-delay:240ms]" />
            </div>
          </div>
          <Skeleton className="h-12 w-28 rounded-full bg-neutral-200 [animation-delay:300ms] before:[animation-delay:300ms]" />
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="-ml-4 flex">
            {RELATED_PRODUCT_LOADING_CARD_IDS.map((cardId) => (
              <div
                aria-hidden="true"
                className="min-w-0 shrink-0 basis-[78vw] pl-4 sm:basis-1/2 lg:basis-1/4"
                key={cardId}
              >
                <RelatedProductCardLoading />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Skeleton className="size-11 rounded-full bg-neutral-200" />
          <Skeleton className="size-11 rounded-full bg-neutral-200 [animation-delay:160ms] before:[animation-delay:160ms]" />
        </div>
      </div>
    </section>
  );
}

export function RelatedProducts({
  action,
  className,
  description,
  eyebrow,
  products,
  title,
}: RelatedProductsProps) {
  const headingId = useId();

  return (
    <section
      className={cn(
        'border-t border-neutral-300 bg-neutral-100 px-5 py-16 md:px-10 md:py-24',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow ? (
              <p className="text-sm font-bold tracking-[0.14em] text-orange-700 uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={cn(
                'text-5xl leading-none md:text-7xl',
                eyebrow && 'mt-3',
              )}
              id={headingId}
            >
              {title}
            </h2>
            {description ? (
              <div className="mt-4 max-w-xl text-lg text-neutral-700">
                {description}
              </div>
            ) : null}
          </div>
          {action ? (
            <Button
              className="h-12 w-max rounded-full border-neutral-300 px-5 font-bold hover:border-neutral-900"
              nativeButton={false}
              render={<Link to={action.to} />}
              variant="outline"
            >
              {action.label} <ArrowUpRightIcon className="size-4" />
            </Button>
          ) : null}
        </div>

        {products.length === 0 ? (
          <EmptyState
            className="mt-10 bg-neutral-50"
            description="Recommendations will appear here when products are available."
            icon={<PackageOpenIcon />}
            title="No related products yet."
          />
        ) : (
          <Carousel
            aria-labelledby={headingId}
            className="mt-10"
            opts={RELATED_PRODUCTS_CAROUSEL_OPTIONS}
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  className="basis-[78vw] pl-4 sm:basis-1/2 lg:basis-1/4"
                  key={product.id}
                >
                  <RelatedProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex justify-end gap-2">
              <CarouselPrevious
                aria-label="Previous related products"
                className="static my-0 size-11 rounded-full border-neutral-300 bg-neutral-100 hover:border-neutral-900 hover:bg-neutral-200 disabled:cursor-default"
              />
              <CarouselNext
                aria-label="Next related products"
                className="static my-0 size-11 rounded-full border-neutral-300 bg-neutral-100 hover:border-neutral-900 hover:bg-neutral-200 disabled:cursor-default"
              />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}
