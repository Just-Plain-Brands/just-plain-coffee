import {ROAST_IDS, type RoastId} from './presentation';

interface RoastProductIdentity {
  id: string;
  tags: readonly string[];
}

export function getCompleteRoastRange<Product extends RoastProductIdentity>(
  products: readonly Product[],
): Product[] {
  return isCompleteRoastRange(products) ? [...products] : [];
}

function isCompleteRoastRange<Product extends RoastProductIdentity>(
  products: readonly Product[],
): boolean {
  if (products.length !== ROAST_IDS.length) return false;
  if (new Set(products.map(({id}) => id)).size !== products.length) {
    return false;
  }

  const roastIds = new Set<RoastId>();

  for (const product of products) {
    const roastId = getTaggedRoastId(product.tags);

    if (!roastId || roastIds.has(roastId)) return false;
    roastIds.add(roastId);
  }

  return ROAST_IDS.every((roastId) => roastIds.has(roastId));
}

function getTaggedRoastId(tags: readonly string[]): RoastId | null {
  const matches = tags.map((tag) => tag.toLowerCase()).filter(isRoastId);

  return matches.length === 1 ? matches[0] : null;
}

function isRoastId(value: string): value is RoastId {
  return ROAST_IDS.some((roastId) => roastId === value);
}
