import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import type {CartLayout, LineItemChildrenMap} from '~/components/cart/CartMain';
import {ProductPrice} from '~/components/product/ProductPrice';
import {Button} from '~/components/ui/button';
import {ButtonGroup} from '~/components/ui/button-group';
import {getSellingPlanLabel} from '~/lib/shopify/subscriptions';
import {useVariantUrl} from '~/lib/variants';

export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * If the line is a parent line that has child components (like warranties or gift wrapping), they are
 * rendered nested below the parent line.
 */
export function CartLineItem({
  layout,
  line,
  childrenMap,
}: {
  layout: CartLayout;
  line: CartLine;
  childrenMap: LineItemChildrenMap;
}) {
  const {id, merchandise, sellingPlanAllocation} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  return (
    <li key={id} className="py-5">
      <div className="grid grid-cols-[88px_1fr] gap-4">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            className="rounded-2xl bg-orange-100 object-cover"
            data={image}
            height={100}
            loading="lazy"
            width={100}
          />
        )}

        <div className="min-w-0">
          <Link
            className="font-display text-xl hover:text-primary"
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
          >
            {product.title}
          </Link>
          <div className="mt-1 font-bold">
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
          <ul className="mt-1 text-xs text-neutral-600">
            {sellingPlanAllocation ? (
              <li className="font-bold text-primary">
                Subscription ·{' '}
                {getSellingPlanLabel(sellingPlanAllocation.sellingPlan)}
              </li>
            ) : null}
            {selectedOptions.map((option) => (
              <li key={option.name}>
                {option.name}: {option.value}
              </li>
            ))}
          </ul>
          <CartLineQuantity line={line} />
        </div>
      </div>

      {lineItemChildren ? (
        <div>
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul
            aria-labelledby={childrenLabelId}
            className="ml-6 border-l border-neutral-300 pl-4"
          >
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, isOptimistic, merchandise, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <ButtonGroup
      aria-label={`Quantity for ${merchandise.product.title}`}
      className="mt-3 items-center gap-2"
    >
      <span className="sr-only">Quantity: {quantity}</span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <Button
          aria-label="Decrease quantity"
          className="size-8 rounded-full border-neutral-300 hover:border-neutral-900 disabled:opacity-35"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          size="icon"
          type="submit"
          value={prevQuantity}
          variant="outline"
        >
          <span>&#8722;</span>
        </Button>
      </CartLineUpdateButton>
      <span
        aria-hidden="true"
        className="min-w-5 text-center text-sm font-bold"
      >
        {quantity}
      </span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <Button
          aria-label="Increase quantity"
          className="size-8 rounded-full border-neutral-300 hover:border-neutral-900 disabled:opacity-35"
          name="increase-quantity"
          size="icon"
          type="submit"
          value={nextQuantity}
          disabled={!!isOptimistic}
          variant="outline"
        >
          <span>&#43;</span>
        </Button>
      </CartLineUpdateButton>
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </ButtonGroup>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <Button
        className="ml-2 h-auto px-0 text-xs font-bold text-neutral-600 disabled:opacity-35"
        disabled={disabled}
        size="sm"
        type="submit"
        variant="link"
      >
        Remove
      </Button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
