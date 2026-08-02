import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {ProductSellingPlanAllocationFragment} from 'storefrontapi.generated';

import {getSellingPlanPrice} from '~/lib/shopify/subscriptions';

export function ProductPrice({
  price,
  compareAtPrice,
  sellingPlanAllocation,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  sellingPlanAllocation?: ProductSellingPlanAllocationFragment | null;
}) {
  const sellingPlanPrice = sellingPlanAllocation
    ? getSellingPlanPrice(sellingPlanAllocation)
    : null;
  const effectivePrice = sellingPlanPrice ?? price;
  const effectiveCompareAtPrice = sellingPlanPrice
    ? sellingPlanAllocation?.priceAdjustments[0]?.compareAtPrice
    : compareAtPrice;

  return (
    <div aria-label="Price" className="inline-flex gap-3" role="group">
      {effectiveCompareAtPrice ? (
        <div className="inline-flex gap-3">
          {effectivePrice ? <Money data={effectivePrice} /> : null}
          <s className="text-neutral-600">
            <Money data={effectiveCompareAtPrice} />
          </s>
        </div>
      ) : effectivePrice ? (
        <Money data={effectivePrice} />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
