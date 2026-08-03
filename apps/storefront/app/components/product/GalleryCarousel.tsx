import {ImageOffIcon} from 'lucide-react';
import {useEffect, useEffectEvent, useMemo, type ReactNode} from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '~/components/ui/carousel';
import {EmptyState} from '~/components/ui/empty-state';
import {Skeleton} from '~/components/ui/skeleton';
import {cn} from '~/lib/utils';

export interface GalleryCarouselItem {
  id: string;
  label: string;
  media: ReactNode;
  thumbnail?: ReactNode;
}

interface GalleryCarouselProps {
  ariaLabel?: string;
  className?: string;
  items: readonly GalleryCarouselItem[];
  onSelectedIdChange: (id: string) => void;
  selectedId: string;
}

const GALLERY_LOADING_THUMBNAILS = [
  {id: 'first', delayClassName: ''},
  {
    id: 'second',
    delayClassName: '[animation-delay:120ms] before:[animation-delay:120ms]',
  },
  {
    id: 'third',
    delayClassName: '[animation-delay:240ms] before:[animation-delay:240ms]',
  },
] as const;

export function GalleryCarouselLoading({
  ariaLabel = 'Product media',
  className,
}: Pick<GalleryCarouselProps, 'ariaLabel' | 'className'>) {
  return (
    <div
      aria-busy="true"
      aria-label={ariaLabel}
      className={cn('min-w-0', className)}
      role="region"
    >
      <span className="sr-only">Loading product media.</span>
      <div className="relative grid aspect-square min-h-0 place-items-center overflow-hidden rounded-4xl bg-surface p-7 sm:min-h-80 sm:p-10">
        <Skeleton className="h-4/5 w-3/5 rounded-4xl bg-neutral-200/80" />
        <Skeleton className="absolute top-5 right-5 h-8 w-12 rounded-full bg-neutral-100/80 [animation-delay:180ms] before:[animation-delay:180ms]" />
        <Skeleton className="absolute bottom-5 left-5 h-8 w-20 rounded-full bg-neutral-900/20 [animation-delay:300ms] before:[animation-delay:300ms]" />
      </div>

      <div className="mt-4 grid grid-cols-[44px_minmax(0,1fr)_44px] items-stretch gap-2">
        <Skeleton className="min-h-28 w-11 rounded-2xl bg-neutral-200" />
        <div className="flex gap-2 overflow-hidden pb-1">
          {GALLERY_LOADING_THUMBNAILS.map((thumbnail) => (
            <div
              className="w-26 shrink-0 rounded-2xl border-2 border-neutral-300/60 bg-neutral-100 p-1.5 sm:w-28"
              key={thumbnail.id}
            >
              <Skeleton
                className={cn(
                  'aspect-square rounded-xl bg-surface',
                  thumbnail.delayClassName,
                )}
              />
              <Skeleton
                className={cn(
                  'mx-1 mt-2 mb-1 h-3 w-3/5 rounded-full bg-neutral-300',
                  thumbnail.delayClassName,
                )}
              />
            </div>
          ))}
        </div>
        <Skeleton className="min-h-28 w-11 rounded-2xl bg-neutral-200 [animation-delay:300ms] before:[animation-delay:300ms]" />
      </div>
    </div>
  );
}

export function GalleryCarousel({
  ariaLabel = 'Product media',
  className,
  items,
  onSelectedIdChange,
  selectedId,
}: GalleryCarouselProps) {
  const hasMultipleItems = items.length > 1;
  const carouselOptions = useMemo(
    () => ({loop: hasMultipleItems}),
    [hasMultipleItems],
  );

  if (items.length === 0) {
    return (
      <div
        aria-label={ariaLabel}
        className={cn('min-w-0', className)}
        role="region"
      >
        <EmptyState
          className="aspect-square min-h-0 rounded-4xl bg-surface sm:min-h-80"
          description="Images and videos will appear here when available."
          icon={<ImageOffIcon />}
          title="No product media available."
        />
      </div>
    );
  }

  return (
    <Carousel
      aria-label={ariaLabel}
      className={cn('min-w-0', className)}
      opts={carouselOptions}
    >
      <GalleryCarouselContent
        items={items}
        onSelectedIdChange={onSelectedIdChange}
        selectedId={selectedId}
      />
    </Carousel>
  );
}

