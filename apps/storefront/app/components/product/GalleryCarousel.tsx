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
          className="aspect-square min-h-80 rounded-4xl bg-surface"
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
            <div className="relative grid aspect-square min-h-80 place-items-center overflow-hidden rounded-4xl bg-surface p-7 sm:p-10">
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
                  'w-26 shrink-0 snap-center overflow-hidden rounded-2xl border-2 bg-neutral-100 p-1.5 text-left transition sm:w-28',
                  isSelected
                    ? 'border-neutral-900'
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
                  className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-surface [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full"
                >
                  {item.thumbnail ?? item.media}
                </span>
                <span className="block truncate px-1 pt-2 pb-1 text-xs font-bold">
                  {item.label}
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
