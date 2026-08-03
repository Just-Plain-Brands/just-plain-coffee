import type {ReactNode} from 'react';

import {EmptyState} from '~/components/ui/empty-state';
import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

export interface ProductSpecification {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

interface ProductSpecificationsProps {
  className?: string;
  description: ReactNode;
  eyebrow?: ReactNode;
  items: readonly ProductSpecification[];
  title: ReactNode;
}

const PRODUCT_SPECIFICATION_LOADING_ITEMS = [
  {id: 'first', delayClassName: ''},
  {
    id: 'second',
    delayClassName: '[animation-delay:100ms] before:[animation-delay:100ms]',
  },
  {
    id: 'third',
    delayClassName: '[animation-delay:200ms] before:[animation-delay:200ms]',
  },
  {
    id: 'fourth',
    delayClassName: '[animation-delay:300ms] before:[animation-delay:300ms]',
  },
] as const;

export function ProductSpecificationsLoading({
  className,
}: Pick<ProductSpecificationsProps, 'className'>) {
  return (
    <section
      aria-busy="true"
      aria-label="Loading product specifications"
      className={cn(
        'grid overflow-hidden rounded-4xl bg-green-900 text-green-100 md:grid-cols-[1.1fr_0.9fr]',
        className,
      )}
      role="status"
    >
      <div className="p-8 md:p-14">
        <Skeleton className="h-3 w-40 rounded-full bg-green-100/20" />
        <div className="mt-5 grid max-w-md gap-3">
          <Skeleton className="h-12 w-full rounded-xl bg-green-100/18" />
          <Skeleton className="h-12 w-4/5 rounded-xl bg-green-100/18 [animation-delay:100ms] before:[animation-delay:100ms]" />
        </div>
        <div className="mt-7 grid max-w-xl gap-3">
          <Skeleton className="h-4 w-full rounded-full bg-green-100/12 [animation-delay:180ms] before:[animation-delay:180ms]" />
          <Skeleton className="h-4 w-11/12 rounded-full bg-green-100/12 [animation-delay:240ms] before:[animation-delay:240ms]" />
          <Skeleton className="h-4 w-2/3 rounded-full bg-green-100/12 [animation-delay:300ms] before:[animation-delay:300ms]" />
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-green-100/15 md:border-t-0 md:border-l">
        {PRODUCT_SPECIFICATION_LOADING_ITEMS.map((item) => (
          <div
            className="border-r border-b border-green-100/15 p-6 md:p-8"
            key={item.id}
          >
            <Skeleton
              className={cn(
                'h-3 w-16 rounded-full bg-green-100/20',
                item.delayClassName,
              )}
            />
            <Skeleton
              className={cn(
                'mt-4 h-5 w-4/5 rounded-full bg-green-100/15',
                item.delayClassName,
              )}
            />
            <Skeleton
              className={cn(
                'mt-2 h-5 w-3/5 rounded-full bg-green-100/15',
                item.delayClassName,
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductSpecifications({
  className,
  description,
  eyebrow,
  items,
  title,
}: ProductSpecificationsProps) {
  return (
    <section
      className={cn(
        'grid overflow-hidden rounded-4xl bg-green-900 text-green-100 md:grid-cols-[1.1fr_0.9fr]',
        className,
      )}
    >
      <div className="p-8 md:p-14">
        {eyebrow ? (
          <p className="text-xs font-bold tracking-[0.14em] text-green-200 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            'max-w-[13ch] text-5xl leading-none md:text-6xl',
            eyebrow && 'mt-4',
          )}
        >
          {title}
        </h2>
        <div className="mt-6 max-w-xl text-lg leading-relaxed text-green-100/75">
          {description}
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          className="min-h-64 rounded-none border-0 border-t border-green-100/15 bg-green-950/20 text-green-100 md:border-t-0 md:border-l"
          description="Product details will appear here when available."
          title="No specifications available."
        />
      ) : (
        <dl className="grid grid-cols-2 border-t border-green-100/15 md:border-t-0 md:border-l">
          {items.map((item) => (
            <div
              className="border-r border-b border-green-100/15 p-6 last:border-r-0 md:p-8"
              key={item.id}
            >
              <dt className="text-xs font-bold tracking-[0.12em] text-green-200 uppercase">
                {item.label}
              </dt>
              <dd className="mt-3 text-lg font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
