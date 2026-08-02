const SUBSCRIPTION_CONTRACT_FRAGMENT = `#graphql
  fragment SubscriptionBillingPolicy on SubscriptionBillingPolicy {
    interval
    intervalCount {
      count
      precision
    }
  }

  fragment SubscriptionDiscount on SubscriptionDiscount {
    id
    title
    value {
      __typename
      ... on SubscriptionDiscountFixedAmountValue {
        amount {
          amount
          currencyCode
        }
      }
      ... on SubscriptionDiscountPercentageValue {
        percentage
      }
    }
  }

  fragment SubscriptionContract on SubscriptionContract {
    id
    status
    createdAt
    nextBillingDate
    appEligibleForCustomerActions
    billingPolicy {
      ...SubscriptionBillingPolicy
    }
    discounts(first: 20) {
      nodes {
        ...SubscriptionDiscount
      }
    }
    lines(first: 100) {
      nodes {
        id
        name
        quantity
        currentPrice {
          amount
          currencyCode
        }
      }
    }
  }
` as const;

export const SUBSCRIPTIONS_CONTRACTS_QUERY = `#graphql
  query SubscriptionsContracts {
    customer {
      subscriptionContracts(first: 100) {
        nodes {
          ...SubscriptionContract
        }
      }
    }
  }
  ${SUBSCRIPTION_CONTRACT_FRAGMENT}
` as const;
