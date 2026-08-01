import type {Meta, StoryObj} from '@storybook/react-vite';

import {Button} from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Add to cart',
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
  },
} satisfies Story;

export const Outline = {
  args: {
    variant: 'outline',
  },
} satisfies Story;

export const Destructive = {
  args: {
    children: 'Remove item',
    variant: 'destructive',
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;
