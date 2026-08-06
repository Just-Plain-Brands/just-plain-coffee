import type {MDXComponents} from 'mdx/types';
import type {ComponentProps} from 'react';

import {Callout, MascotTip} from '~/components/mdx/callout';
import {
  Figure,
  IngredientList,
  PullQuote,
  RecipeStep,
  RecipeSteps,
} from '~/components/mdx/recipe-blocks';
import {cn} from '~/lib/utils';

export function MdxHeading2({
  children,
  className,
  ...props
}: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'mt-12 scroll-mt-32 border-t border-green-700/45 pt-7 text-3xl leading-none first-of-type:mt-9 first-of-type:pt-5 md:text-4xl',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function MdxParagraph({className, ...props}: ComponentProps<'p'>) {
  return (
    <p
      className={cn('mt-5 text-lg leading-[1.75] text-neutral-700', className)}
      {...props}
    />
  );
}

export function MdxUnorderedList({className, ...props}: ComponentProps<'ul'>) {
  return (
    <ul className={cn('mt-5 list-disc space-y-2 pl-6', className)} {...props} />
  );
}

export function MdxListItem({className, ...props}: ComponentProps<'li'>) {
  return (
    <li
      className={cn('text-lg leading-relaxed text-neutral-700', className)}
      {...props}
    />
  );
}

export const JOURNAL_MDX_COMPONENTS = {
  h2: MdxHeading2,
  h3: ({children, className, ...props}) => (
    <h3
      className={cn('mt-9 scroll-mt-32 text-2xl leading-tight', className)}
      {...props}
    >
      {children}
    </h3>
  ),
  p: MdxParagraph,
  a: ({children, className, ...props}) => (
    <a
      className={cn(
        'font-semibold text-primary underline decoration-orange-600/40 underline-offset-4 hover:decoration-orange-700',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
  ul: MdxUnorderedList,
  ol: ({className, ...props}) => (
    <ol
      className={cn('mt-5 list-decimal space-y-2 pl-6', className)}
      {...props}
    />
  ),
  li: MdxListItem,
  blockquote: ({className, ...props}) => (
    <blockquote
      className={cn(
        'my-8 border-l-4 border-orange-600 pl-6 text-xl leading-relaxed font-semibold',
        className,
      )}
      {...props}
    />
  ),
  hr: ({className, ...props}) => (
    <hr className={cn('my-10 border-green-700/35', className)} {...props} />
  ),
  table: ({className, ...props}) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-ink/15">
      <table
        className={cn('w-full border-collapse text-left', className)}
        {...props}
      />
    </div>
  ),
  th: ({className, ...props}) => (
    <th
      className={cn('bg-green-200 px-4 py-3 font-package text-xs', className)}
      {...props}
    />
  ),
  td: ({className, ...props}) => (
    <td
      className={cn('border-t border-ink/10 px-4 py-3', className)}
      {...props}
    />
  ),
  Callout,
  Figure,
  IngredientList,
  MascotTip,
  PullQuote,
  RecipeStep,
  RecipeSteps,
} satisfies MDXComponents;
