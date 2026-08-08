import type {Meta, StoryObj} from '@storybook/react-vite';
import type {CSSProperties} from 'react';

type SemanticColor = {
  label: string;
  background: `--${string}`;
  foreground: `--${string}`;
};

type PaletteColor = {
  label: string;
  variable: `--${string}`;
};

const SEMANTIC_COLORS = [
  {
    label: 'Primary',
    background: '--primary',
    foreground: '--primary-foreground',
  },
  {
    label: 'Secondary',
    background: '--secondary',
    foreground: '--secondary-foreground',
  },
  {
    label: 'Accent',
    background: '--accent',
    foreground: '--accent-foreground',
  },
  {
    label: 'Muted',
    background: '--muted',
    foreground: '--muted-foreground',
  },
  {
    label: 'Background',
    background: '--background',
    foreground: '--foreground',
  },
  {
    label: 'Card',
    background: '--card',
    foreground: '--card-foreground',
  },
  {
    label: 'Popover',
    background: '--popover',
    foreground: '--popover-foreground',
  },
] satisfies readonly SemanticColor[];

const FEEDBACK_COLORS = [
  {
    label: 'Info',
    background: '--info',
    foreground: '--info-foreground',
  },
  {
    label: 'Success',
    background: '--success',
    foreground: '--success-foreground',
  },
  {
    label: 'Warning',
    background: '--warning',
    foreground: '--warning-foreground',
  },
  {
    label: 'Destructive',
    background: '--destructive',
    foreground: '--destructive-foreground',
  },
] satisfies readonly SemanticColor[];

const CONTROL_COLORS = [
  {label: 'Border', variable: '--border'},
  {label: 'Input', variable: '--input'},
  {label: 'Focus ring', variable: '--ring'},
] satisfies readonly PaletteColor[];

const FOUNDATION_COLORS = [
  {label: 'Cream', variable: '--cream'},
  {label: 'Surface', variable: '--surface'},
  {label: 'Ink', variable: '--ink'},
  {label: 'Roast dark', variable: '--roast-dark'},
] satisfies readonly PaletteColor[];

const COLOR_SCALES = [
  {
    label: 'Orange',
    colors: [
      {label: '100', variable: '--orange-100'},
      {label: '200', variable: '--orange-200'},
      {label: '300', variable: '--orange-300'},
      {label: '500', variable: '--orange-500'},
      {label: '600', variable: '--orange-600'},
      {label: '700', variable: '--orange-700'},
      {label: '900', variable: '--orange-900'},
    ],
  },
  {
    label: 'Green',
    colors: [
      {label: '100', variable: '--green-100'},
      {label: '200', variable: '--green-200'},
      {label: '300', variable: '--green-300'},
      {label: '500', variable: '--green-500'},
      {label: '600', variable: '--green-600'},
      {label: '700', variable: '--green-700'},
      {label: '900', variable: '--green-900'},
    ],
  },
  {
    label: 'Neutral',
    colors: [
      {label: '100', variable: '--neutral-100'},
      {label: '200', variable: '--neutral-200'},
      {label: '300', variable: '--neutral-300'},
      {label: '600', variable: '--neutral-600'},
      {label: '700', variable: '--neutral-700'},
      {label: '900', variable: '--neutral-900'},
    ],
  },
] satisfies ReadonlyArray<{
  label: string;
  colors: readonly PaletteColor[];
}>;

function colorStyle(variable: PaletteColor['variable']): CSSProperties {
  return {backgroundColor: `var(${variable})`};
}

function SemanticSwatch({label, background, foreground}: SemanticColor) {
  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div
        className="flex min-h-36 items-center justify-center p-5 text-center"
        style={{
          backgroundColor: `var(${background})`,
          color: `var(${foreground})`,
        }}
      >
        <span className="font-package text-sm font-bold tracking-[0.14em] uppercase">
          Aa
        </span>
      </div>
      <div className="space-y-2 bg-card p-4 text-card-foreground">
        <h3 className="font-sans text-sm font-semibold">{label}</h3>
        <div className="space-y-1 font-mono text-xs text-muted-foreground">
          <p>{background}</p>
          <p>{foreground}</p>
        </div>
      </div>
    </article>
  );
}

