import type {ComponentProps, ReactNode} from 'react';

import {Eyebrow} from '~/components/ui/text';
import {cn} from '~/lib/utils';

export type SplitHeroProps = Omit<ComponentProps<'section'>, 'children'> & {
  eyebrow?: ReactNode;
  heading: ReactNode;
  image: ReactNode;
  imageContainerClassName?: string;
  subheading?: ReactNode;
  textContainerClassName?: string;
};

export function SplitHero({
  className,
  eyebrow,
  heading,
  image,
  imageContainerClassName,
  subheading,
  textContainerClassName,
  ...sectionProps
}: SplitHeroProps) {
  return (
    <section
      {...sectionProps}
      className={cn(
        'mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16',
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className={textContainerClassName}>
          {eyebrow != null ? (
            <Eyebrow className="text-primary">{eyebrow}</Eyebrow>
          ) : null}
          <h1
            className={cn(
              'max-w-[10ch] text-6xl leading-[0.9] md:text-8xl',
              eyebrow != null && 'mt-5',
            )}
          >
            {heading}
          </h1>
          {subheading != null ? (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
              {subheading}
            </p>
          ) : null}
        </div>
        <div className={imageContainerClassName}>{image}</div>
      </div>
    </section>
  );
}
