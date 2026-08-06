/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  parentRelationship?: StorefrontAPI.Maybe<{
    parent: Pick<StorefrontAPI.CartLine, 'id'>;
  }>;
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'> & {
      options: Array<Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>>;
    };
  }>;
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  lineComponents: Array<
    Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
      attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
      cost: {
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        amountPerQuantity: Pick<
          StorefrontAPI.MoneyV2,
          'currencyCode' | 'amount'
        >;
        compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
      };
      merchandise: Pick<
        StorefrontAPI.ProductVariant,
        'id' | 'availableForSale' | 'requiresShipping' | 'title'
      > & {
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        product: Pick<
          StorefrontAPI.Product,
          'handle' | 'title' | 'id' | 'vendor'
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
      };
      parentRelationship?: StorefrontAPI.Maybe<{
        parent: Pick<StorefrontAPI.CartLine, 'id'>;
      }>;
      sellingPlanAllocation?: StorefrontAPI.Maybe<{
        sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'> & {
          options: Array<
            Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
          >;
        };
      }>;
    }
  >;
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'> & {
      options: Array<Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>>;
    };
  }>;
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'id' | 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          parentRelationship?: StorefrontAPI.Maybe<{
            parent: Pick<StorefrontAPI.CartLine, 'id'>;
          }>;
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'> & {
              options: Array<
                Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
              >;
            };
          }>;
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          lineComponents: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
              cost: {
                totalAmount: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                amountPerQuantity: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
              };
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'availableForSale' | 'requiresShipping' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                product: Pick<
                  StorefrontAPI.Product,
                  'handle' | 'title' | 'id' | 'vendor'
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              };
              parentRelationship?: StorefrontAPI.Maybe<{
                parent: Pick<StorefrontAPI.CartLine, 'id'>;
              }>;
              sellingPlanAllocation?: StorefrontAPI.Maybe<{
                sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'> & {
                  options: Array<
                    Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
                  >;
                };
              }>;
            }
          >;
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id' | 'name'> & {
              options: Array<
                Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
              >;
            };
          }>;
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type CoffeeProductCardFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title' | 'tags' | 'description'
> & {
  taglineMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  tintColorMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  primaryColorMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
    }
  >;
};

export type HomeProductsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HomeProductsQuery = {
  shop: {
    coreRoasts?: StorefrontAPI.Maybe<{
      references?: StorefrontAPI.Maybe<{
        nodes: Array<
          | {
              __typename:
                | 'Article'
                | 'Collection'
                | 'GenericFile'
                | 'MediaImage'
                | 'Metaobject'
                | 'Model3d'
                | 'Page'
                | 'ProductVariant'
                | 'Video';
            }
          | ({__typename: 'Product'} & Pick<
              StorefrontAPI.Product,
              'id' | 'handle' | 'title' | 'tags' | 'description'
            > & {
                taglineMetafield?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
                tintColorMetafield?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
                primaryColorMetafield?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
                featuredImage?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'altText' | 'url' | 'width' | 'height'
                  >
                >;
                priceRange: {
                  minVariantPrice: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                };
                selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.ProductVariant,
                    'id' | 'availableForSale'
                  > & {
                    price: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                    product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                  }
                >;
              })
        >;
      }>;
    }>;
    featuredRoasts?: StorefrontAPI.Maybe<{
      references?: StorefrontAPI.Maybe<{
        nodes: Array<
          | {
              __typename:
                | 'Article'
                | 'Collection'
                | 'GenericFile'
                | 'MediaImage'
                | 'Metaobject'
                | 'Model3d'
                | 'Page'
                | 'ProductVariant'
                | 'Video';
            }
          | ({__typename: 'Product'} & Pick<
              StorefrontAPI.Product,
              'id' | 'handle' | 'title' | 'tags' | 'description'
            > & {
                taglineMetafield?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
                tintColorMetafield?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
                primaryColorMetafield?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
                featuredImage?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'altText' | 'url' | 'width' | 'height'
                  >
                >;
                priceRange: {
                  minVariantPrice: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                };
                selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.ProductVariant,
                    'id' | 'availableForSale'
                  > & {
                    price: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                    product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                  }
                >;
              })
        >;
      }>;
    }>;
  };
};

