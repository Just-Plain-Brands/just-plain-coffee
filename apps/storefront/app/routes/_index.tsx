import {Link, useLoaderData} from 'react-router';

import {CartonIllustration} from '~/components/catalog/carton-illustration/carton-illustration';
import {ProductCard} from '~/components/catalog/product-card';
import {HomeHero} from '~/components/marketing/home-hero';
import {Blockquote} from '~/components/sections/blockquote';
import {buttonVariants} from '~/components/ui/button';
import {
  getProductPresentation,
  ROAST_PRESENTATIONS,
} from '~/lib/coffee/presentation';
import {getCompleteRoastRange} from '~/lib/coffee/roast-range';
import {COFFEE_PRODUCT_CARD_FRAGMENT} from '~/lib/shopify/catalog-fragments';

import type {Route} from './+types/_index';

export const meta: Route.MetaFunction = () => [
  {title: 'Just Plain Coffee | Specialty coffee without the performance'},
  {
    name: 'description',
    content:
      'Specialty-grade coffee, roasted to order and packed in a carton worth leaving on the counter.',
  },
];

export async function loader({context}: Route.LoaderArgs) {
  const {shop} = await context.storefront.query(HOME_PRODUCTS_QUERY);
  const coreRoasts = getCompleteRoastRange(
    getReferencedProducts(shop.coreRoasts),
  );
  const featuredRoasts = getCompleteRoastRange(
    getReferencedProducts(shop.featuredRoasts),
  );

  return {coreRoasts, featuredRoasts};
}

