import {Money, type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  MoneyV2,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {useId} from 'react';
import {Link, useNavigate} from 'react-router';
import type {
  ProductFragment,
  ProductSellingPlanAllocationFragment,
} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/cart/AddToCartButton';
import {QuantityControl} from '~/components/product/QuantityControl';
import {Button, buttonVariants} from '~/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '~/components/ui/field';
import {RadioGroup, RadioGroupItem} from '~/components/ui/radio-group';
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
  quantity,
  sellingPlanAllocations,
  selectedVariant,
  onPurchaseSelectionChange,
}: {
  productOptions: MappedProductOptions[];
  purchaseSelection: PurchaseSelection;
  quantity?: {
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    value: number;
  };
  sellingPlanAllocations: ProductSellingPlanAllocationFragment[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  onPurchaseSelectionChange: (sellingPlanId: string | null) => void;
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const addToCartLine = selectedVariant
    ? {
        merchandiseId: selectedVariant.id,
        quantity: quantity?.value ?? 1,
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

        const selectedValue = option.optionValues.find(
          (value) => value.selected,
        )?.name;

        return (
          <fieldset className="mb-6" key={option.name}>
            <legend className="mb-3 text-sm font-bold tracking-[0.1em] uppercase">
              {option.name}
              {selectedValue ? ` — ${selectedValue}` : null}
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
                        buttonVariants({
                          variant: selected ? 'default' : 'outline',
                        }),
                        'h-10 min-w-20 rounded-full px-4 text-center font-bold',
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
                    <Button
                      aria-pressed={selected}
                      type="button"
                      className={cn(
                        'h-10 min-w-20 rounded-full px-4 font-bold',
                        selected
                          ? 'border-neutral-900 bg-neutral-900 text-neutral-100'
                          : 'border-neutral-300 bg-background hover:border-neutral-900',
                        !available && 'opacity-40',
                      )}
                      key={option.name + name}
                      disabled={!exists}
                      variant={selected ? 'default' : 'outline'}
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
                    </Button>
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
      <div className={cn(quantity && 'flex flex-col gap-3 sm:flex-row')}>
        {quantity ? (
          <QuantityControl
            max={quantity.max}
            min={quantity.min}
            onChange={quantity.onChange}
            value={quantity.value}
          />
        ) : null}
        <AddToCartButton
          className={cn('h-13 w-full text-base', quantity && 'flex-1')}
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
  const purchaseOptionId = useId();
  const defaultAllocation = getDefaultSellingPlanAllocation(allocations);
  if (!defaultAllocation) return null;

  const selectedAllocation =
    selection.kind === 'subscription'
      ? selection.allocation
      : defaultAllocation;
  const subscriptionPrice = getSellingPlanPrice(selectedAllocation);
  const savings = getSellingPlanSavingsPercentage(selectedAllocation);
  const isSubscription = selection.kind === 'subscription';
  const purchaseOption = isSubscription ? 'subscription' : 'one-time';

  return (
    <FieldSet className="mb-6 gap-3">
      <FieldLegend
        className="mb-0 text-sm font-bold tracking-[0.1em] uppercase"
        variant="label"
      >
        Purchase option
      </FieldLegend>
      <RadioGroup
        className="gap-3"
        onValueChange={(value) => {
          onChange(
            value === 'subscription' ? defaultAllocation.sellingPlan.id : null,
          );
        }}
        value={purchaseOption}
      >
        <Field
          className={cn(
            'items-center rounded-2xl border bg-background p-4 transition',
            !isSubscription
              ? 'border-neutral-900 ring-1 ring-neutral-900'
              : 'border-neutral-300 hover:border-neutral-500',
          )}
          orientation="horizontal"
        >
          <RadioGroupItem
            id={`${purchaseOptionId}-one-time`}
            value="one-time"
          />
          <FieldLabel
            className="min-w-0 flex-1 cursor-pointer items-center justify-between gap-4"
            htmlFor={`${purchaseOptionId}-one-time`}
          >
            <FieldContent>
              <FieldTitle className="font-bold">One-time purchase</FieldTitle>
            </FieldContent>
            <Money className="font-bold" data={variantPrice} />
          </FieldLabel>
        </Field>

        <Field
          className={cn(
            'items-center rounded-2xl border bg-background p-4 transition',
            isSubscription
              ? 'border-orange-700 ring-1 ring-orange-700'
              : 'border-neutral-300 hover:border-orange-500',
          )}
          orientation="horizontal"
        >
          <RadioGroupItem
            className="data-checked:border-orange-700 data-checked:bg-orange-700"
            id={`${purchaseOptionId}-subscription`}
            value="subscription"
          />
          <FieldLabel
            className="min-w-0 flex-1 cursor-pointer items-center justify-between gap-4"
            htmlFor={`${purchaseOptionId}-subscription`}
          >
            <FieldContent>
              <FieldTitle className="font-bold">
                Subscribe &amp; save
              </FieldTitle>
              <FieldDescription className="text-neutral-600">
                {savings ? `${savings}% off every order` : 'Recurring delivery'}
              </FieldDescription>
            </FieldContent>
            {subscriptionPrice ? (
              <span className="shrink-0 text-right">
                <Money className="block font-bold" data={subscriptionPrice} />
                <s className="text-sm text-neutral-500">
                  <Money data={variantPrice} />
                </s>
              </span>
            ) : null}
          </FieldLabel>
        </Field>
      </RadioGroup>

      {isSubscription ? (
        <FieldSet className="mt-1 gap-2">
          <FieldLegend className="mb-0 text-sm font-bold" variant="label">
            Deliver it
          </FieldLegend>
          <RadioGroup
            className="grid grid-cols-3 gap-2"
            onValueChange={onChange}
            value={selection.allocation.sellingPlan.id}
          >
            {allocations.map((allocation) => {
              const sellingPlanId = allocation.sellingPlan.id;

              return (
                <RadioGroupItem
                  className="aspect-auto h-10 w-full min-w-0 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-background px-3 text-center text-sm font-bold transition after:inset-0 hover:border-neutral-900 data-checked:border-neutral-900 data-checked:bg-neutral-900 data-checked:text-neutral-100 [&_[data-slot=radio-group-indicator]]:hidden"
                  key={sellingPlanId}
                  value={sellingPlanId}
                >
                  {getSellingPlanLabel(allocation.sellingPlan)}
                </RadioGroupItem>
              );
            })}
          </RadioGroup>
          <FieldDescription className="mt-1 text-neutral-600">
            Renews automatically. Cancel from your account.
          </FieldDescription>
        </FieldSet>
      ) : null}
    </FieldSet>
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