export type MoneyProductItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type ProductItemFragment = Pick<
  StorefrontAPI.Product,
  'availableForSale' | 'id' | 'handle' | 'productType' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  tintColorMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      products: {
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'availableForSale' | 'id' | 'handle' | 'productType' | 'title'
          > & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            tintColorMetafield?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type CollectionFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title' | 'tags' | 'description'
      > & {
        taglineMetafield?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        tintColorMetafield?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        primaryColorMetafield?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
          }
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'handle' | 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyItemFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'availableForSale' | 'id' | 'sku' | 'title'
> & {
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  image?: StorefrontAPI.Maybe<
    {__typename: 'Image'} & Pick<
      StorefrontAPI.Image,
      'id' | 'url' | 'altText' | 'width' | 'height'
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  sellingPlanAllocations: {
    nodes: Array<{
      checkoutChargeAmount: Pick<
        StorefrontAPI.MoneyV2,
        'amount' | 'currencyCode'
      >;
      remainingBalanceChargeAmount: Pick<
        StorefrontAPI.MoneyV2,
        'amount' | 'currencyCode'
      >;
      priceAdjustments: Array<{
        compareAtPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        perDeliveryPrice: Pick<
          StorefrontAPI.MoneyV2,
          'amount' | 'currencyCode'
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }>;
      sellingPlan: Pick<
        StorefrontAPI.SellingPlan,
        'id' | 'name' | 'recurringDeliveries'
      > & {
        options: Array<Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>>;
      };
    }>;
  };
};

export type ProductSellingPlanAllocationFragment = {
  checkoutChargeAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  remainingBalanceChargeAmount: Pick<
    StorefrontAPI.MoneyV2,
    'amount' | 'currencyCode'
  >;
  priceAdjustments: Array<{
    compareAtPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    perDeliveryPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  }>;
  sellingPlan: Pick<
    StorefrontAPI.SellingPlan,
    'id' | 'name' | 'recurringDeliveries'
  > & {options: Array<Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>>};
};

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | 'availableForSale'
  | 'id'
  | 'title'
  | 'tags'
  | 'vendor'
  | 'handle'
  | 'productType'
  | 'descriptionHtml'
  | 'description'
  | 'encodedVariantExistence'
  | 'encodedVariantAvailability'
> & {
  collections: {
    nodes: Array<Pick<StorefrontAPI.Collection, 'handle' | 'title'>>;
  };
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  media: {
    nodes: Array<
      | {__typename: 'ExternalVideo' | 'Model3d' | 'Video'}
      | ({__typename: 'MediaImage'} & Pick<
          StorefrontAPI.MediaImage,
          'id' | 'alt'
        > & {
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
          })
    >;
  };
  originMetafield?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  formatMetafield?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  coffeeMetafield?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  taglineMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  tintColorMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  primaryColorMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  pageTypeMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  eyebrowMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  factSheetEyebrowMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  factSheetTitleMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  factSheetDescriptionMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  materialMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  fabricWeightMetafield?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  fitMetafield?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  careMetafield?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'name'> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.ProductVariant,
              'availableForSale' | 'id' | 'sku' | 'title'
            > & {
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              image?: StorefrontAPI.Maybe<
                {__typename: 'Image'} & Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              sellingPlanAllocations: {
                nodes: Array<{
                  checkoutChargeAmount: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                  remainingBalanceChargeAmount: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                  priceAdjustments: Array<{
                    compareAtPrice: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    perDeliveryPrice: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    price: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                  }>;
                  sellingPlan: Pick<
                    StorefrontAPI.SellingPlan,
                    'id' | 'name' | 'recurringDeliveries'
                  > & {
                    options: Array<
                      Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
                    >;
                  };
                }>;
              };
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              }>;
            }
          >;
        }
      >;
    }
  >;
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      sellingPlanAllocations: {
        nodes: Array<{
          checkoutChargeAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          remainingBalanceChargeAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          priceAdjustments: Array<{
            compareAtPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            perDeliveryPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          }>;
          sellingPlan: Pick<
            StorefrontAPI.SellingPlan,
            'id' | 'name' | 'recurringDeliveries'
          > & {
            options: Array<
              Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
            >;
          };
        }>;
      };
    }
  >;
  adjacentVariants: Array<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      sellingPlanAllocations: {
        nodes: Array<{
          checkoutChargeAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          remainingBalanceChargeAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          priceAdjustments: Array<{
            compareAtPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            perDeliveryPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          }>;
          sellingPlan: Pick<
            StorefrontAPI.SellingPlan,
            'id' | 'name' | 'recurringDeliveries'
          > & {
            options: Array<
              Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
            >;
          };
        }>;
      };
    }
  >;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'availableForSale'
      | 'id'
      | 'title'
      | 'tags'
      | 'vendor'
      | 'handle'
      | 'productType'
      | 'descriptionHtml'
      | 'description'
      | 'encodedVariantExistence'
      | 'encodedVariantAvailability'
    > & {
      collections: {
        nodes: Array<Pick<StorefrontAPI.Collection, 'handle' | 'title'>>;
      };
      featuredImage?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
      >;
      media: {
        nodes: Array<
          | {__typename: 'ExternalVideo' | 'Model3d' | 'Video'}
          | ({__typename: 'MediaImage'} & Pick<
              StorefrontAPI.MediaImage,
              'id' | 'alt'
            > & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'altText' | 'url' | 'width' | 'height'
                  >
                >;
              })
        >;
      };
      originMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      formatMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      coffeeMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      taglineMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      tintColorMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      primaryColorMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      pageTypeMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      eyebrowMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      factSheetEyebrowMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      factSheetTitleMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      factSheetDescriptionMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      materialMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fabricWeightMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fitMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      careMetafield?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'name'> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'availableForSale' | 'id' | 'sku' | 'title'
                > & {
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    {__typename: 'Image'} & Pick<
                      StorefrontAPI.Image,
                      'id' | 'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  sellingPlanAllocations: {
                    nodes: Array<{
                      checkoutChargeAmount: Pick<
                        StorefrontAPI.MoneyV2,
                        'amount' | 'currencyCode'
                      >;
                      remainingBalanceChargeAmount: Pick<
                        StorefrontAPI.MoneyV2,
                        'amount' | 'currencyCode'
                      >;
                      priceAdjustments: Array<{
                        compareAtPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                        perDeliveryPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                        price: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      }>;
                      sellingPlan: Pick<
                        StorefrontAPI.SellingPlan,
                        'id' | 'name' | 'recurringDeliveries'
                      > & {
                        options: Array<
                          Pick<
                            StorefrontAPI.SellingPlanOption,
                            'name' | 'value'
                          >
                        >;
                      };
                    }>;
                  };
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url'>
                    >;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          sellingPlanAllocations: {
            nodes: Array<{
              checkoutChargeAmount: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              remainingBalanceChargeAmount: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              priceAdjustments: Array<{
                compareAtPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                perDeliveryPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              }>;
              sellingPlan: Pick<
                StorefrontAPI.SellingPlan,
                'id' | 'name' | 'recurringDeliveries'
              > & {
                options: Array<
                  Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
                >;
              };
            }>;
          };
        }
      >;
      adjacentVariants: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          sellingPlanAllocations: {
            nodes: Array<{
              checkoutChargeAmount: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              remainingBalanceChargeAmount: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              priceAdjustments: Array<{
                compareAtPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                perDeliveryPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              }>;
              sellingPlan: Pick<
                StorefrontAPI.SellingPlan,
                'id' | 'name' | 'recurringDeliveries'
              > & {
                options: Array<
                  Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
                >;
              };
            }>;
          };
        }
      >;
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
    }
  >;
};

