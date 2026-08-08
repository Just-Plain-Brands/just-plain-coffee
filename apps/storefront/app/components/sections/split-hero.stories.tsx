import type {Meta, StoryObj} from '@storybook/react-vite';

import {SplitHero} from './split-hero';

const heroImage = (
  <img
    alt="A Just Plain Coffee carton"
    className="h-[380px] w-full rounded-4xl bg-orange-100 object-contain p-8"
    src="/Carton%201.png"
  />
);

const meta = {
  title: 'Sections/Split Hero',
  component: SplitHero,
  args: {
    eyebrow: 'Built for everyday brewing',
    heading: (
      <>
        Coffee without the theater
        <span className="text-orange-600">.</span>
      </>
    ),
    image: heroImage,
    subheading:
      'Fresh coffee, straightforward guidance, and none of the usual ceremony.',
  },
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof SplitHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const ImageHiddenOnMobile = {
  args: {
    imageContainerClassName: 'hidden lg:block',
  },
  globals: {
    viewport: {value: 'mobile1', isRotated: false},
  },
} satisfies Story;
