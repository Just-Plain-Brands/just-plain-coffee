import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {type FetcherWithComponents} from 'react-router';

import {Button} from '~/components/ui/button';
import {cn} from '~/lib/utils';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className="w-full">
      <CartForm
        route="/cart"
        inputs={{lines}}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher: FetcherWithComponents<unknown>) => {
          const isSubmitting = fetcher.state !== 'idle';

          return (
            <>
              <input
                name="analytics"
                type="hidden"
                value={JSON.stringify(analytics)}
              />
              <Button
                aria-busy={isSubmitting || undefined}
                className={cn('rounded-full', className)}
                disabled={disabled ?? isSubmitting}
                onClick={onClick}
                type="submit"
              >
                {isSubmitting ? 'Adding…' : children}
              </Button>
            </>
          );
        }}
      </CartForm>
    </div>
  );
}
