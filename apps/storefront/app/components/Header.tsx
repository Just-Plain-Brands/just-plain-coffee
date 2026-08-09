import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import {MenuIcon, SearchIcon, ShoppingBagIcon} from 'lucide-react';
import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {Button} from '~/components/ui/button';

interface HeaderProps {
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
}

type Viewport = 'desktop' | 'mobile';

export function Header({isLoggedIn, cart}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background px-5 py-2 md:px-10">
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 rounded-full bg-neutral-100 py-1.5 pr-3 pl-4 shadow-soft sm:gap-4 sm:py-2 sm:pl-5">
        <MobileMenuToggle />
        <NavLink
          className="mr-auto shrink-0 font-display text-lg leading-none whitespace-nowrap no-underline min-[400px]:text-xl md:text-[22px]"
          end
          prefetch="intent"
          to="/"
        >
          Just Plain Coffee
        </NavLink>
        <HeaderMenu viewport="desktop" />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({viewport}: {viewport: Viewport}) {
  const {close} = useAside();
  const className =
    viewport === 'desktop'
      ? 'hidden items-center gap-5 text-sm font-semibold lg:flex'
      : 'flex flex-col gap-5 text-xl font-semibold';

  return (
    <nav aria-label={`${viewport} navigation`} className={className}>
      <NavLink onClick={close} prefetch="intent" to="/collections/all">
        Shop
      </NavLink>
      <NavLink onClick={close} prefetch="intent" to="/collections/merch">
        Merch
      </NavLink>
      <NavLink onClick={close} prefetch="intent" to="/subscribe">
        Subscribe
      </NavLink>
      <NavLink onClick={close} to="/#the-box">
        The box
      </NavLink>
      <NavLink onClick={close} prefetch="intent" to="/journal">
        Journal
      </NavLink>
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav
      aria-label="Store utilities"
      className="flex items-center gap-1 md:gap-2"
    >
      <NavLink
        className="hidden text-sm font-semibold xl:block"
        prefetch="intent"
        to="/account"
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(loggedIn) => (loggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function MobileMenuToggle() {
  const {open} = useAside();

  return (
    <Button
      aria-label="Open menu"
      className="size-11 shrink-0 lg:hidden"
      onClick={() => open('mobile')}
      size="icon"
      variant="ghost"
    >
      <MenuIcon />
    </Button>
  );
}

function SearchToggle() {
  const {open} = useAside();

  return (
    <Button
      aria-label="Search"
      className="hidden size-11 sm:inline-flex"
      onClick={() => open('search')}
      size="icon"
      variant="ghost"
    >
      <SearchIcon />
    </Button>
  );
}

function CartButton({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <Button
      aria-label={`Open cart with ${count} items`}
      className="h-11 rounded-full px-4 font-display text-sm"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href,
        } satisfies CartViewPayload);
      }}
    >
      <ShoppingBagIcon data-icon="inline-start" />
      <span className="hidden sm:inline">Cart</span>
      <span>({count})</span>
    </Button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartButton count={0} />}>
      <Await resolve={cart}>
        <CartButtonWithData />
      </Await>
    </Suspense>
  );
}

function CartButtonWithData() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);

  return <CartButton count={cart?.totalQuantity ?? 0} />;
}
