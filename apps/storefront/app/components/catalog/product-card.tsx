import {Image, Money} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CoffeeProductCardFragment} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/cart/AddToCartButton';
import {CartonIllustration} from '~/components/catalog/carton-illustration/carton-illustration';
import type {RoastPresentation} from '~/lib/coffee/presentation';

interface ProductCardProps {
  product: CoffeeProductCardFragment;
  presentation: RoastPresentation;
}

export function ProductCard({product, presentation}: ProductCardProps) {
  const {open} = useAside();
  const variant = product.selectedOrFirstAvailableVariant;

  return (
    <article className="group flex flex-col gap-4 rounded-3xl bg-neutral-100 p-5 transition duration-200 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-soft">
      <Link
        aria-label={`View ${product.title}`}
        className="flex h-[268px] items-end justify-center overflow-hidden rounded-2xl bg-orange-100"
        prefetch="intent"
        to={`/products/${product.handle}`}
      >
        {product.featuredImage ? (
          <Image
            alt={product.featuredImage.altText ?? product.title}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
            data={product.featuredImage}
            sizes="(min-width: 64rem) 20vw, (min-width: 40rem) 45vw, 90vw"
          />
        ) : (
          <CartonIllustration className="origin-bottom scale-[0.48] transition duration-300 group-hover:scale-[0.55]" />
        )}
      </Link>
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xl">{presentation.shortName}</h3>
          <strong>
            <Money data={product.priceRange.minVariantPrice} />
          </strong>
        </div>
        <p className="mt-1 text-sm text-neutral-700">{presentation.tagline}</p>
      </div>
      <AddToCartButton
        className="mt-auto h-11 w-full"
        disabled={!variant?.availableForSale}
        lines={
          variant
            ? [
                {
                  merchandiseId: variant.id,
                  quantity: 1,
                  selectedVariant: variant,
                },
              ]
            : []
        }
        onClick={() => open('cart')}
      >
        {variant?.availableForSale ? 'Quick add' : 'Sold out'}
      </AddToCartButton>
    </article>
  );
}
