import type {ComponentProps, ReactNode} from 'react';

import {cn} from '~/lib/utils';

interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  description?: ReactNode;
  icon?: ReactNode;
  size?: 'compact' | 'default';
  title: ReactNode;
}

export function EmptyState({
  className,
  description,
  icon,
  size = 'default',
  title,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-56 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-neutral-300 bg-background p-8 text-center text-neutral-900',
        size === 'compact' &&
          'min-h-0 flex-row justify-start rounded-xl p-4 text-left',
        className,
      )}
      data-size={size}
      data-slot="empty-state"
      {...props}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={cn(
            'grid size-12 shrink-0 place-items-center rounded-full bg-current/8 [&_svg]:size-6',
            size === 'compact' && 'size-9 [&_svg]:size-4',
          )}
          data-slot="empty-state-icon"
        >
          {icon}
        </span>
      ) : null}
      <div className="min-w-0" data-slot="empty-state-content">
        <p className="font-bold" data-slot="empty-state-title">
          {title}
        </p>
        {description ? (
          <div
            className="mt-1 text-sm leading-relaxed opacity-65"
            data-slot="empty-state-description"
          >
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
