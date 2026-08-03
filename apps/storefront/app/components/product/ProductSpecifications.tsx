import type {ReactNode} from 'react';

import {EmptyState} from '~/components/ui/empty-state';
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
