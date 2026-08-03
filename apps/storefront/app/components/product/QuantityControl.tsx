import {MinusIcon, PlusIcon} from 'lucide-react';

import {Button} from '~/components/ui/button';
import {ButtonGroup, ButtonGroupText} from '~/components/ui/button-group';
import {cn} from '~/lib/utils';

interface QuantityControlProps {
  ariaLabel?: string;
  className?: string;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
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
        className="size-9 rounded-full! border-0 bg-transparent p-0 hover:bg-neutral-900/10 disabled:opacity-35"
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
        className="size-9 rounded-full! border-0 bg-transparent p-0 hover:bg-neutral-900/10 disabled:opacity-35"
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
