import {Image} from '@shopify/hydrogen';
import {useState} from 'react';
import {Link} from 'react-router';
import type {CoffeeProductCardFragment} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/cart/AddToCartButton';
import {CartonIllustration} from '~/components/catalog/carton-illustration/carton-illustration';
import {buttonVariants} from '~/components/ui/button';
import {
  getProductPresentation,
  ROAST_IDS,
  type RoastPresentation,
} from '~/lib/coffee/presentation';
import {cn} from '~/lib/utils';

interface HeroSelection {
  product: CoffeeProductCardFragment;
  presentation: RoastPresentation;
}

export function HomeHero({products}: {products: CoffeeProductCardFragment[]}) {
  const selections = products
    .map((product) => ({
      product,
      presentation: getProductPresentation({
        title: product.title,
        tags: product.tags,
        tagline: product.taglineMetafield?.value,
        tintColor: product.tintColorMetafield?.value,
        primaryColor: product.primaryColorMetafield?.value,
      }),
    }))
    .sort(
      (left, right) =>
        ROAST_IDS.indexOf(left.presentation.id) -
        ROAST_IDS.indexOf(right.presentation.id),
    );
  const mediumIndex = selections.findIndex(
    ({presentation}) => presentation.id === 'medium',
  );
  const [selectedIndex, setSelectedIndex] = useState(
    mediumIndex >= 0 ? mediumIndex : 0,
  );
  const selected = selections[selectedIndex] ?? null;

  if (!selected) return null;

  return (
    <HomeHeroContent
      selected={selected}
      selections={selections}
      onSelect={setSelectedIndex}
    />
  );
}

function HomeHeroContent({
  selected,
  selections,
  onSelect,
}: {
  selected: HeroSelection;
  selections: HeroSelection[];
  onSelect: (index: number) => void;
}) {
  const {open} = useAside();
  const {product, presentation} = selected;
  const variant = product.selectedOrFirstAvailableVariant;

  return (
    <section
      className="flex min-h-[720px] flex-col justify-center overflow-hidden px-5 py-8 text-center transition-colors duration-500 md:min-h-[calc(100svh-140px)] md:px-10"
      style={{backgroundColor: presentation.tintColor}}
    >
      <p className="text-sm font-bold tracking-[0.16em] text-neutral-700">
        PICK YOUR ROAST
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {selections.map((selection, index) => {
          const isSelected = selection.product.id === product.id;
          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                'flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-sm transition',
                isSelected
                  ? 'bg-neutral-900 text-neutral-100'
                  : 'bg-neutral-100 text-foreground hover:bg-neutral-200',
              )}
              key={selection.product.id}
              onClick={() => onSelect(index)}
              type="button"
            >
              <span
                className="size-3 rounded-full"
                style={{backgroundColor: selection.presentation.capColor}}
              />
              {selection.presentation.shortName}
            </button>
          );
        })}
      </div>
      <div className="relative grid min-h-96 flex-1 place-items-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-display text-[clamp(5.25rem,22vw,13rem)] leading-none select-none"
          style={{color: presentation.primaryColor}}
        >
          {presentation.shortName}.
        </div>
        <div className="relative h-[375px] w-[255px] animate-carton-bob">
          {product.featuredImage ? (
            <Image
              alt={product.featuredImage.altText ?? product.title}
              className="h-full w-full object-contain"
              data={product.featuredImage}
              loading="eager"
              sizes="255px"
            />
          ) : (
            <CartonIllustration className="origin-top-left scale-75" />
          )}
        </div>
      </div>
      <p className="mx-auto mt-5 mb-5 max-w-[56ch] text-lg text-neutral-700">
        {presentation.tagline} Specialty grade, single origin. Roasted to order.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <AddToCartButton
          className="h-13 px-7 text-base"
          disabled={!variant?.availableForSale}
          lines={
            variant
              ? [
                  {
                    merchandiseId: variant.id,
                    quantity: 1,
                    selectedVariant: variant,
                  },
                ]
              : []
          }
          onClick={() => open('cart')}
        >
          {variant?.availableForSale
            ? `Add ${presentation.shortName}`
            : 'Sold out'}
        </AddToCartButton>
        <Link
          className={buttonVariants({
            className: 'h-13 rounded-full px-7 text-base',
            variant: 'outline',
          })}
          prefetch="intent"
          to={`/products/${product.handle}`}
        >
          Details
        </Link>
      </div>
    </section>
  );
}
