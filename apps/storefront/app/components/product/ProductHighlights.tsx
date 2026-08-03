import {SparklesIcon} from 'lucide-react';
import type {ReactNode} from 'react';

import {EmptyState} from '~/components/ui/empty-state';
import {cn} from '~/lib/utils';

export interface ProductHighlightItem {
  description: ReactNode;
  icon: ReactNode;
  id: string;
  label: ReactNode;
}

interface ProductHighlightProps {
  className?: string;
  description: ReactNode;
  icon: ReactNode;
  label: ReactNode;
}

interface ProductHighlightsProps {
  className?: string;
  items: readonly ProductHighlightItem[];
}

export function ProductHighlight({
  className,
  description,
  icon,
  label,
}: ProductHighlightProps) {
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

export function ProductHighlights({className, items}: ProductHighlightsProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        className={cn('min-h-40', className)}
        description="Highlights will appear here when available."
        icon={<SparklesIcon />}
        title="No product highlights available."
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
        <ProductHighlight
          description={item.description}
          icon={item.icon}
          key={item.id}
          label={item.label}
        />
      ))}
    </div>
  );
}
