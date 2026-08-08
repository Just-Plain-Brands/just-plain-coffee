import {useId, type ComponentProps, type ReactNode} from 'react';

import {Button} from '~/components/ui/button';
import {ButtonGroup} from '~/components/ui/button-group';
import {Input} from '~/components/ui/input';
import {Body, Text} from '~/components/ui/text';
import {NEWSLETTER_HONEYPOT_FIELD} from '~/lib/newsletter';
import {cn} from '~/lib/utils';

export type NewsletterSignupImage = Omit<
  ComponentProps<'img'>,
  'alt' | 'src'
> & {
  alt: string;
  containerClassName?: string;
  src: string;
};

export type NewsletterSignupInput = Omit<
  ComponentProps<typeof Input>,
  'id' | 'type'
> & {
  label: string;
};

export type NewsletterSignupSubmitButton = Omit<
  ComponentProps<typeof Button>,
  'children' | 'type'
> & {
  label: ReactNode;
};

export type NewsletterSignupFeedback = {
  className?: string;
  kind: 'error' | 'success';
  message: ReactNode;
};

export type NewsletterSignupProps = Omit<
  ComponentProps<'section'>,
  'children' | 'title'
> & {
  description: ReactNode;
  feedback?: NewsletterSignupFeedback;
  formProps?: Omit<ComponentProps<'form'>, 'children'>;
  image: NewsletterSignupImage;
  input: NewsletterSignupInput;
  submitButton: NewsletterSignupSubmitButton;
  title: ReactNode;
};

export function NewsletterSignup({
  className,
  description,
  feedback,
  formProps,
  image,
  input,
  submitButton,
  title,
  ...sectionProps
}: NewsletterSignupProps) {
  const emailId = useId();
  const feedbackId = useId();
  const honeypotId = useId();
  const {
    alt: imageAlt,
    className: imageClassName,
    containerClassName: imageContainerClassName,
    src: imageSrc,
    ...imageProps
  } = image;
  const {
    'aria-describedby': inputAriaDescribedBy,
    className: inputClassName,
    label: inputLabel,
    ...inputProps
  } = input;
  const {
    className: submitButtonClassName,
    label: submitButtonLabel,
    ...submitButtonProps
  } = submitButton;
  const {className: formClassName, ...remainingFormProps} = formProps ?? {};

  return (
    <section
      {...sectionProps}
      className={cn(
        'grid overflow-hidden rounded-lg border border-ink/30 bg-neutral-100 md:grid-cols-[0.66fr_1.34fr]',
        className,
      )}
    >
      <div
        className={cn(
          'relative hidden min-h-52 overflow-hidden bg-orange-100 md:block md:min-h-64',
          imageContainerClassName,
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:radial-gradient(var(--orange-600)_0.7px,transparent_0.8px)] [background-size:7px_7px] opacity-15"
        />
        <img
          {...imageProps}
          alt={imageAlt}
          className={cn(
            'absolute -bottom-16 left-1/2 z-10 h-64 w-auto -translate-x-1/2 object-contain md:-bottom-20 md:h-80',
            imageClassName,
          )}
          src={imageSrc}
        />
      </div>

      <div className="flex flex-col justify-center p-6 md:px-8 md:py-7 lg:px-10">
        <Text as="h2" className="leading-none md:text-4xl" variant="display-md">
          {title}
        </Text>
        <Body className="mt-3 max-w-[42ch] text-neutral-700">
          {description}
        </Body>

        <form {...remainingFormProps} className={cn('mt-5', formClassName)}>
          <div
            aria-hidden="true"
            className="absolute top-auto -left-[10000px] h-px w-px overflow-hidden"
          >
            <label htmlFor={honeypotId}>Leave this field empty</label>
            <input
              autoComplete="off"
              id={honeypotId}
              name={NEWSLETTER_HONEYPOT_FIELD}
              tabIndex={-1}
              type="text"
            />
          </div>
          <label className="sr-only" htmlFor={emailId}>
            {inputLabel}
          </label>
          <ButtonGroup className="w-full max-w-2xl">
            <Input
              aria-describedby={
                [inputAriaDescribedBy, feedback ? feedbackId : undefined]
                  .filter(Boolean)
                  .join(' ') || undefined
              }
              autoComplete="email"
              name="email"
              placeholder={inputLabel}
              required
              {...inputProps}
              className={cn(
                'h-11 border-ink/20 bg-neutral-100 px-5 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-100',
                inputClassName,
              )}
              id={emailId}
              type="email"
            />
            <Button
              {...submitButtonProps}
              className={cn(
                'h-11 bg-orange-600 px-7 text-neutral-100 hover:bg-orange-700 disabled:bg-orange-600 disabled:opacity-100',
                submitButtonClassName,
              )}
              type="submit"
            >
              {submitButtonLabel}
            </Button>
          </ButtonGroup>
          {feedback ? (
            <p
              aria-live="polite"
              className={cn(
                'mt-3 text-sm font-semibold',
                feedback.kind === 'error' ? 'text-red-700' : 'text-green-800',
                feedback.className,
              )}
              id={feedbackId}
              role={feedback.kind === 'error' ? 'alert' : 'status'}
            >
              {feedback.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
