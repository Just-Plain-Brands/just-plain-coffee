import {InfoIcon} from 'lucide-react';
import type {ReactNode} from 'react';

import {Text} from '~/components/ui/text';

export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <aside className="my-9 rounded-3xl border border-green-700/20 bg-green-200 p-6 md:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-green-900 text-green-100">
          <InfoIcon className="size-5" />
        </span>
        <div>
          <p className="font-display text-2xl leading-none">{title}</p>
          <div className="mt-3 leading-relaxed text-green-900/80">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MascotTip({children}: {children: ReactNode}) {
  return (
    <aside className="my-8 grid grid-cols-[104px_minmax(0,1fr)] overflow-hidden rounded-lg border border-green-700/30 bg-green-200 sm:grid-cols-[120px_minmax(0,1fr)]">
      <div className="flex min-h-32 items-end justify-center pt-2 sm:min-h-28">
        <img
          alt=""
          className="h-28 w-28 object-contain"
          loading="lazy"
          src="/mascots/carton-mascot-thumbs-up.svg"
        />
      </div>
      <div className="self-center py-4 pr-5 pl-1 sm:pl-2">
        <Text as="p" className="text-green-700" variant="display-sm">
          Plain advice:
        </Text>
        <div className="mt-1 max-w-[18ch] text-lg leading-snug font-semibold text-green-900 [&_p]:m-0 [&_p]:leading-snug [&_p]:text-inherit">
          {children}
        </div>
      </div>
    </aside>
  );
}
