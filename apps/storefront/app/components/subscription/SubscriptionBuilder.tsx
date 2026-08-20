import {Image, Money} from '@shopify/hydrogen';
import type {
  Image as ShopifyImage,
  MoneyV2,
  Product,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import {useId, useState} from 'react';
import type {ProductSellingPlanAllocationFragment} from 'storefrontapi.generated';

import {CartonIllustration} from '~/components/catalog/carton-illustration/carton-illustration';
import {QuantityControl} from '~/components/product/QuantityControl';
import {FieldLegend, FieldSet} from '~/components/ui/field';
import type {ProductPresentation} from '~/lib/coffee/presentation';
import {
  getDefaultSellingPlanAllocation,
  getSellingPlanLabel,
  getSellingPlanPrice,
  getSellingPlanSavingsPercentage,
} from '~/lib/shopify/subscriptions';
import {cn} from '~/lib/utils';

type SubscriptionProductImage = Pick<
  ShopifyImage,
  'id' | 'altText' | 'height' | 'url' | 'width'
>;

interface SubscriptionProductVariant {
  availableForSale: boolean;
  id: string;
  price: MoneyV2;
  product: Pick<Product, 'handle' | 'title'>;
  selectedOptions: Array<Pick<SelectedOption, 'name' | 'value'>>;
  sellingPlanAllocations: {
    nodes: ProductSellingPlanAllocationFragment[];
  };
}

export interface SubscriptionBuilderProduct {
  availableForSale: boolean;
  featuredImage?: SubscriptionProductImage | null;
  id: string;
  presentation: ProductPresentation;
  selectedOrFirstAvailableVariant?: SubscriptionProductVariant | null;
}

export type SubscriptionBuilderSelection =
  | {
      status: 'ready';
      allocation: ProductSellingPlanAllocationFragment;
      product: SubscriptionBuilderProduct;
      quantity: number;
      totalPrice: MoneyV2;
      variant: SubscriptionProductVariant;
    }
  | {status: 'unavailable'};

interface SubscriptionBuilderProps {
  initialProductId?: string;
  initialQuantity?: number;
  products: SubscriptionBuilderProduct[];
  renderAction: (selection: SubscriptionBuilderSelection) => React.ReactNode;
}

const MAX_QUANTITY = 3;
const CUPS_PER_CARTON = 20;
const CARTON_STACK = [
  {id: 'front', className: 'z-30 -rotate-2'},
  {id: 'right', className: 'z-20 ml-12 rotate-6'},
  {id: 'left', className: 'z-10 -ml-12 -rotate-7'},
] as const;

export function SubscriptionBuilder({
  initialProductId,
  initialQuantity = 1,
  products,
  renderAction,
}: SubscriptionBuilderProps) {
  const defaultProduct = getDefaultProduct(products, initialProductId);
  const [selectedProductId, setSelectedProductId] = useState(
    () => defaultProduct?.id ?? '',
  );
  const [selectedSellingPlanId, setSelectedSellingPlanId] = useState(
    () => getDefaultAllocation(defaultProduct)?.sellingPlan.id ?? '',
  );
  const [quantity, setQuantity] = useState(() =>
    clampQuantity(initialQuantity),
  );

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ??
    defaultProduct;
  const selectedVariant = selectedProduct?.selectedOrFirstAvailableVariant;
  const allocations = selectedVariant?.sellingPlanAllocations.nodes ?? [];
  const selectedAllocation =
    allocations.find(
      (allocation) => allocation.sellingPlan.id === selectedSellingPlanId,
    ) ?? getDefaultSellingPlanAllocation(allocations);
  const selection = getBuilderSelection({
    allocation: selectedAllocation,
    product: selectedProduct,
    quantity,
    variant: selectedVariant,
  });

  if (!selectedProduct) {
    return <EmptySubscriptionBuilder renderAction={renderAction} />;
  }

  const {presentation} = selectedProduct;
  const intervalWeeks = selectedAllocation
    ? getSellingPlanIntervalWeeks(selectedAllocation)
    : null;
  const cupsPerWeek = intervalWeeks
    ? Math.round((quantity * CUPS_PER_CARTON) / intervalWeeks)
    : null;
  const savings = selectedAllocation
    ? getSellingPlanSavingsPercentage(selectedAllocation)
    : null;
  const currentPrice =
    selection.status === 'ready' ? selection.totalPrice : null;

  function selectProduct(productId: string) {
    const nextProduct = products.find((product) => product.id === productId);
    if (!nextProduct || !isSubscriptionReady(nextProduct)) return;

    const currentLabel = selectedAllocation
      ? getSellingPlanLabel(selectedAllocation.sellingPlan)
      : null;
    const nextAllocations =
      nextProduct.selectedOrFirstAvailableVariant?.sellingPlanAllocations
        .nodes ?? [];
    const matchingAllocation = currentLabel
      ? nextAllocations.find(
          (allocation) =>
            getSellingPlanLabel(allocation.sellingPlan) === currentLabel,
        )
      : null;
    const nextAllocation =
      matchingAllocation ?? getDefaultSellingPlanAllocation(nextAllocations);

    setSelectedProductId(productId);
    setSelectedSellingPlanId(nextAllocation?.sellingPlan.id ?? '');
  }

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 pt-6 pb-16 md:px-10 md:pt-8 md:pb-24">
      <div className="grid gap-4 pb-6 md:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] md:items-end md:gap-10 md:pb-8">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-orange-700 uppercase">
            Three choices. No mystery.
          </p>
          <h1 className="text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">
            Build your box.
          </h1>
        </div>
        <p className="max-w-lg text-base leading-relaxed text-neutral-700 md:justify-self-end">
          Pick a roast, delivery pace, and carton count. We’ll update the order
          and shipment price as you go.
        </p>
      </div>

      <div className="grid rounded-4xl bg-neutral-100 shadow-soft xl:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.4fr)] xl:overflow-hidden">
        <BuilderPreview
          product={selectedProduct}
          quantity={quantity}
          selectedAllocation={selectedAllocation}
        />

        <div className="order-1 flex min-w-0 flex-col px-5 py-2 sm:px-8 xl:order-2 xl:px-10">
          <div className="order-2 xl:order-1">
            <RoastSelectionStep
              onSelect={selectProduct}
              products={products}
              selectedProductId={selectedProduct.id}
            />
            <FrequencySelectionStep
              allocations={allocations}
              onSelect={setSelectedSellingPlanId}
              selectedAllocation={selectedAllocation}
            />
            <QuantitySelectionStep onChange={setQuantity} quantity={quantity} />
          </div>

          <div className="order-1 mt-4 flex flex-col gap-4 rounded-3xl bg-green-900 p-4 text-green-100 sm:max-xl:sticky sm:max-xl:top-20 sm:max-xl:z-20 xl:order-2 xl:my-5 xl:p-6">
            <div className="sm:flex sm:items-center sm:justify-between sm:gap-5">
              <div className="mb-3 min-w-0 sm:mb-0">
                <p className="text-[0.68rem] font-bold tracking-[0.12em] text-green-300 uppercase">
                  Your recurring order
                </p>
                <p className="mt-1 truncate text-sm font-bold">
                  {getCartonLabel(quantity)} · {presentation.shortName} ·{' '}
                  {selectedAllocation
                    ? getSellingPlanLabel(selectedAllocation.sellingPlan)
                    : 'Schedule unavailable'}
                </p>
                <p className="mt-1 text-xs text-green-300">
                  {cupsPerWeek ? `About ${cupsPerWeek} cups/week` : null}
                  {cupsPerWeek && savings ? ' · ' : null}
                  {savings ? `Save ${savings}% each shipment` : null}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="sm:text-right">
                  <strong className="block font-display text-3xl font-normal">
                    {currentPrice ? <Money data={currentPrice} /> : '—'}
                  </strong>
                  <span className="text-xs text-green-300">per shipment</span>
                </div>
              </div>
            </div>
            <div className="w-full">{renderAction(selection)}</div>
          </div>

          <p className="order-3 px-2 pb-8 text-center text-xs leading-relaxed text-neutral-600">
            Renews automatically at the selected interval. Skip or cancel from
            your account.
          </p>
        </div>
      </div>
    </section>
  );
}

