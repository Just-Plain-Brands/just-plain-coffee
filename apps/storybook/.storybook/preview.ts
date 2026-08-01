import type {Preview} from '@storybook/react-vite';

import '../../storefront/app/styles/tailwind.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Preview;

export default preview;
