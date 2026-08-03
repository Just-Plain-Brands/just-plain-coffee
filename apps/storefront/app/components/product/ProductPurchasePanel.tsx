import type {ReactNode} from 'react';

import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

interface ProductPurchasePanelProps {
  children: ReactNode;
  className?: string;
}

interface ProductPurchasePanelHeaderProps {
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  meta?: ReactNode;
  price: ReactNode;
  title: string;
}

interface ProductPurchasePanelSectionProps {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  label: ReactNode;
}

interface ProductPurchasePanelRegionProps {
  children: ReactNode;
  className?: string;
}

const PURCHASE_PANEL_LOADING_OPTIONS = [
  {id: 'first', widthClassName: 'w-16'},
  {id: 'second', widthClassName: 'w-16'},
  {id: 'third', widthClassName: 'w-20'},
  {id: 'fourth', widthClassName: 'w-16'},
] as const;

export function ProductPurchasePanelLoading({
  className,
}: Pick<ProductPurchasePanelProps, 'className'>) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading product purchase options"
      className={cn('min-w-0', className)}
      role="status"
    >
      <header className="pb-8">
        <Skeleton className="h-3.5 w-48 rounded-full bg-neutral-300" />
        <div className="mt-5 grid max-w-md gap-3">
          <Skeleton className="h-14 w-full rounded-xl bg-neutral-300 [animation-delay:80ms] before:[animation-delay:80ms]" />
          <Skeleton className="h-14 w-3/4 rounded-xl bg-neutral-300 [animation-delay:140ms] before:[animation-delay:140ms]" />
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <Skeleton className="h-7 w-16 rounded-full bg-neutral-300 [animation-delay:180ms] before:[animation-delay:180ms]" />
          <Skeleton className="h-4 w-32 rounded-full bg-neutral-200 [animation-delay:220ms] before:[animation-delay:220ms]" />
        </div>
        <div className="mt-7 grid gap-3">
          <Skeleton className="h-5 w-full rounded-full bg-neutral-200 [animation-delay:260ms] before:[animation-delay:260ms]" />
          <Skeleton className="h-5 w-11/12 rounded-full bg-neutral-200 [animation-delay:300ms] before:[animation-delay:300ms]" />
          <Skeleton className="h-5 w-2/3 rounded-full bg-neutral-200 [animation-delay:340ms] before:[animation-delay:340ms]" />
        </div>
      </header>

      <section className="border-t border-neutral-300 py-7">
        <Skeleton className="h-4 w-28 rounded-full bg-neutral-300" />
        <div className="mt-4 flex gap-3">
          {['first', 'second', 'third'].map((id) => (
            <Skeleton
              className="size-12 rounded-full bg-neutral-300"
              key={id}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-300 py-7">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-20 rounded-full bg-neutral-300" />
          <Skeleton className="h-4 w-20 rounded-full bg-neutral-200 [animation-delay:120ms] before:[animation-delay:120ms]" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {PURCHASE_PANEL_LOADING_OPTIONS.map((option) => (
            <Skeleton
              className={cn(
                'h-11 rounded-full bg-neutral-200',
                option.widthClassName,
              )}
              key={option.id}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 border-t border-neutral-300 pt-7 sm:flex-row">
        <Skeleton className="h-14 w-full rounded-full bg-neutral-200 sm:w-36" />
        <Skeleton className="h-14 flex-1 rounded-full bg-neutral-900/25 [animation-delay:180ms] before:[animation-delay:180ms]" />
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-neutral-300 sm:grid-cols-2">
        <div className="grid justify-items-center gap-2 bg-neutral-100 p-4">
          <Skeleton className="size-8 rounded-full bg-neutral-300" />
          <Skeleton className="h-4 w-20 rounded-full bg-neutral-300" />
          <Skeleton className="h-3 w-24 rounded-full bg-neutral-200" />
        </div>
        <div className="grid justify-items-center gap-2 bg-neutral-100 p-4">
          <Skeleton className="size-8 rounded-full bg-neutral-300 [animation-delay:160ms] before:[animation-delay:160ms]" />
          <Skeleton className="h-4 w-20 rounded-full bg-neutral-300 [animation-delay:160ms] before:[animation-delay:160ms]" />
          <Skeleton className="h-3 w-24 rounded-full bg-neutral-200 [animation-delay:160ms] before:[animation-delay:160ms]" />
        </div>
      </div>
    </div>
  );
}

export function ProductPurchasePanel({
  children,
  className,
}: ProductPurchasePanelProps) {
  return <div className={cn('min-w-0', className)}>{children}</div>;
}

export function ProductPurchasePanelHeader({
  children,
  className,
  eyebrow,
  meta,
  price,
  title,
}: ProductPurchasePanelHeaderProps) {
  return (
    <header className={cn('pb-8', className)}>
      {eyebrow ? (
        <p className="text-sm font-bold tracking-[0.14em] text-orange-700 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn('text-6xl leading-none md:text-7xl', eyebrow && 'mt-3')}
      >
        {title}
      </h1>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-2xl font-bold">{price}</div>
        {meta ? <div className="text-sm text-neutral-600">{meta}</div> : null}
      </div>
      {children ? (
        <div className="mt-6 max-w-xl text-xl leading-relaxed text-neutral-700">
          {children}
        </div>
      ) : null}
    </header>
  );
}

export function ProductPurchasePanelSection({
  action,
  children,
  className,
  label,
}: ProductPurchasePanelSectionProps) {
  return (
    <section className={cn('border-t border-neutral-300 py-7', className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-sans text-sm font-bold tracking-[0.1em] uppercase">
          {label}
        </h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProductPurchasePanelActions({
  children,
  className,
}: ProductPurchasePanelRegionProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t border-neutral-300 pt-7 sm:flex-row',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProductPurchasePanelFooter({
  children,
  className,
}: ProductPurchasePanelRegionProps) {
  return <footer className={cn('mt-8', className)}>{children}</footer>;
}