function BuilderPreview({
  product,
  quantity,
  selectedAllocation,
}: {
  product: SubscriptionBuilderProduct;
  quantity: number;
  selectedAllocation: ProductSellingPlanAllocationFragment | null;
}) {
  const {presentation} = product;
  const frequency = selectedAllocation
    ? getSellingPlanLabel(selectedAllocation.sellingPlan)
    : 'Subscription unavailable';

  return (
    <aside
      className="order-2 min-h-[400px] overflow-hidden rounded-b-4xl p-6 transition-colors duration-300 sm:p-8 xl:order-1 xl:min-h-[720px] xl:rounded-none"
      style={{backgroundColor: presentation.tintColor}}
    >
      <div className="flex min-h-[352px] flex-col xl:sticky xl:top-24 xl:min-h-[656px]">
        <p className="text-xs font-bold tracking-[0.14em] text-neutral-700 uppercase">
          Your box, live
        </p>
        <h2
          aria-live="polite"
          className="mt-2 max-w-[13ch] text-4xl leading-[0.94] sm:text-5xl"
        >
          {`${presentation.shortName}. ${getCartonLabel(quantity)}. ${frequency}.`}
        </h2>

        <div
          aria-hidden="true"
          className="relative mt-5 min-h-64 flex-1 sm:min-h-72"
        >
          {CARTON_STACK.slice(0, quantity).map((carton) => (
            <div
              className={cn(
                'absolute bottom-0 left-1/2 h-[285px] w-[175px] -translate-x-1/2 transform-gpu transition-transform duration-300 sm:h-[330px] sm:w-[205px]',
                carton.className,
              )}
              key={carton.id}
            >
              {product.featuredImage ? (
                <Image
                  alt=""
                  className="h-full w-full object-contain drop-shadow-[10px_14px_8px_rgb(46_43_37_/_0.18)]"
                  data={product.featuredImage}
                  sizes="220px"
                />
              ) : (
                <CartonIllustration className="origin-top-left scale-[0.68] drop-shadow-[10px_14px_8px_rgb(46_43_37_/_0.18)] sm:scale-[0.78]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function RoastSelectionStep({
  onSelect,
  products,
  selectedProductId,
}: {
  onSelect: (productId: string) => void;
  products: SubscriptionBuilderProduct[];
  selectedProductId: string;
}) {
  const groupName = useId();

  return (
    <BuilderStep
      description="All specialty grade. All roasted to order."
      number="01"
      title="Pick a roast."
    >
      <FieldSet>
        <FieldLegend className="sr-only">Roast</FieldLegend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {products.map((product) => {
            const isSelected = product.id === selectedProductId;
            const isDisabled = !isSubscriptionReady(product);

            return (
              <label
                aria-label={`${product.presentation.shortName}. ${getShortTagline(product.presentation)}`}
                className={cn(
                  'relative flex min-h-32 w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background text-left transition has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50 sm:min-h-36',
                  isSelected
                    ? 'border-neutral-900 ring-1 ring-neutral-900'
                    : 'border-neutral-300 hover:border-neutral-600',
                  isDisabled && 'cursor-not-allowed opacity-45',
                )}
                key={product.id}
              >
                <input
                  aria-label={`${product.presentation.shortName}. ${getShortTagline(product.presentation)}`}
                  checked={isSelected}
                  className="sr-only"
                  disabled={isDisabled}
                  name={groupName}
                  onChange={() => onSelect(product.id)}
                  type="radio"
                  value={product.id}
                />
                <span
                  style={{backgroundColor: product.presentation.capColor}}
                  className="h-10 w-full"
                ></span>
                <span className="flex w-full flex-col p-4">
                  <strong className="font-bold">
                    {product.presentation.shortName}
                  </strong>
                  <span className="text-xs leading-normal font-normal text-neutral-700">
                    {getShortTagline(product.presentation)}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </FieldSet>
    </BuilderStep>
  );
}

function FrequencySelectionStep({
  allocations,
  onSelect,
  selectedAllocation,
}: {
  allocations: ProductSellingPlanAllocationFragment[];
  onSelect: (sellingPlanId: string) => void;
  selectedAllocation: ProductSellingPlanAllocationFragment | null;
}) {
  const groupName = useId();

  return (
    <BuilderStep
      description="Shorter timing suits a daily routine. Longer timing suits a slower cupboard."
      number="02"
      title="Set the pace."
    >
      {allocations.length > 0 ? (
        <FieldSet>
          <FieldLegend className="sr-only">Delivery frequency</FieldLegend>
          <div className="grid gap-2 sm:grid-cols-3">
            {allocations.map((allocation) => {
              const sellingPlanId = allocation.sellingPlan.id;
              const isSelected =
                sellingPlanId === selectedAllocation?.sellingPlan.id;
              const weeks = getSellingPlanIntervalWeeks(allocation);

              return (
                <label
                  aria-label={`${getSellingPlanLabel(allocation.sellingPlan)}. ${getFrequencyDescription(weeks)}`}
                  className={cn(
                    'relative flex min-h-40 w-full cursor-pointer rounded-2xl border px-4 py-10 text-left transition has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50 sm:min-h-44 xl:min-h-48',
                    isSelected
                      ? 'border-green-900 bg-green-200 ring-1 ring-green-900'
                      : 'border-neutral-300 bg-background hover:border-green-700',
                  )}
                  key={sellingPlanId}
                >
                  <input
                    aria-label={`${getSellingPlanLabel(allocation.sellingPlan)}. ${getFrequencyDescription(weeks)}`}
                    checked={isSelected}
                    className="sr-only"
                    name={groupName}
                    onChange={() => onSelect(sellingPlanId)}
                    type="radio"
                    value={sellingPlanId}
                  />
                  <span className="flex w-full flex-col">
                    <span className="pr-7 text-[0.68rem] font-bold tracking-[0.11em] text-green-700 uppercase">
                      {getFrequencyKicker(weeks)}
                    </span>
                    <strong className="mt-1 font-display text-xl font-normal">
                      {getSellingPlanLabel(allocation.sellingPlan)}
                    </strong>
                    <span className="mt-auto text-xs leading-normal font-normal text-neutral-700">
                      {getFrequencyDescription(weeks)}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 grid size-4 place-items-center rounded-full border border-green-700"
                  >
                    {isSelected ? (
                      <span className="size-2 rounded-full bg-green-900" />
                    ) : null}
                  </span>
                </label>
              );
            })}
          </div>
        </FieldSet>
      ) : (
        <p className="rounded-2xl bg-orange-100 p-4 text-sm text-orange-900">
          This roast does not have a subscription schedule right now.
        </p>
      )}
    </BuilderStep>
  );
}

function QuantitySelectionStep({
  onChange,
  quantity,
}: {
  onChange: (quantity: number) => void;
  quantity: number;
}) {
  return (
    <BuilderStep
      description="Each 12 oz carton makes roughly 20 brewed cups."
      number="03"
      title="Count the cartons."
    >
      <div className="grid gap-4 rounded-2xl border border-neutral-300 bg-background p-4 sm:grid-cols-[auto_1fr] sm:items-center sm:p-5">
        <QuantityControl
          ariaLabel="Cartons per delivery"
          className="sm:w-40"
          max={MAX_QUANTITY}
          onChange={onChange}
          value={quantity}
        />
        <div>
          <strong className="block text-sm">
            {getQuantityGuidance(quantity)}
          </strong>
          <p className="mt-1 text-sm text-neutral-700">
            {getCartonLabel(quantity)} · about {quantity * CUPS_PER_CARTON}{' '}
            brewed cups per shipment.
          </p>
        </div>
      </div>
    </BuilderStep>
  );
}

function EmptySubscriptionBuilder({
  renderAction,
}: Pick<SubscriptionBuilderProps, 'renderAction'>) {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-20 text-center md:px-10 md:py-28">
      <p className="text-xs font-bold tracking-[0.16em] text-orange-700 uppercase">
        Subscriptions
      </p>
      <h1 className="mt-3 text-6xl leading-none md:text-8xl">
        The box is resting.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-700">
        Subscription options are temporarily unavailable. Check back soon or
        shop the current coffee range.
      </p>
      <div className="mx-auto mt-8 max-w-64">
        {renderAction({status: 'unavailable'})}
      </div>
    </section>
  );
}

function BuilderStep({
  children,
  description,
  number,
  title,
}: {
  children: React.ReactNode;
  description: string;
  number: string;
  title: string;
}) {
  return (
    <section className="border-b border-neutral-300 py-8 sm:py-10">
      <div className="mb-5 grid gap-2 sm:grid-cols-[auto_1fr_minmax(180px,0.8fr)] sm:items-baseline sm:gap-3">
        <span className="font-display text-2xl text-primary">{number}</span>
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        <p className="text-sm leading-relaxed text-neutral-700 sm:text-right">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function getBuilderSelection({
  allocation,
  product,
  quantity,
  variant,
}: {
  allocation: ProductSellingPlanAllocationFragment | null;
  product: SubscriptionBuilderProduct | undefined;
  quantity: number;
  variant: SubscriptionProductVariant | null | undefined;
}): SubscriptionBuilderSelection {
  if (
    !allocation ||
    !product ||
    !variant?.availableForSale ||
    !product.availableForSale
  ) {
    return {status: 'unavailable'};
  }

  const price = getSellingPlanPrice(allocation) ?? variant.price;

  return {
    status: 'ready',
    allocation,
    product,
    quantity,
    totalPrice: {
      amount: multiplyMoneyAmount(price.amount, quantity),
      currencyCode: price.currencyCode,
    },
    variant,
  };
}

function getDefaultProduct(
  products: SubscriptionBuilderProduct[],
  initialProductId: string | undefined,
) {
  const requestedProduct = products.find(
    (product) => product.id === initialProductId,
  );
  if (requestedProduct && isSubscriptionReady(requestedProduct)) {
    return requestedProduct;
  }

  return (
    products.find(
      (product) =>
        product.presentation.id === 'medium' && isSubscriptionReady(product),
    ) ??
    products.find(isSubscriptionReady) ??
    products[0]
  );
}

function getDefaultAllocation(
  product: SubscriptionBuilderProduct | undefined,
): ProductSellingPlanAllocationFragment | null {
  return getDefaultSellingPlanAllocation(
    product?.selectedOrFirstAvailableVariant?.sellingPlanAllocations.nodes ??
      [],
  );
}

function isSubscriptionReady(product: SubscriptionBuilderProduct): boolean {
  const variant = product.selectedOrFirstAvailableVariant;

  return Boolean(
    product.availableForSale &&
    variant?.availableForSale &&
    variant.sellingPlanAllocations.nodes.length > 0,
  );
}

function getSellingPlanIntervalWeeks(
  allocation: ProductSellingPlanAllocationFragment,
): number | null {
  const label = getSellingPlanLabel(allocation.sellingPlan);
  const weekMatch = label.match(/\b(\d+)\s*weeks?\b/i);
  if (weekMatch?.[1]) return Number(weekMatch[1]);

  const monthMatch = label.match(/\b(\d+)\s*months?\b/i);
  if (monthMatch?.[1]) return Number(monthMatch[1]) * 4;

  return null;
}

function getFrequencyKicker(weeks: number | null): string {
  if (!weeks) return 'Flexible pace';
  if (weeks <= 2) return 'Regular brewing';
  if (weeks <= 4) return 'Slower pace';
  return 'Occasional';
}

function getFrequencyDescription(weeks: number | null): string {
  if (!weeks) return 'A recurring delivery from the current coffee catalog.';
  if (weeks <= 2)
    return 'A solid starting point for most-days coffee drinkers.';
  if (weeks <= 4)
    return 'Good for weekends, smaller routines, or a larger box.';
  return 'Best when coffee moves slowly or the cupboard stays stocked.';
}

function getQuantityGuidance(quantity: number): string {
  if (quantity === 1) return 'A solo routine.';
  if (quantity === 2) return 'Share it or stock up.';
  return 'A busy household box.';
}

function getCartonLabel(quantity: number): string {
  return `${quantity} ${quantity === 1 ? 'carton' : 'cartons'}`;
}

function getShortTagline(presentation: ProductPresentation): string {
  return presentation.tagline
    .replace(new RegExp(`^${presentation.shortName} roast\\.\\s*`, 'i'), '')
    .replace(/^Decaf\.\s*/i, '');
}

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(Math.round(quantity), 1), MAX_QUANTITY);
}

function multiplyMoneyAmount(amount: string, quantity: number): string {
  const decimalPlaces = amount.split('.')[1]?.length ?? 0;
  return (Number(amount) * quantity).toFixed(decimalPlaces);
}
