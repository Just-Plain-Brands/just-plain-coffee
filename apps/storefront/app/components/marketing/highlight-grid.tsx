import {SparklesIcon} from 'lucide-react';
import type {ReactNode} from 'react';

import {EmptyState} from '~/components/ui/empty-state';
import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

export interface HighlightGridItem {
  description: ReactNode;
  icon: ReactNode;
  id: string;
  label: ReactNode;
}

interface HighlightCardProps {
  className?: string;
  description: ReactNode;
  icon: ReactNode;
  label: ReactNode;
}

interface HighlightGridProps {
  className?: string;
  items: readonly HighlightGridItem[];
}

const HIGHLIGHT_GRID_LOADING_ITEMS = [
  {id: 'first', delayClassName: ''},
  {
    id: 'second',
    delayClassName: '[animation-delay:140ms] before:[animation-delay:140ms]',
  },
  {
    id: 'third',
    delayClassName: '[animation-delay:280ms] before:[animation-delay:280ms]',
  },
] as const;

export function HighlightGridLoading({
  className,
}: Pick<HighlightGridProps, 'className'>) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading highlights"
      className={cn(
        'grid gap-px overflow-hidden rounded-3xl bg-neutral-300 sm:[grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]',
        className,
      )}
      role="status"
    >
      {HIGHLIGHT_GRID_LOADING_ITEMS.map((item) => (
        <div className="bg-neutral-100 p-4 text-center" key={item.id}>
          <Skeleton
            className={cn(
              'mx-auto size-8 rounded-full bg-neutral-300',
              item.delayClassName,
            )}
          />
          <Skeleton
            className={cn(
              'mx-auto mt-2 h-4 w-20 rounded-full bg-neutral-300',
              item.delayClassName,
            )}
          />
          <Skeleton
            className={cn(
              'mx-auto mt-1.5 h-3 w-24 rounded-full bg-neutral-200',
              item.delayClassName,
            )}
          />
        </div>
      ))}
    </div>
  );
}

function HighlightCard({
  className,
  description,
  icon,
  label,
}: HighlightCardProps) {
  return (
    <div className={cn('bg-neutral-100 p-4 text-center', className)}>
      <span className="mx-auto grid size-8 place-items-center [&_svg]:size-5">
        {icon}
      </span>
      <strong className="mt-2 block text-sm">{label}</strong>
      <span className="mt-0.5 block text-xs text-neutral-600">
        {description}
      </span>
    </div>
  );
}

export function HighlightGrid({className, items}: HighlightGridProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        className={cn('min-h-40', className)}
        description="Highlights will appear here when available."
        icon={<SparklesIcon />}
        title="No highlights available."
      />
    );
  }

  return (
    <div
      className={cn(
        'grid gap-px overflow-hidden rounded-3xl bg-neutral-300 sm:[grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]',
        className,
      )}
    >
      {items.map((item) => (
        <HighlightCard
          description={item.description}
          icon={item.icon}
          key={item.id}
          label={item.label}
        />
      ))}
    </div>
  );
}
