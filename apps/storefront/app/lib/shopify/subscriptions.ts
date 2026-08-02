import type {ProductSellingPlanAllocationFragment} from 'storefrontapi.generated';

export const SELLING_PLAN_PARAM = 'selling_plan';

export type PurchaseSelection =
  | {kind: 'one-time'}
  | {
      kind: 'subscription';
      allocation: ProductSellingPlanAllocationFragment;
    };

type ProductSellingPlan = ProductSellingPlanAllocationFragment['sellingPlan'];

export function getSellingPlanLabel(
  sellingPlan: Pick<ProductSellingPlan, 'name' | 'options'>,
): string {
  const optionValues = sellingPlan.options
    .map((option) => option.value?.trim() ?? '')
    .filter(Boolean);

  if (optionValues.length === 0) return sellingPlan.name;

  return optionValues
    .map((value) => `Every ${value.replace(/^(?:deliver\s+)?every\s+/i, '')}`)
    .join(' · ');
}

export function getDefaultSellingPlanAllocation(
  allocations: ProductSellingPlanAllocationFragment[],
): ProductSellingPlanAllocationFragment | null {
  return (
    allocations.find((allocation) =>
      /\b4 weeks?\b/i.test(getSellingPlanLabel(allocation.sellingPlan)),
    ) ??
    allocations[0] ??
    null
  );
}

export function getSellingPlanPrice(
  allocation: ProductSellingPlanAllocationFragment,
) {
  return allocation.priceAdjustments[0]?.price ?? null;
}

export function getSellingPlanSavingsPercentage(
  allocation: ProductSellingPlanAllocationFragment,
): number | null {
  const priceAdjustment = allocation.priceAdjustments[0];
  if (!priceAdjustment) return null;

  const compareAtPrice = Number(priceAdjustment.compareAtPrice.amount);
  const price = Number(priceAdjustment.price.amount);

  if (
    !Number.isFinite(compareAtPrice) ||
    compareAtPrice <= 0 ||
    price >= compareAtPrice
  ) {
    return null;
  }

  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