function GalleryCarouselContent({
  items,
  onSelectedIdChange,
  selectedId,
}: Pick<GalleryCarouselProps, 'items' | 'onSelectedIdChange' | 'selectedId'>) {
  const {api: carouselApi} = useCarousel();
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === selectedId),
  );
  const selectedItem = items[selectedIndex] ?? items[0];
  const onCarouselSelect = useEffectEvent(() => {
    const item = carouselApi?.selectedScrollSnap();
    const selectedCarouselItem = item === undefined ? undefined : items[item];

    if (selectedCarouselItem && selectedCarouselItem.id !== selectedId) {
      onSelectedIdChange(selectedCarouselItem.id);
    }
  });

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on('select', onCarouselSelect);
    return () => {
      carouselApi.off('select', onCarouselSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || carouselApi.selectedScrollSnap() === selectedIndex) {
      return;
    }

    carouselApi.scrollTo(selectedIndex);
  }, [carouselApi, selectedIndex]);

  if (!selectedItem) return null;

  return (
    <>
      <CarouselContent className="ml-0">
        {items.map((item, index) => (
          <CarouselItem
            aria-label={`${index + 1} of ${items.length}: ${item.label}`}
            className="pl-0"
            key={item.id}
          >
            <div className="relative grid aspect-square min-h-0 place-items-center overflow-hidden rounded-2xl bg-surface sm:min-h-80">
              <div className="grid h-full w-full place-items-center overflow-hidden [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain [&_svg]:max-h-full [&_svg]:max-w-full">
                {item.media}
              </div>
              <span className="absolute top-5 right-5 rounded-full border border-neutral-900/15 bg-neutral-100/85 px-3 py-2 text-xs font-bold shadow-soft backdrop-blur-sm">
                {index + 1} / {items.length}
              </span>
              <span
                aria-live="polite"
                className="absolute bottom-5 left-5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-bold text-neutral-100"
              >
                {item.label}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-4 grid grid-cols-[44px_minmax(0,1fr)_44px] items-stretch gap-2">
        <CarouselPrevious
          aria-label="Previous product image"
          className="static my-0 h-auto min-h-28 w-11 rounded-2xl border-neutral-300 bg-neutral-100 hover:border-neutral-900 hover:bg-neutral-200 disabled:cursor-default"
        />

        <div className="flex snap-x gap-2 overflow-x-auto overscroll-x-contain pb-1">
          {items.map((item, index) => {
            const isSelected = item.id === selectedItem.id;

            return (
              <button
                aria-label={`Show product image: ${item.label}`}
                aria-pressed={isSelected}
                className={cn(
                  'w-26 shrink-0 snap-center overflow-hidden rounded-lg border-2 bg-neutral-100 p-1.5 text-left transition sm:w-28',
                  isSelected
                    ? 'border-neutral-300'
                    : 'border-transparent hover:border-neutral-300',
                )}
                key={item.id}
                onClick={() => {
                  carouselApi?.scrollTo(index);
                  if (!isSelected) onSelectedIdChange(item.id);
                }}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="grid aspect-square place-items-center overflow-hidden rounded-md bg-surface [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full"
                >
                  {item.thumbnail ?? item.media}
                </span>
              </button>
            );
          })}
        </div>

        <CarouselNext
          aria-label="Next product image"
          className="static my-0 h-auto min-h-28 w-11 rounded-2xl border-neutral-300 bg-neutral-100 hover:border-neutral-900 hover:bg-neutral-200 disabled:cursor-default"
        />
      </div>
    </>
  );
}
