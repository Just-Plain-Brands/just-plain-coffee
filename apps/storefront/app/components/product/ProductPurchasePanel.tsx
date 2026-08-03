import type {ReactNode} from 'react';

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
