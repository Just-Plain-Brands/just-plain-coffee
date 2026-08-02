import {Money, type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  MoneyV2,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {Link, useNavigate} from 'react-router';
import type {
  ProductFragment,
  ProductSellingPlanAllocationFragment,
} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/cart/AddToCartButton';
import {
  getDefaultSellingPlanAllocation,
  getSellingPlanLabel,
  getSellingPlanPrice,
  getSellingPlanSavingsPercentage,
  type PurchaseSelection,
} from '~/lib/shopify/subscriptions';
import {cn} from '~/lib/utils';

export function ProductForm({
  productOptions,
  purchaseSelection,
  sellingPlanAllocations,
  selectedVariant,
  onPurchaseSelectionChange,
}: {
  productOptions: MappedProductOptions[];
  purchaseSelection: PurchaseSelection;
  sellingPlanAllocations: ProductSellingPlanAllocationFragment[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  onPurchaseSelectionChange: (sellingPlanId: string | null) => void;
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const addToCartLine = selectedVariant
    ? {
        merchandiseId: selectedVariant.id,
        quantity: 1,
        selectedVariant,
        ...(purchaseSelection.kind === 'subscription'
          ? {sellingPlanId: purchaseSelection.allocation.sellingPlan.id}
          : {}),
      }
    : null;

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
      {sellingPlanAllocations.length > 0 && selectedVariant ? (
        <PurchaseOptions
          allocations={sellingPlanAllocations}
          onChange={onPurchaseSelectionChange}
          selection={purchaseSelection}
          variantPrice={selectedVariant.price}
        />
      ) : null}
      <AddToCartButton
        className="h-13 w-full text-base"
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={addToCartLine ? [addToCartLine] : []}
      >
        {selectedVariant?.availableForSale
          ? purchaseSelection.kind === 'subscription'
            ? 'Subscribe'
            : 'Add to cart'
          : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

function PurchaseOptions({
  allocations,
  onChange,
  selection,
  variantPrice,
}: {
  allocations: ProductSellingPlanAllocationFragment[];
  onChange: (sellingPlanId: string | null) => void;
  selection: PurchaseSelection;
  variantPrice: MoneyV2;
}) {
  const defaultAllocation = getDefaultSellingPlanAllocation(allocations);
  if (!defaultAllocation) return null;

  const selectedAllocation =
    selection.kind === 'subscription'
      ? selection.allocation
      : defaultAllocation;
  const subscriptionPrice = getSellingPlanPrice(selectedAllocation);
  const savings = getSellingPlanSavingsPercentage(selectedAllocation);
  const isSubscription = selection.kind === 'subscription';

  return (
    <fieldset className="mb-6">
      <legend className="mb-3 text-sm font-bold tracking-[0.1em] uppercase">
        Purchase option
      </legend>
      <div className="grid gap-3">
        <label
          className={cn(
            'flex cursor-pointer items-center justify-between gap-4 rounded-2xl border bg-background p-4 transition',
            !isSubscription
              ? 'border-neutral-900 ring-1 ring-neutral-900'
              : 'border-neutral-300 hover:border-neutral-500',
          )}
        >
          <span className="flex items-center gap-3">
            <input
              checked={!isSubscription}
              className="size-4 accent-neutral-900"
              name="purchase-option"
              onChange={() => onChange(null)}
              type="radio"
              value="one-time"
            />
            <span className="font-bold">One-time purchase</span>
          </span>
          <Money className="font-bold" data={variantPrice} />
        </label>

        <label
          className={cn(
            'flex cursor-pointer items-center justify-between gap-4 rounded-2xl border bg-background p-4 transition',
            isSubscription
              ? 'border-orange-700 ring-1 ring-orange-700'
              : 'border-neutral-300 hover:border-orange-500',
          )}
        >
          <span className="flex items-center gap-3">
            <input
              checked={isSubscription}
              className="size-4 accent-orange-700"
              name="purchase-option"
              onChange={() => onChange(defaultAllocation.sellingPlan.id)}
              type="radio"
              value="subscription"
            />
            <span>
              <span className="block font-bold">Subscribe &amp; save</span>
              <span className="text-sm text-neutral-600">
                {savings ? `${savings}% off every order` : 'Recurring delivery'}
              </span>
            </span>
          </span>
          {subscriptionPrice ? (
            <span className="text-right">
              <Money className="block font-bold" data={subscriptionPrice} />
              <s className="text-sm text-neutral-500">
                <Money data={variantPrice} />
              </s>
            </span>
          ) : null}
        </label>
      </div>

      {isSubscription ? (
        <div className="mt-4">
          <p className="mb-2 text-sm font-bold">Deliver it</p>
          <div className="grid grid-cols-3 gap-2">
            {allocations.map((allocation) => {
              const sellingPlanId = allocation.sellingPlan.id;
              const isSelected =
                selection.allocation.sellingPlan.id === sellingPlanId;

              return (
                <button
                  aria-pressed={isSelected}
                  className={cn(
                    'rounded-full border px-3 py-2 text-sm font-bold transition',
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-neutral-100'
                      : 'border-neutral-300 bg-background hover:border-neutral-900',
                  )}
                  key={sellingPlanId}
                  onClick={() => onChange(sellingPlanId)}
                  type="button"
                >
                  {getSellingPlanLabel(allocation.sellingPlan)}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            Renews automatically. Cancel from your account.
          </p>
        </div>
      ) : null}
    </fieldset>
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
