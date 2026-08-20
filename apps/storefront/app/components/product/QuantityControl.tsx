import {MinusIcon, PlusIcon} from 'lucide-react';

import {Button} from '~/components/ui/button';
import {ButtonGroup, ButtonGroupText} from '~/components/ui/button-group';
import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

interface QuantityControlProps {
  ariaLabel?: string;
  className?: string;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
}

export function QuantityControlLoading({
  ariaLabel = 'Quantity',
  className,
}: Pick<QuantityControlProps, 'ariaLabel' | 'className'>) {
  return (
    <div
      aria-busy="true"
      aria-label={`${ariaLabel} is loading`}
      className={cn(
        'flex h-14 w-full min-w-36 items-center justify-between rounded-full border border-neutral-300 bg-neutral-100 px-2 sm:w-36',
        className,
      )}
      role="status"
    >
      <Skeleton className="size-9 rounded-full bg-neutral-200" />
      <Skeleton className="h-5 w-5 rounded-full bg-neutral-300 [animation-delay:120ms] before:[animation-delay:120ms]" />
      <Skeleton className="size-9 rounded-full bg-neutral-200 [animation-delay:240ms] before:[animation-delay:240ms]" />
    </div>
  );
}

export function QuantityControl({
  ariaLabel = 'Quantity',
  className,
  max,
  min = 1,
  onChange,
  value,
}: QuantityControlProps) {
  const canDecrease = value > min;
  const canIncrease = max === undefined || value < max;

  return (
    <ButtonGroup
      aria-label={ariaLabel}
      className={cn(
        'flex h-14 w-full min-w-36 items-center justify-between rounded-full border border-neutral-300 bg-neutral-100 px-2 sm:w-36',
        className,
      )}
      orientation={null}
    >
      <Button
        aria-label="Decrease quantity"
        className={cn(
          'size-11 rounded-full! border-0 bg-transparent p-0 hover:bg-neutral-900/10',
          !canDecrease && 'opacity-35',
        )}
        disabled={!canDecrease}
        onClick={() => onChange(value - 1)}
        size="icon-lg"
        type="button"
        variant="ghost"
      >
        <MinusIcon className="size-4" />
      </Button>
      <ButtonGroupText
        className="min-w-8 justify-center rounded-none border-0 bg-transparent px-0 font-bold tabular-nums"
        render={<output aria-live="polite" />}
      >
        {value}
      </ButtonGroupText>
      <Button
        aria-label="Increase quantity"
        className={cn(
          'size-11 rounded-full! border-0 bg-transparent p-0 hover:bg-neutral-900/10',
          !canIncrease && 'opacity-35',
        )}
        disabled={!canIncrease}
        onClick={() => onChange(value + 1)}
        size="icon-lg"
        type="button"
        variant="ghost"
      >
        <PlusIcon className="size-4" />
      </Button>
    </ButtonGroup>
  );
}
