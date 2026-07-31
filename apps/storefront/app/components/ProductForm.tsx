import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {Link, useNavigate} from 'react-router';
import type {ProductFragment} from 'storefrontapi.generated';

import {cn} from '~/lib/utils';

import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  return (
    <div>
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <fieldset className="mb-6" key={option.name}>
            <legend className="mb-3 text-sm font-bold tracking-[0.1em] uppercase">
              {option.name}
            </legend>
            <div className="flex flex-wrap gap-2">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className={cn(
                        'min-w-20 rounded-full border px-4 py-2 text-center text-sm font-bold transition',
                        selected
                          ? 'border-neutral-900 bg-neutral-900 text-neutral-100'
                          : 'border-neutral-300 bg-background hover:border-neutral-900',
                        !available && 'opacity-40',
                      )}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={cn(
                        'min-w-20 rounded-full border px-4 py-2 text-sm font-bold transition',
                        selected
                          ? 'border-neutral-900 bg-neutral-900 text-neutral-100'
                          : 'border-neutral-300 bg-background hover:border-neutral-900',
                        !available && 'opacity-40',
                      )}
                      key={option.name + name}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
          </fieldset>
        );
      })}
      <AddToCartButton
        className="h-13 w-full text-base"
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="size-4 rounded-full border border-neutral-300 bg-cover bg-center"
        style={{
          backgroundColor: color || 'transparent',
          backgroundImage: image ? `url(${image})` : undefined,
        }}
      />
      <span>{name}</span>
    </div>
  );
}
