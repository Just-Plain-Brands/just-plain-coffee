import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';

import {
  NewsletterSignup,
  type NewsletterSignupProps,
} from './newsletter-signup';

function InteractiveNewsletterSignup(props: NewsletterSignupProps) {
  const [email, setEmail] = useState('');

  return (
    <NewsletterSignup
      {...props}
      formProps={{
        ...props.formProps,
        onSubmit: (event) => event.preventDefault(),
      }}
      input={{
        ...props.input,
        onChange: (event) => {
          props.input.onChange?.(event);
          setEmail(event.currentTarget.value);
        },
        value: email,
      }}
    />
  );
}

const meta = {
  title: 'Marketing/Newsletter Signup',
  component: NewsletterSignup,
  args: {
    description:
      'New recipes, helpful guides, and the odd bag drop. No fluff. No spam. Just the good stuff.',
    formProps: {'aria-label': 'Newsletter signup'},
    image: {
      alt: '',
      src: '/carton-mascots/straight-talker.webp',
    },
    input: {
      label: 'Email address',
    },
    submitButton: {
      label: 'Sign me up',
    },
    title: (
      <>
        One useful email. Occasionally
        <span className="text-orange-600">.</span>
      </>
    ),
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => <InteractiveNewsletterSignup {...args} />,
  decorators: [
    (Story) => (
      <div className="w-[min(1120px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NewsletterSignup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Customized = {
  args: {
    description:
      'Roast notes, brew tips, and first dibs on fresh releases—sent when there is something worth saying.',
    formProps: {'aria-label': 'Coffee dispatch signup'},
    image: {
      alt: 'A cheerful coffee carton waving hello',
      containerClassName: 'bg-green-200',
      src: '/carton-mascots/groovy-hello.webp',
    },
    input: {
      disabled: false,
      label: 'Your email',
      placeholder: 'you@example.com',
    },
    submitButton: {
      disabled: false,
      label: 'Keep me posted',
    },
    title: 'The coffee dispatch.',
  },
} satisfies Story;

export const Success = {
  args: {
    feedback: {
      kind: 'success',
      message: "You're on the list. Keep an eye on your inbox.",
    },
    input: {
      disabled: true,
      label: 'Email address',
    },
    submitButton: {
      disabled: true,
      label: "You're in",
    },
  },
} satisfies Story;

export const Error = {
  args: {
    feedback: {
      kind: 'error',
      message: "We couldn't sign you up. Please try again.",
    },
    input: {
      'aria-invalid': true,
      label: 'Email address',
    },
  },
} satisfies Story;
