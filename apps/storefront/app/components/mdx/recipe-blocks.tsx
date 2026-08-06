import type {ReactNode} from 'react';

export function IngredientList({children}: {children: ReactNode}) {
  return (
    <section
      aria-label="Ingredients"
      className="mt-4 mb-5 border-b border-green-700/45 pb-4"
      data-slot="ingredient-list"
    >
      <div className="[&_li]:relative [&_li]:py-1 [&_li]:pl-5 [&_li]:text-base [&_li]:leading-snug [&_li]:before:absolute [&_li]:before:top-[0.68em] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-green-600 [&_ul]:mt-0 [&_ul]:list-none [&_ul]:space-y-0 [&_ul]:pl-0">
        {children}
      </div>
    </section>
  );
}

export function RecipeSteps({children}: {children: ReactNode}) {
  return <ol className="my-8 grid gap-0">{children}</ol>;
}

export function RecipeStep({
  children,
  number,
  title,
}: {
  children: ReactNode;
  number: number;
  title: string;
}) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-green-700/35 py-6 first:border-t-0">
      <span className="grid size-9 place-items-center rounded-full bg-green-600 font-bold text-neutral-100">
        {String(number).padStart(2, '0')}
      </span>
      <div>
        <p className="font-display text-2xl leading-none">{title}</p>
        <div className="mt-2 leading-relaxed text-neutral-700">{children}</div>
      </div>
    </li>
  );
}

export function PullQuote({children}: {children: ReactNode}) {
  return (
    <blockquote className="relative my-8 overflow-hidden rounded-lg bg-orange-600 px-12 py-6 text-center text-neutral-100 md:px-16 md:py-7">
      <span
        aria-hidden="true"
        className="absolute top-1 left-3 font-display text-7xl leading-none text-orange-900/35 md:left-4 md:text-8xl"
      >
        “
      </span>
      <div className="relative z-10 font-display text-2xl leading-tight text-neutral-100 md:text-3xl [&_p]:m-0 [&_p]:leading-tight [&_p]:text-inherit">
        {children}
      </div>
      <span
        aria-hidden="true"
        className="absolute right-3 -bottom-5 font-display text-7xl leading-none text-orange-900/35 md:right-4 md:text-8xl"
      >
        ”
      </span>
    </blockquote>
  );
}

export function Figure({
  alt,
  caption,
  src,
}: {
  alt: string;
  caption?: string;
  src: string;
}) {
  return (
    <figure className="my-9">
      <img alt={alt} className="w-full rounded-3xl shadow-soft" src={src} />
      {caption ? (
        <figcaption className="mt-3 text-sm text-neutral-700">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
