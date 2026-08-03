import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';

import {GalleryCarousel, type GalleryCarouselItem} from './GalleryCarousel';
import {ProductStoryArtwork} from './storybook/ProductStoryArtwork';

function DetailArtwork({
  backgroundColor,
  label,
  textColor,
}: {
  backgroundColor: string;
  label: string;
  textColor: string;
}) {
  return (
    <div
      aria-label={label}
      className="relative grid aspect-[4/5] h-full max-h-[520px] w-full max-w-[420px] place-items-center overflow-hidden rounded-4xl border-2 border-neutral-900 shadow-soft"
      role="img"
      style={{backgroundColor, color: textColor}}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(8deg, transparent 0 7px, currentColor 8px 9px)',
        }}
      />
      <strong className="relative max-w-[7ch] text-center font-package text-4xl leading-[0.9] tracking-[-0.04em] uppercase md:text-6xl">
        {label}
      </strong>
    </div>
  );
}

const APPAREL_MEDIA = [
  {
    id: 'front',
    label: 'Front',
    media: (
      <ProductStoryArtwork
        color="#2e2b25"
        kind="shirt"
        label="Front of the ink Plain Tee"
      />
    ),
  },
  {
    id: 'back',
    label: 'Back',
    media: (
      <ProductStoryArtwork
        accentColor="#2e2b25"
        color="#2e2b25"
        kind="shirt"
        label="Back of the ink Plain Tee"
      />
    ),
  },
  {
    id: 'print-detail',
    label: 'Print detail',
    media: (
      <DetailArtwork
        backgroundColor="#2e2b25"
        label="Just Plain Coffee print detail"
        textColor="#f5ead8"
      />
    ),
  },
  {
    id: 'fabric-detail',
    label: 'Fabric detail',
    media: (
      <DetailArtwork
        backgroundColor="#e9ddc7"
        label="240 gsm heavyweight cotton"
        textColor="#2e2b25"
      />
    ),
  },
] satisfies readonly GalleryCarouselItem[];

const EXTENDED_MEDIA = [
  ...APPAREL_MEDIA,
  {
    id: 'collar-detail',
    label: 'Collar detail',
    media: (
      <DetailArtwork
        backgroundColor="#ccdbb2"
        label="Bound collar"
        textColor="#272e1b"
      />
    ),
  },
] satisfies readonly GalleryCarouselItem[];

function StatefulGallery({
  initialSelectedId,
  items,
}: {
  initialSelectedId: string;
  items: readonly GalleryCarouselItem[];
}) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  return (
    <GalleryCarousel
      items={items}
      onSelectedIdChange={setSelectedId}
      selectedId={selectedId}
    />
  );
}

const meta = {
  title: 'UI/Gallery Carousel',
  component: GalleryCarousel,
  args: {
    items: APPAREL_MEDIA,
    onSelectedIdChange: () => undefined,
    selectedId: 'front',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[min(720px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GalleryCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <StatefulGallery initialSelectedId="front" items={APPAREL_MEDIA} />
  ),
} satisfies Story;

export const MoreThanTwoImages = {
  render: () => (
    <StatefulGallery initialSelectedId="front" items={EXTENDED_MEDIA} />
  ),
} satisfies Story;

export const SingleImage = {
  render: () => (
    <StatefulGallery initialSelectedId="front" items={[APPAREL_MEDIA[0]]} />
  ),
} satisfies Story;

export const Empty = {
  args: {
    items: [],
  },
} satisfies Story;

export const SelectedDetail = {
  render: () => (
    <StatefulGallery initialSelectedId="print-detail" items={APPAREL_MEDIA} />
  ),
} satisfies Story;

export const Wraparound = {
  render: () => (
    <StatefulGallery initialSelectedId="front" items={APPAREL_MEDIA} />
  ),
} satisfies Story;

export const MobileFilmstrip = {
  decorators: [
    (Story) => (
      <div className="w-[360px] max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
  render: () => (
    <StatefulGallery initialSelectedId="front" items={EXTENDED_MEDIA} />
  ),
} satisfies Story;