export type ProductRecommendationsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type ProductRecommendationsQuery = {
  productRecommendations?: StorefrontAPI.Maybe<
    Array<
      Pick<
        StorefrontAPI.Product,
        'availableForSale' | 'handle' | 'id' | 'productType' | 'title'
      > & {
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        tintColorMetafield?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >
  >;
};

export type SearchProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'handle' | 'id' | 'publishedAt' | 'title' | 'trackingParameters' | 'vendor'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
      }
    >;
  };

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type PageInfoFragmentFragment = Pick<
  StorefrontAPI.PageInfo,
  'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
>;

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  term: StorefrontAPI.Scalars['String']['input'];
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type RegularSearchQuery = {
  pages: {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'handle'
        | 'id'
        | 'publishedAt'
        | 'title'
        | 'trackingParameters'
        | 'vendor'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  query HomeProducts($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      coreRoasts: metafield(namespace: "custom", key: "core_roasts") {\n        references(first: 5) {\n          nodes {\n            __typename\n            ... on Product {\n              ...CoffeeProductCard\n            }\n          }\n        }\n      }\n      featuredRoasts: metafield(namespace: "custom", key: "featured_roasts") {\n        references(first: 5) {\n          nodes {\n            __typename\n            ... on Product {\n              ...CoffeeProductCard\n            }\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment CoffeeProductCard on Product {\n    id\n    handle\n    title\n    tags\n    description\n    taglineMetafield: metafield(namespace: "custom", key: "tagline") {\n      value\n    }\n    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {\n      value\n    }\n    primaryColorMetafield: metafield(namespace: "custom", key: "primary_color") {\n      value\n    }\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    selectedOrFirstAvailableVariant {\n      id\n      availableForSale\n      price {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n': {
    return: HomeProductsQuery;
    variables: HomeProductsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment MoneyProductItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductItem on Product {\n    availableForSale\n    id\n    handle\n    productType\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductItem\n      }\n      maxVariantPrice {\n        ...MoneyProductItem\n      }\n    }\n    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {\n      value\n    }\n  }\n\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ProductItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n': {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  '#graphql\n  fragment Collection on Collection {\n    id\n    title\n    handle\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n  }\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...Collection\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n': {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  '#graphql\n  query Catalog(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(\n      first: $first\n      last: $last\n      before: $startCursor\n      after: $endCursor\n    ) {\n      nodes {\n        ...CoffeeProductCard\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment CoffeeProductCard on Product {\n    id\n    handle\n    title\n    tags\n    description\n    taglineMetafield: metafield(namespace: "custom", key: "tagline") {\n      value\n    }\n    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {\n      value\n    }\n    primaryColorMetafield: metafield(namespace: "custom", key: "primary_color") {\n      value\n    }\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    selectedOrFirstAvailableVariant {\n      id\n      availableForSale\n      price {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n': {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  '#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      handle\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageQuery;
    variables: PageQueryVariables;
  };
  '#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n  fragment PolicyItem on ShopPolicy {\n    id\n    title\n    handle\n  }\n  query Policies ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      privacyPolicy {\n        ...PolicyItem\n      }\n      shippingPolicy {\n        ...PolicyItem\n      }\n      termsOfService {\n        ...PolicyItem\n      }\n      refundPolicy {\n        ...PolicyItem\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: PoliciesQuery;
    variables: PoliciesQueryVariables;
  };
  '#graphql\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n  #graphql\n  fragment Product on Product {\n    availableForSale\n    id\n    title\n    tags\n    vendor\n    handle\n    productType\n    descriptionHtml\n    description\n    collections(first: 20) {\n      nodes {\n        handle\n        title\n      }\n    }\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    media(first: 20) {\n      nodes {\n        __typename\n        ... on MediaImage {\n          id\n          alt\n          image {\n            id\n            altText\n            url\n            width\n            height\n          }\n        }\n      }\n    }\n    originMetafield: metafield(namespace: "custom", key: "origin") {\n      value\n    }\n    formatMetafield: metafield(namespace: "custom", key: "format") {\n      value\n    }\n    coffeeMetafield: metafield(namespace: "custom", key: "coffee") {\n      value\n    }\n    taglineMetafield: metafield(namespace: "custom", key: "tagline") {\n      value\n    }\n    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {\n      value\n    }\n    primaryColorMetafield: metafield(namespace: "custom", key: "primary_color") {\n      value\n    }\n    pageTypeMetafield: metafield(namespace: "custom", key: "product_page_type") {\n      value\n    }\n    eyebrowMetafield: metafield(namespace: "custom", key: "pdp_eyebrow") {\n      value\n    }\n    factSheetEyebrowMetafield: metafield(namespace: "custom", key: "fact_sheet_eyebrow") {\n      value\n    }\n    factSheetTitleMetafield: metafield(namespace: "custom", key: "fact_sheet_title") {\n      value\n    }\n    factSheetDescriptionMetafield: metafield(namespace: "custom", key: "fact_sheet_description") {\n      value\n    }\n    materialMetafield: metafield(namespace: "custom", key: "material") {\n      value\n    }\n    fabricWeightMetafield: metafield(namespace: "custom", key: "fabric_weight") {\n      value\n    }\n    fitMetafield: metafield(namespace: "custom", key: "fit") {\n      value\n    }\n    careMetafield: metafield(namespace: "custom", key: "care") {\n      value\n    }\n    encodedVariantExistence\n    encodedVariantAvailability\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariant\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariant\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariant\n    }\n    seo {\n      description\n      title\n    }\n  }\n  #graphql\n  fragment ProductVariant on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n    sellingPlanAllocations(first: 10) {\n      nodes {\n        ...ProductSellingPlanAllocation\n      }\n    }\n  }\n  fragment ProductSellingPlanAllocation on SellingPlanAllocation {\n    checkoutChargeAmount {\n      amount\n      currencyCode\n    }\n    remainingBalanceChargeAmount {\n      amount\n      currencyCode\n    }\n    priceAdjustments {\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      perDeliveryPrice {\n        amount\n        currencyCode\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n    sellingPlan {\n      id\n      name\n      options {\n        name\n        value\n      }\n      recurringDeliveries\n    }\n  }\n\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query ProductRecommendations(\n    $country: CountryCode\n    $language: LanguageCode\n    $productId: ID!\n  ) @inContext(country: $country, language: $language) {\n    productRecommendations(productId: $productId, intent: RELATED) {\n      availableForSale\n      compareAtPriceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      featuredImage {\n        id\n        altText\n        url\n        width\n        height\n      }\n      handle\n      id\n      priceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      productType\n      tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {\n        value\n      }\n      title\n    }\n  }\n': {
    return: ProductRecommendationsQuery;
    variables: ProductRecommendationsQueryVariables;
  };
  '#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $term: String!\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n    products: search(\n      after: $endCursor,\n      before: $startCursor,\n      first: $first,\n      last: $last,\n      query: $term,\n      sortKey: RELEVANCE,\n      types: [PRODUCT],\n      unavailableProducts: HIDE,\n    ) {\n      nodes {\n        ...on Product {\n          ...SearchProduct\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  #graphql\n  fragment SearchProduct on Product {\n    __typename\n    handle\n    id\n    publishedAt\n    title\n    trackingParameters\n    vendor\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment PageInfoFragment on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n\n': {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
