import {Fragment} from 'react';
import {Link} from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import {EmptyState} from '~/components/ui/empty-state';
import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

export type BreadcrumbItem =
  | {kind: 'link'; label: string; to: string}
  | {kind: 'current'; label: string};

interface BreadcrumbsProps {
  className?: string;
  items: readonly BreadcrumbItem[];
}

const BREADCRUMB_LOADING_ITEMS = [
  {className: 'w-12', delayClassName: ''},
  {
    className: 'w-16',
    delayClassName: '[animation-delay:120ms] before:[animation-delay:120ms]',
  },
  {
    className: 'w-28',
    delayClassName: '[animation-delay:240ms] before:[animation-delay:240ms]',
  },
] as const;

export function BreadcrumbsLoading({
  className,
}: Pick<BreadcrumbsProps, 'className'>) {
  return (
    <Breadcrumb
      aria-busy="true"
      aria-label="Breadcrumb"
      className={cn('overflow-hidden', className)}
    >
      <span className="sr-only">Loading breadcrumb navigation.</span>
      <BreadcrumbList className="min-w-max flex-nowrap gap-2 py-0.5">
        {BREADCRUMB_LOADING_ITEMS.map((item, index) => (
          <Fragment key={item.className}>
            {index > 0 ? (
              <BreadcrumbSeparator className="shrink-0 text-neutral-300" />
            ) : null}
            <BreadcrumbItem>
              <Skeleton
                className={cn(
                  'h-4 rounded-full bg-neutral-300',
                  item.className,
                  item.delayClassName,
                )}
              />
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function Breadcrumbs({className, items}: BreadcrumbsProps) {
  if (items.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className={className}>
        <EmptyState
          description="This page does not have a navigation trail."
          size="compact"
          title="No breadcrumb items available."
        />
      </nav>
    );
  }

  return (
    <Breadcrumb
      aria-label="Breadcrumb"
      className={cn('overflow-x-auto overscroll-x-contain', className)}
    >
      <BreadcrumbList className="min-w-max flex-nowrap gap-2 text-sm font-semibold text-neutral-600">
        {items.map((item, index) => {
          const key = item.kind === 'link' ? item.to : `current:${item.label}`;

          return (
            <Fragment key={key}>
              {index > 0 ? (
                <BreadcrumbSeparator className="shrink-0 text-neutral-600/60" />
              ) : null}
              <BreadcrumbItem className="min-w-0 gap-0">
                {item.kind === 'link' ? (
                  <BreadcrumbLink
                    className="max-w-52 truncate font-semibold text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:text-neutral-900"
                    render={<Link to={item.to} />}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="max-w-64 truncate font-semibold text-neutral-900">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
