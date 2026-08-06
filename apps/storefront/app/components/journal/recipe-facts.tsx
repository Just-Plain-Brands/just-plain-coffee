import {Clock3Icon, CoffeeIcon, MoonIcon, ScaleIcon} from 'lucide-react';
import type {ReactNode} from 'react';

import {Text} from '~/components/ui/text';
import type {RecipeFacts as RecipeFactsValue} from '~/lib/journal/types';

export function RecipeFacts({facts}: {facts: RecipeFactsValue}) {
  return (
    <aside className="rounded-lg border border-orange-600/50 bg-orange-100/70 p-3 lg:sticky lg:top-32">
      <Text
        as="p"
        className="px-2 pt-1 text-xs text-primary"
        variant="package-sm"
      >
        The short version
      </Text>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <Fact
          icon={<Clock3Icon />}
          label="Prep"
          value={`${facts.prepMinutes} min`}
        />
        <Fact
          icon={<MoonIcon />}
          label="Steep"
          value={`${formatHours(facts.steepMinutes.minimum)}–${formatHours(facts.steepMinutes.maximum)} hrs`}
        />
        <Fact icon={<CoffeeIcon />} label="Yield" value={facts.yield} />
        <Fact icon={<ScaleIcon />} label="Ratio" value={facts.ratio} />
      </dl>
    </aside>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-orange-600/25 bg-neutral-100/45 px-3 py-2.5">
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center [&_svg]:size-5"
      >
        {icon}
      </span>
      <div>
        <Text
          as="dt"
          className="text-[10px] text-neutral-700"
          variant="package-sm"
        >
          {label}
        </Text>
        <Text
          as="dd"
          className="mt-0.5 text-xs tracking-[0.08em] text-neutral-900"
          variant="package-sm"
        >
          {value}
        </Text>
      </div>
    </div>
  );
}

function formatHours(minutes: number): string {
  return String(minutes / 60);
}
