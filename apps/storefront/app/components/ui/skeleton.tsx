import {cn} from '~/lib/utils';

function Skeleton({className, ...props}: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-muted before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-full before:bg-linear-to-r before:from-transparent before:via-white/45 before:to-transparent before:content-[''] motion-safe:animate-pulse motion-safe:before:animate-skeleton-shimmer",
        className,
      )}
      {...props}
    />
  );
}

export {Skeleton};
