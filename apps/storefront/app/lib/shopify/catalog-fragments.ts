export const COFFEE_PRODUCT_CARD_FRAGMENT = `#graphql
  fragment CoffeeProductCard on Product {
    id
    handle
    title
    tags
    description
    taglineMetafield: metafield(namespace: "custom", key: "tagline") {
      value
    }
    tintColorMetafield: metafield(namespace: "custom", key: "tint_color") {
      value
    }
    primaryColorMetafield: metafield(namespace: "custom", key: "primary_color") {
      value
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    selectedOrFirstAvailableVariant {
      id
      availableForSale
      price {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
      product {
        handle
        title
      }
    }
  }
` as const;