function ColorChip({label, variable}: PaletteColor) {
  return (
    <div className="min-w-0">
      <div
        aria-label={`${label}: ${variable}`}
        className="rounded-lg border shadow-sm"
        role="img"
        style={{...colorStyle(variable), minHeight: '5rem'}}
      />
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="truncate font-mono text-xs text-muted-foreground">
        {variable}
      </p>
    </div>
  );
}

function ColorScale({
  label,
  colors,
}: {
  label: string;
  colors: readonly PaletteColor[];
}) {
  return (
    <article>
      <h3 className="mb-3 font-sans text-lg font-semibold">{label}</h3>
      <div
        className="grid overflow-hidden rounded-xl border shadow-sm sm:grid-cols-3 lg:grid-cols-7"
        role="list"
      >
        {colors.map((color) => (
          <div className="min-w-0 bg-card" key={color.variable} role="listitem">
            <div
              aria-label={`${label} ${color.label}: ${color.variable}`}
              role="img"
              style={{...colorStyle(color.variable), minHeight: '6rem'}}
            />
            <div className="p-3">
              <p className="text-sm font-semibold">{color.label}</p>
              <p className="truncate font-mono text-xs text-muted-foreground">
                {color.variable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function ColorPalette() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-14">
        <header className="max-w-3xl space-y-4">
          <p className="font-package text-sm font-bold tracking-[0.16em] text-primary uppercase">
            Just Plain Coffee
          </p>
          <h1 className="text-4xl sm:text-5xl">Color palette</h1>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            Semantic tokens describe how color is used. Foundation colors and
            scales are the raw ingredients behind the brand.
          </p>
        </header>

        <section aria-labelledby="semantic-colors" className="space-y-5">
          <div className="space-y-1">
            <h2 id="semantic-colors" className="text-2xl sm:text-3xl">
              Semantic colors
            </h2>
            <p className="text-muted-foreground">
              Each swatch previews its intended foreground pairing.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEMANTIC_COLORS.map((color) => (
              <SemanticSwatch key={color.background} {...color} />
            ))}
          </div>
        </section>

        <section aria-labelledby="state-colors" className="space-y-5">
          <div className="space-y-1">
            <h2 id="state-colors" className="text-2xl sm:text-3xl">
              Feedback states
            </h2>
            <p className="text-muted-foreground">
              Status colors with their intended foreground pairings.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEEDBACK_COLORS.map((color) => (
              <SemanticSwatch key={color.background} {...color} />
            ))}
          </div>
        </section>

        <section aria-labelledby="control-colors" className="space-y-5">
          <div className="space-y-1">
            <h2 id="control-colors" className="text-2xl sm:text-3xl">
              Controls
            </h2>
            <p className="text-muted-foreground">
              Boundaries, form fields, and focus treatments.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROL_COLORS.map((color) => (
              <ColorChip key={color.variable} {...color} />
            ))}
          </div>
        </section>

        <section aria-labelledby="foundation-colors" className="space-y-5">
          <div className="space-y-1">
            <h2 id="foundation-colors" className="text-2xl sm:text-3xl">
              Foundations
            </h2>
            <p className="text-muted-foreground">
              Core brand surfaces and ink colors.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDATION_COLORS.map((color) => (
              <ColorChip key={color.variable} {...color} />
            ))}
          </div>
        </section>

        <section aria-labelledby="color-scales" className="space-y-8">
          <div className="space-y-1">
            <h2 id="color-scales" className="text-2xl sm:text-3xl">
              Color scales
            </h2>
            <p className="text-muted-foreground">
              Brand primitives for deliberate one-off compositions.
            </p>
          </div>
          {COLOR_SCALES.map((scale) => (
            <ColorScale key={scale.label} {...scale} />
          ))}
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: 'Foundations/Color Palette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette = {} satisfies Story;
