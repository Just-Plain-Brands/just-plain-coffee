import {Suspense, useId} from 'react';
import {Await, Link} from 'react-router';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';

import {Aside} from '~/components/Aside';
import {CartMain} from '~/components/cart/CartMain';
import {CartSummaryAsync} from '~/components/cart/CartSummary';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {AnnouncementBar} from '~/components/layout/announcement-bar';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  isLoggedIn,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside />
      <AnnouncementBar />
      <Header cart={cart} isLoggedIn={isLoggedIn} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside
      type="cart"
      heading="CART"
      footer={
        <Suspense fallback={<p>Loading cart ...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartSummaryAsync cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      }
    >
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="flex flex-col gap-6">
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <div className="flex gap-2">
              <Input
                className="h-11 rounded-full bg-neutral-100 px-5"
                list={queriesDatalistId}
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              <Button className="h-11 rounded-full" onClick={goToSearch}>
                Search
              </Button>
            </div>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, journal, total, term, state, closeSearch}) => {
            const {collections, pages, products, queries} = items;

            if (state === 'loading' && term) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Journal
                  closeSearch={closeSearch}
                  journal={journal}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term}`}
                  >
                    <p>
                      View all results for <q>{term}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside() {
  return (
    <Aside type="mobile" heading="Menu">
      <HeaderMenu viewport="mobile" />
    </Aside>
  );
}
