import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

interface OptimisticPricedLine {
  cost?: {
    amountPerQuantity?: MoneyV2 | null;
    totalAmount?: MoneyV2 | null;
  } | null;
  isOptimistic?: boolean;
  merchandise: {
    price: MoneyV2;
  };
  quantity: number;
}

export function getCartLineTotal(line: OptimisticPricedLine): MoneyV2 {
  const currentTotal = line.cost?.totalAmount ?? line.merchandise.price;
  if (!line.isOptimistic) return currentTotal;

  const unitPrice = line.cost?.amountPerQuantity ?? line.merchandise.price;
  return multiplyMoney(unitPrice, line.quantity);
}

export function getOptimisticCartSubtotal({
  isOptimistic,
  lines,
  subtotal,
}: {
  isOptimistic: boolean;
  lines: readonly OptimisticPricedLine[];
  subtotal?: MoneyV2 | null;
}): MoneyV2 | null {
  if (!isOptimistic) return subtotal ?? null;

  if (!subtotal) {
    return sumLineTotals(lines);
  }

  let amount = Number(subtotal.amount);
  let decimalPlaces = getDecimalPlaces(subtotal.amount);

  for (const line of lines) {
    if (!line.isOptimistic) continue;

    const nextTotal = getCartLineTotal(line);
    if (nextTotal.currencyCode !== subtotal.currencyCode) return subtotal;

    const currentAmount = line.cost?.totalAmount?.amount ?? '0';
    amount += Number(nextTotal.amount) - Number(currentAmount);
    decimalPlaces = Math.max(
      decimalPlaces,
      getDecimalPlaces(nextTotal.amount),
      getDecimalPlaces(currentAmount),
    );
  }

  return {
    amount: amount.toFixed(decimalPlaces),
    currencyCode: subtotal.currencyCode,
  };
}

function sumLineTotals(lines: readonly OptimisticPricedLine[]): MoneyV2 | null {
  const firstTotal = lines[0] ? getCartLineTotal(lines[0]) : null;
  if (!firstTotal) return null;

  let amount = 0;
  let decimalPlaces = 0;

  for (const line of lines) {
    const total = getCartLineTotal(line);
    if (total.currencyCode !== firstTotal.currencyCode) return null;

    amount += Number(total.amount);
    decimalPlaces = Math.max(decimalPlaces, getDecimalPlaces(total.amount));
  }

  return {
    amount: amount.toFixed(decimalPlaces),
    currencyCode: firstTotal.currencyCode,
  };
}

function multiplyMoney(money: MoneyV2, quantity: number): MoneyV2 {
  return {
    amount: (Number(money.amount) * quantity).toFixed(
      getDecimalPlaces(money.amount),
    ),
    currencyCode: money.currencyCode,
  };
}

function getDecimalPlaces(amount: string): number {
  return amount.split('.')[1]?.length ?? 0;
}
