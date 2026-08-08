import type {Meta, StoryObj} from '@storybook/react-vite';
import type {CSSProperties} from 'react';

import {
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
} from '~/components/ui/text';

type FontFamily = {
  name: string;
  role: string;
  variable: `--${string}`;
  utility: string;
  sample: string;
  detail: string;
  fontWeight: number;
  letterSpacing: string;
  textTransform: CSSProperties['textTransform'];
};

type TypeScaleItem = {
  label: string;
  utility: string;
  size: string;
  lineHeight: string;
  variable: FontFamily['variable'];
  sample: string;
  letterSpacing: string;
};

type FontWeight = {
  label: string;
  value: number;
};

const FONT_FAMILIES = [
  {
    name: 'Caprasimo',
    role: 'Display',
    variable: '--brand-font-display',
    utility: 'font-display',
    sample: 'Plain good coffee.',
    detail: 'Headlines, campaign moments, and expressive product names.',
    fontWeight: 400,
    letterSpacing: '-0.015em',
    textTransform: 'none',
  },
  {
    name: 'Figtree Variable',
    role: 'Body and UI',
    variable: '--brand-font-body',
    utility: 'font-sans',
    sample: 'Roasted fresh and shipped without the fuss.',
    detail: 'Body copy, navigation, controls, prices, and supporting text.',
    fontWeight: 400,
    letterSpacing: 'normal',
    textTransform: 'none',
  },
  {
    name: 'Archivo Variable',
    role: 'Package',
    variable: '--brand-font-package',
    utility: 'font-package',
    sample: 'WHOLE BEAN · 12 OZ · ROASTED FRESH',
    detail: 'Eyebrows, badges, labels, and package-inspired details.',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
] satisfies readonly FontFamily[];

const DISPLAY_SCALE = [
  {
    label: 'Hero',
    utility: 'text-7xl leading-[0.96]',
    size: '4.5rem',
    lineHeight: '0.96',
    variable: '--brand-font-display',
    sample: 'Coffee without the theater.',
    letterSpacing: '-0.015em',
  },
  {
    label: 'Display',
    utility: 'text-5xl leading-none',
    size: '3rem',
    lineHeight: '1',
    variable: '--brand-font-display',
    sample: 'Really good coffee.',
    letterSpacing: '-0.015em',
  },
  {
    label: 'Page title',
    utility: 'text-4xl',
    size: '2.25rem',
    lineHeight: '2.5rem',
    variable: '--brand-font-display',
    sample: 'Shop all coffee',
    letterSpacing: '-0.015em',
  },
  {
    label: 'Section title',
    utility: 'text-3xl',
    size: '1.875rem',
    lineHeight: '2.25rem',
    variable: '--brand-font-display',
    sample: 'Made for everyday drinking',
    letterSpacing: '-0.015em',
  },
  {
    label: 'Card title',
    utility: 'text-2xl',
    size: '1.5rem',
    lineHeight: '2rem',
    variable: '--brand-font-display',
    sample: 'The Daily Driver',
    letterSpacing: '-0.015em',
  },
] satisfies readonly TypeScaleItem[];

const BODY_SCALE = [
  {
    label: 'Lead',
    utility: 'text-lg',
    size: '1.125rem',
    lineHeight: '1.75rem',
    variable: '--brand-font-body',
    sample: 'A balanced, easy-drinking roast made for every morning.',
    letterSpacing: 'normal',
  },
  {
    label: 'Body',
    utility: 'text-base',
    size: '1rem',
    lineHeight: '1.5rem',
    variable: '--brand-font-body',
    sample: 'Chocolate, toasted almond, and a soft caramel finish.',
    letterSpacing: 'normal',
  },
  {
    label: 'Supporting',
    utility: 'text-sm',
    size: '0.875rem',
    lineHeight: '1.25rem',
    variable: '--brand-font-body',
    sample: 'Roasted every weekday and packed to order.',
    letterSpacing: 'normal',
  },
  {
    label: 'Caption',
    utility: 'text-xs',
    size: '0.75rem',
    lineHeight: '1rem',
    variable: '--brand-font-body',
    sample: 'Ships in 1–2 business days.',
    letterSpacing: 'normal',
  },
] satisfies readonly TypeScaleItem[];

const BODY_WEIGHTS = [
  {label: 'Normal', value: 400},
  {label: 'Medium', value: 500},
  {label: 'Semibold', value: 600},
  {label: 'Bold', value: 700},
] satisfies readonly FontWeight[];

function fontFamilyStyle(variable: FontFamily['variable']): CSSProperties {
  return {fontFamily: `var(${variable})`};
}

function FontFamilyCard({
  name,
  role,
  variable,
  utility,
  sample,
  detail,
  fontWeight,
  letterSpacing,
  textTransform,
}: FontFamily) {
  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex min-h-52 items-end bg-muted p-6">
        <p
          className="text-4xl leading-tight break-words"
          style={{
            ...fontFamilyStyle(variable),
            fontWeight,
            letterSpacing,
            textTransform,
          }}
        >
          {sample}
        </p>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">
            {role}
          </p>
          <h3 className="mt-1 font-sans text-lg font-semibold">{name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {detail}
        </p>
        <dl className="grid gap-1 border-t pt-3 font-mono text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-3">
            <dt>CSS variable</dt>
            <dd>{variable}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt>Utility</dt>
            <dd>{utility}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function TypeScale({items}: {items: readonly TypeScaleItem[]}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {items.map((item) => (
        <article
          className="grid gap-5 border-b p-5 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center sm:p-6"
          key={item.label}
        >
          <div>
            <h3 className="font-sans text-sm font-semibold">{item.label}</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {item.utility}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.size} / {item.lineHeight}
            </p>
          </div>
          <p
            className="min-w-0 break-words"
            style={{
              ...fontFamilyStyle(item.variable),
              fontSize: item.size,
              letterSpacing: item.letterSpacing,
              lineHeight: item.lineHeight,
            }}
          >
            {item.sample}
          </p>
        </article>
      ))}
    </div>
  );
}

function WeightSpecimen({label, value}: FontWeight) {
  return (
    <div className="grid gap-2 border-b py-4 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:items-baseline">
      <div className="flex items-baseline justify-between gap-3 sm:block">
        <p className="text-sm font-semibold">{label}</p>
        <p className="font-mono text-xs text-muted-foreground sm:mt-1">
          {value}
        </p>
      </div>
      <p
        className="text-2xl"
        style={{...fontFamilyStyle('--brand-font-body'), fontWeight: value}}
      >
        Roast, grind, brew, repeat. 0123456789
      </p>
    </div>
  );
}

function TypographyOverview() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-14">
        <header className="max-w-3xl space-y-4">
          <p className="font-package text-sm font-bold tracking-[0.16em] text-primary uppercase">
            Just Plain Coffee
          </p>
          <h1 className="text-4xl sm:text-5xl">Typography</h1>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            Three typefaces give the brand its voice: characterful display type,
            readable body copy, and practical package lettering.
          </p>
        </header>

        <section aria-labelledby="font-families" className="space-y-5">
          <div className="space-y-1">
            <h2 id="font-families" className="text-2xl sm:text-3xl">
              Font families
            </h2>
            <p className="text-muted-foreground">
              Each family has a distinct job in the visual system.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {FONT_FAMILIES.map((font) => (
              <FontFamilyCard key={font.variable} {...font} />
            ))}
          </div>
        </section>

        <section aria-labelledby="display-scale" className="space-y-5">
          <div className="space-y-1">
            <h2 id="display-scale" className="text-2xl sm:text-3xl">
              Display scale
            </h2>
            <p className="text-muted-foreground">
              Caprasimo stays regular-weight while size creates hierarchy.
            </p>
          </div>
          <TypeScale items={DISPLAY_SCALE} />
        </section>

        <section aria-labelledby="body-scale" className="space-y-5">
          <div className="space-y-1">
            <h2 id="body-scale" className="text-2xl sm:text-3xl">
              Body scale
            </h2>
            <p className="text-muted-foreground">
              Figtree carries longer copy and compact interface text.
            </p>
          </div>
          <TypeScale items={BODY_SCALE} />
        </section>

        <section aria-labelledby="font-weights" className="space-y-5">
          <div className="space-y-1">
            <h2 id="font-weights" className="text-2xl sm:text-3xl">
              Body weights
            </h2>
            <p className="text-muted-foreground">
              The primary Figtree weights used across content and controls.
            </p>
          </div>
          <div className="rounded-xl border bg-card px-5 shadow-sm sm:px-6">
            {BODY_WEIGHTS.map((weight) => (
              <WeightSpecimen key={weight.value} {...weight} />
            ))}
          </div>
        </section>

        <section aria-labelledby="hierarchy-example" className="space-y-5">
          <div className="space-y-1">
            <h2 id="hierarchy-example" className="text-2xl sm:text-3xl">
              Hierarchy in context
            </h2>
            <p className="text-muted-foreground">
              The three families working together in a product message.
            </p>
          </div>
          <article className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="space-y-6 p-7 sm:p-10 lg:p-12">
                <p className="font-package text-xs font-bold tracking-[0.14em] text-primary uppercase">
                  Roasted fresh · Ships Tuesday
                </p>
                <h3 className="max-w-[12ch] text-4xl leading-none sm:text-5xl">
                  Coffee you can count on.
                </h3>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  The Daily Driver is balanced, familiar, and genuinely easy to
                  brew—however you make coffee at home.
                </p>
                <p className="text-sm font-semibold">From $18 · 12 oz bag</p>
              </div>
              <div className="flex min-h-64 items-center justify-center bg-secondary p-8 text-secondary-foreground">
                <div className="rotate-[-3deg] border-2 border-current px-7 py-8 text-center font-package font-extrabold tracking-[0.12em] uppercase">
                  <p className="text-xs">Just Plain</p>
                  <p className="mt-2 text-3xl leading-none">Coffee</p>
                  <p className="mt-4 text-xs">Whole bean · 12 oz</p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function TypographyHelpers() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="max-w-3xl space-y-4">
          <Eyebrow className="text-primary">Just Plain Coffee</Eyebrow>
          <PageTitle>Typography helpers</PageTitle>
          <Lead className="text-muted-foreground">
            Intent-based components pair a generic variant with its usual HTML
            element. Use Text directly whenever the document hierarchy needs a
            different element.
          </Lead>
        </header>

        <div className="space-y-4">
          <article className="space-y-3 rounded-xl border bg-card p-6 shadow-sm">
            <Caption className="font-mono text-muted-foreground">
              Hero · h1 · display-2xl
            </Caption>
            <Hero>Coffee without the theater.</Hero>
          </article>

          <article className="space-y-3 rounded-xl border bg-card p-6 shadow-sm">
            <Caption className="font-mono text-muted-foreground">
              Display · h2 · display-xl
            </Caption>
            <Display>Really good coffee.</Display>
          </article>

          <article className="space-y-8 rounded-xl border bg-card p-6 shadow-sm">
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                PageTitle · h1 · display-lg
              </Caption>
              <PageTitle>Shop all coffee</PageTitle>
            </div>
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                SectionTitle · h2 · display-md
              </Caption>
              <SectionTitle>Made for everyday drinking</SectionTitle>
            </div>
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                CardTitle · h3 · display-sm
              </Caption>
              <CardTitle>The Daily Driver</CardTitle>
            </div>
          </article>

          <article className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                Lead · p · body-lg
              </Caption>
              <Lead>
                A balanced, easy-drinking roast made for every morning.
              </Lead>
            </div>
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                Body · p · body-md
              </Caption>
              <Body>Chocolate, toasted almond, and a soft caramel finish.</Body>
            </div>
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                Supporting · p · body-sm
              </Caption>
              <Supporting>
                Roasted every weekday and packed to order.
              </Supporting>
            </div>
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                Caption · span · body-xs
              </Caption>
              <Caption>Ships in 1–2 business days.</Caption>
            </div>
            <div className="space-y-3">
              <Caption className="font-mono text-muted-foreground">
                Eyebrow · p · package-sm
              </Caption>
              <Eyebrow>Whole bean · 12 oz · Roasted fresh</Eyebrow>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: TypographyOverview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TypographyOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview = {} satisfies Story;

export const Helpers = {
  render: () => <TypographyHelpers />,
} satisfies Story;