export default function Homepage() {
  const {coreRoasts, featuredRoasts} = useLoaderData<typeof loader>();

  return (
    <main>
      <HomeHero products={coreRoasts} />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid overflow-hidden rounded-4xl bg-neutral-100 shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start justify-center p-8 md:p-14">
            <p className="mb-4 text-sm font-bold tracking-[0.14em] text-orange-700 uppercase">
              Coffee in a carton. Yes, really.
            </p>
            <h1 className="max-w-[11ch] text-5xl leading-[0.96] md:text-7xl">
              Plain, but make it loud.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
              Specialty-grade beans, roasted to order. The carton? Honestly,
              that&apos;s just us showing off.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className={buttonVariants({
                  className: 'h-12 rounded-full px-7 text-base',
                })}
                prefetch="intent"
                to="/collections/all"
              >
                Shop coffee
              </Link>
              <a
                className={buttonVariants({
                  className: 'h-12 rounded-full px-7 text-base',
                  variant: 'outline',
                })}
                href="#the-box"
              >
                Meet the carton
              </a>
            </div>
          </div>
          <div className="relative grid min-h-[510px] place-items-center overflow-hidden bg-orange-200">
            <div className="absolute top-8 left-8 -rotate-6 rounded-full bg-green-200 px-5 py-3 font-bold shadow-soft">
              Specialty grade
            </div>
            <div className="h-[420px] w-[285px]">
              <CartonIllustration className="origin-top-left scale-[0.84]" />
            </div>
            <div className="absolute right-8 bottom-8 rotate-6 rounded-full bg-neutral-900 px-5 py-3 font-bold text-neutral-100 shadow-soft">
              Yes, it&apos;s a carton.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        <div className="overflow-hidden rounded-4xl bg-green-200 px-6 pt-10 md:px-12 md:pt-14">
          <div className="grid gap-4 md:grid-cols-2 md:items-end">
            <h2 className="text-5xl md:text-7xl">Stack &apos;em high.</h2>
            <p className="max-w-xl pb-2 text-lg text-green-900/75">
              Every carton is the same shape on purpose. Cabinets, shelves,
              doomsday pantries — it stacks.
            </p>
          </div>
          <div
            aria-label="The complete Just Plain coffee range"
            className="mt-12 flex min-h-72 items-end justify-center gap-1 overflow-hidden"
          >
            {Object.values(ROAST_PRESENTATIONS).map((presentation, index) => (
              <div
                className="h-[260px] w-[176px] shrink-0"
                key={presentation.id}
                style={{transform: `rotate(${(index - 1.5) * 2}deg)`}}
              >
                <CartonIllustration className="origin-top-left scale-[0.52]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <h2 className="text-5xl md:text-7xl">Shop the range.</h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-700">
          Three roasts and a decaf. There is no fourth roast and there is no
          quiz.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRoasts.map((product) => (
            <ProductCard
              key={product.id}
              presentation={getProductPresentation({
                title: product.title,
                tags: product.tags,
                tagline: product.taglineMetafield?.value,
                tintColor: product.tintColorMetafield?.value,
                primaryColor: product.primaryColorMetafield?.value,
              })}
              product={product}
            />
          ))}
        </div>
      </section>

      <Blockquote
        caption="— The entire marketing department"
        quote="“We're not going to tell you it tastes like blackcurrant and honeysuckle. It tastes like coffee. Exceptionally good coffee.”"
      />

      <section
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-16 md:px-10 md:py-24"
        id="the-box"
      >
        <div className="grid overflow-hidden rounded-4xl bg-neutral-100 shadow-soft lg:grid-cols-2">
          <div className="relative grid min-h-[480px] place-items-center overflow-hidden bg-green-300">
            <div className="absolute inset-8 rounded-3xl border-2 border-dashed border-green-900/25" />
            <div className="h-[390px] w-[265px] rotate-3">
              <CartonIllustration className="origin-top-left scale-[0.78]" />
            </div>
          </div>
          <div className="p-8 md:p-14">
            <h2 className="text-5xl leading-none md:text-6xl">
              The carton is a flex.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-700">
              We put specialty-grade coffee in a milk carton because it looks
              fantastic on a counter. That&apos;s the reason. The paper-based
              format is a very convenient coincidence.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                'Looks unreasonably good on a shelf. This is the main feature.',
                'Designed to stack cleanly in the cabinet.',
                'The inner barrier keeps the beans fresh, with the roast date on the seam.',
              ].map((item, index) => (
                <li className="flex items-start gap-4" key={item}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-600 font-bold text-neutral-100">
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-neutral-700">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 rounded-4xl bg-green-900 p-8 text-green-100 md:p-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-[13ch] text-5xl leading-none md:text-6xl">
              Coffee shows up. You do nothing.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-green-100/75">
              Subscription purchasing will use Shopify selling plans, so
              frequency, savings, and checkout stay connected to the real
              catalog.
            </p>
          </div>
          <Link
            className={buttonVariants({
              className:
                'h-12 rounded-full bg-green-100 px-7 text-base text-green-900 hover:bg-green-200',
            })}
            prefetch="intent"
            to="/subscribe"
          >
            Pick your coffee
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-3 md:px-10 md:py-24">
        {[
          [
            '“I bought it because the box looked good. I kept buying it because the coffee is good.”',
            'Dana R. — Medium',
          ],
          [
            '“No notes. Genuinely. I didn’t have to read anything.”',
            'Marcus T. — Dark',
          ],
          [
            '“Stacks in the cabinet, which sounds like a small thing and is not a small thing.”',
            'Priya S. — Light',
          ],
        ].map(([quote, byline], index) => (
          <figure
            className={`rounded-3xl p-7 ${
              index === 1 ? 'bg-orange-200' : 'bg-neutral-100'
            }`}
            key={byline}
          >
            <blockquote className="text-xl leading-relaxed font-semibold">
              {quote}
            </blockquote>
            <figcaption className="mt-8 text-sm font-bold text-neutral-700">
              {byline}
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}

const HOME_PRODUCTS_QUERY = `#graphql
  query HomeProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      coreRoasts: metafield(namespace: "custom", key: "core_roasts") {
        references(first: 5) {
          nodes {
            __typename
            ... on Product {
              ...CoffeeProductCard
            }
          }
        }
      }
      featuredRoasts: metafield(namespace: "custom", key: "featured_roasts") {
        references(first: 5) {
          nodes {
            __typename
            ... on Product {
              ...CoffeeProductCard
            }
          }
        }
      }
    }
  }
  ${COFFEE_PRODUCT_CARD_FRAGMENT}
` as const;

function getReferencedProducts<Node extends {__typename?: string | undefined}>(
  metafield:
    | {references?: {nodes: readonly Node[]} | null | undefined}
    | null
    | undefined,
): Extract<Node, {__typename: 'Product'}>[] {
  return metafield?.references?.nodes.filter(isProductReference) ?? [];
}

function isProductReference<Node extends {__typename?: string | undefined}>(
  node: Node,
): node is Extract<Node, {__typename: 'Product'}> {
  return node.__typename === 'Product';
}
