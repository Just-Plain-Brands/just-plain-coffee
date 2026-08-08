import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';

import {QuantityControl, QuantityControlLoading} from './QuantityControl';

function StatefulQuantity({
  initialValue,
  max,
}: {
  initialValue: number;
  max?: number;
}) {
  const [value, setValue] = useState(initialValue);

  return <QuantityControl max={max} onChange={setValue} value={value} />;
}

const meta = {
  title: 'UI/Quantity Control',
  component: QuantityControl,
  args: {
    onChange: () => undefined,
    value: 1,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof QuantityControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Minimum = {
  render: () => <StatefulQuantity initialValue={1} />,
} satisfies Story;

export const Incremented = {
  render: () => <StatefulQuantity initialValue={3} />,
} satisfies Story;

export const Maximum = {
  render: () => <StatefulQuantity initialValue={5} max={5} />,
} satisfies Story;

export const Loading = {
  render: () => <QuantityControlLoading />,
} satisfies Story;
