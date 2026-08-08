import {cva, type VariantProps} from 'class-variance-authority';
import {createElement, type ComponentPropsWithRef} from 'react';

import {cn} from '~/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      'display-2xl':
        'font-display text-6xl leading-none font-normal tracking-[-0.015em] normal-case md:text-8xl',
      'display-xl':
        'font-display text-5xl leading-none font-normal tracking-[-0.015em] normal-case md:text-7xl',
      'display-lg':
        'font-display text-4xl leading-tight font-normal tracking-[-0.015em] normal-case sm:text-5xl',
      'display-md':
        'font-display text-2xl leading-tight font-normal tracking-[-0.015em] normal-case sm:text-3xl',
      'display-sm':
        'font-display text-2xl leading-none font-normal tracking-[-0.015em] normal-case',
      'body-lg':
        'font-sans text-lg leading-relaxed font-normal tracking-normal normal-case',
      'body-md':
        'font-sans text-base leading-normal font-normal tracking-normal normal-case',
      'body-sm':
        'font-sans text-sm leading-normal font-normal tracking-normal normal-case',
      'body-xs':
        'font-sans text-xs leading-normal font-normal tracking-normal normal-case',
      'package-sm':
        'font-package text-sm leading-normal font-bold tracking-[0.14em] uppercase',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
});

type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>;

type TextTag =
  | 'blockquote'
  | 'dd'
  | 'div'
  | 'dt'
  | 'em'
  | 'figcaption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'legend'
  | 'p'
  | 'small'
  | 'span'
  | 'strong';

type TextProps<TTag extends TextTag = 'p'> = {
  as?: TTag;
  variant?: TextVariant;
} & Omit<ComponentPropsWithRef<TTag>, 'as'>;

type TextPresetProps<TTag extends TextTag> = Omit<
  TextProps<TTag>,
  'as' | 'variant'
>;

function Text<TTag extends TextTag = 'p'>({
  as,
  className,
  variant = 'body-md',
  ...props
}: TextProps<TTag>) {
  return createElement(as ?? 'p', {
    ...props,
    className: cn(textVariants({variant}), className),
    'data-slot': 'text',
    'data-variant': variant,
  });
}

function Hero(props: TextPresetProps<'h1'>) {
  return <Text {...props} as="h1" variant="display-2xl" />;
}

function Display(props: TextPresetProps<'h2'>) {
  return <Text {...props} as="h2" variant="display-xl" />;
}

function PageTitle(props: TextPresetProps<'h1'>) {
  return <Text {...props} as="h1" variant="display-lg" />;
}

function SectionTitle(props: TextPresetProps<'h2'>) {
  return <Text {...props} as="h2" variant="display-md" />;
}

function CardTitle(props: TextPresetProps<'h3'>) {
  return <Text {...props} as="h3" variant="display-sm" />;
}

function Lead(props: TextPresetProps<'p'>) {
  return <Text {...props} as="p" variant="body-lg" />;
}

function Body(props: TextPresetProps<'p'>) {
  return <Text {...props} as="p" variant="body-md" />;
}

function Supporting(props: TextPresetProps<'p'>) {
  return <Text {...props} as="p" variant="body-sm" />;
}

function Caption(props: TextPresetProps<'span'>) {
  return <Text {...props} as="span" variant="body-xs" />;
}

function Eyebrow(props: TextPresetProps<'p'>) {
  return <Text {...props} as="p" variant="package-sm" />;
}

export {
  Body,
  Caption,
  CardTitle,
  Display,
  Eyebrow,
  Hero,
  Lead,
  PageTitle,
  SectionTitle,
  Supporting,
  Text,
  textVariants,
};
export type {TextProps, TextTag, TextVariant};
