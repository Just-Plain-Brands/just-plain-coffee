import type {Meta, StoryObj} from '@storybook/react-vite';
import {RulerIcon, ShieldCheckIcon, TruckIcon} from 'lucide-react';
import {useState} from 'react';

import {Button} from '~/components/ui/button';
import {cn} from '~/lib/utils';

import {ProductHighlights} from './ProductHighlights';
import {
  ProductPurchasePanel,
  ProductPurchasePanelActions,
  ProductPurchasePanelFooter,
  ProductPurchasePanelHeader,
  ProductPurchasePanelSection,
} from './ProductPurchasePanel';
import {QuantityControl} from './QuantityControl';

const MERCH_HIGHLIGHTS = [
  {
    id: 'shipping',
    icon: <TruckIcon />,
    label: 'Free shipping',
    description: 'Orders over $40',
  },
  {
    id: 'quality',
    icon: <ShieldCheckIcon />,
    label: 'Built to last',
    description: 'Heavyweight cotton',
  },
] as const;

function OptionButtons({
  options,
  selected,
}: {
  options: readonly string[];
  selected: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          aria-pressed={option === selected}
          className={cn(
            'min-w-16 rounded-full border px-4 py-3 text-sm font-bold transition',
            option === selected
              ? 'border-neutral-900 bg-neutral-900 text-neutral-100'
              : 'border-neutral-300 bg-neutral-100 hover:border-neutral-900',
          )}
          key={option}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function PurchaseActions({label}: {label: string}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <ProductPurchasePanelActions>
      <QuantityControl onChange={setQuantity} value={quantity} />
      <Button className="h-14 flex-1 rounded-full bg-neutral-900 px-6 text-base text-neutral-100 hover:bg-neutral-700">
        {label}
      </Button>
    </ProductPurchasePanelActions>
  );
}

function CoffeePanel() {
  return (
    <ProductPurchasePanel>
      <ProductPurchasePanelHeader
        eyebrow="Just Plain Coffee · 004"
        meta={
          <a className="font-semibold underline" href="#reviews">
            ★★★★★ 48 reviews
          </a>
        }
        price="$18"
        title="Good Coffee"
      >
        Balanced, dependable, and very easy to drink. The bag you reach for
        every morning.
      </ProductPurchasePanelHeader>
      <ProductPurchasePanelSection label="Grind — Whole bean">
        <OptionButtons
          options={['Whole bean', 'Drip', 'French press']}
          selected="Whole bean"
        />
      </ProductPurchasePanelSection>
      <ProductPurchasePanelSection label="Purchase option">
        <div className="grid gap-3">
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-900 bg-neutral-100 p-4 ring-1 ring-neutral-900">
            <span className="flex items-center gap-3 font-bold">
              <input defaultChecked name="coffee-purchase" type="radio" />
              One-time purchase
            </span>
            <span className="font-bold">$18</span>
          </label>
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-300 bg-neutral-100 p-4">
            <span className="flex items-center gap-3">
              <input name="coffee-purchase" type="radio" />
              <span>
                <strong className="block">Subscribe &amp; save</strong>
                <span className="text-sm text-neutral-600">
                  15% every order
                </span>
              </span>
            </span>
            <span className="font-bold">$15.30</span>
          </label>
        </div>
      </ProductPurchasePanelSection>
      <PurchaseActions label="Add to cart · $18" />
    </ProductPurchasePanel>
  );
}

function ApparelPanel({
  description = 'Heavyweight cotton. Relaxed cut. A shirt, not a personality.',
  showReviews = true,
}: {
  description?: string;
  showReviews?: boolean;
}) {
  return (
    <ProductPurchasePanel>
      <ProductPurchasePanelHeader
        eyebrow="Just Plain Merch · 001"
        meta={
          showReviews ? (
            <a className="font-semibold underline" href="#reviews">
              ★★★★★ 12 reviews
            </a>
          ) : undefined
        }
        price="$38"
        title="The Plain Tee"
      >
        {description}
      </ProductPurchasePanelHeader>
      <ProductPurchasePanelSection label="Color — Ink">
        <div className="flex gap-3">
          {[
            ['Oat', '#e9ddc7'],
            ['Ink', '#2e2b25'],
            ['Clay', '#b2622d'],
          ].map(([label, color]) => (
            <button
              aria-label={`Select ${label}`}
              aria-pressed={label === 'Ink'}
              className={cn(
                'grid size-12 place-items-center rounded-full border-2',
                label === 'Ink' ? 'border-neutral-900' : 'border-transparent',
              )}
              key={label}
              type="button"
            >
              <span
                className="size-9 rounded-full border border-neutral-900/15"
                style={{backgroundColor: color}}
              />
            </button>
          ))}
        </div>
      </ProductPurchasePanelSection>
      <ProductPurchasePanelSection
        action={
          <button
            className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-4"
            type="button"
          >
            <RulerIcon className="size-4" /> Size guide
          </button>
        }
        label="Size — M"
      >
        <OptionButtons
          options={['XS', 'S', 'M', 'L', 'XL', '2XL']}
          selected="M"
        />
      </ProductPurchasePanelSection>
      <PurchaseActions label="Add to cart · $38" />
      <ProductPurchasePanelFooter>
        <ProductHighlights items={MERCH_HIGHLIGHTS} />
      </ProductPurchasePanelFooter>
    </ProductPurchasePanel>
  );
}

const meta = {
  title: 'Product/Product Purchase Panel',
  component: ProductPurchasePanel,
  args: {
    children: null,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[600px] rounded-4xl bg-background p-5 shadow-soft sm:p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductPurchasePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CoffeeProduct = {
  render: () => <CoffeePanel />,
} satisfies Story;

export const ApparelProduct = {
  render: () => <ApparelPanel />,
} satisfies Story;

export const WithoutReviews = {
  render: () => <ApparelPanel showReviews={false} />,
} satisfies Story;

export const LongDescription = {
  render: () => (
    <ApparelPanel description="A substantial garment-dyed tee with a relaxed unisex fit, reinforced shoulder seams, a bound collar, and a small water-based chest print designed to soften naturally with every wash and wear." />
  ),
} satisfies Story;

export const Mobile = {
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <ApparelPanel />,
} satisfies Story;
