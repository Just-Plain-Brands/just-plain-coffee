import type {ComponentProps, ReactNode} from 'react';

import {cn} from '~/lib/utils';

export type BlockquoteProps = Omit<ComponentProps<'section'>, 'children'> & {
  caption?: ReactNode;
  cite?: ComponentProps<'blockquote'>['cite'];
  figureClassName?: string;
  quote: ReactNode;
};

export function Blockquote({
  caption,
  cite,
  className,
  figureClassName,
  quote,
  ...sectionProps
}: BlockquoteProps) {
  return (
    <section
      {...sectionProps}
      className={cn(
        'mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-24',
        className,
      )}
    >
      <figure
        className={cn(
          '-rotate-1 rounded-4xl bg-orange-600 px-8 py-14 text-center text-neutral-100 shadow-soft md:px-16 md:py-20',
          figureClassName,
        )}
      >
        <blockquote
          cite={cite}
          className="font-display text-3xl leading-tight md:text-5xl"
        >
          {quote}
        </blockquote>
        {caption != null ? (
          <figcaption className="mt-8 text-sm font-bold tracking-[0.14em] uppercase">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
