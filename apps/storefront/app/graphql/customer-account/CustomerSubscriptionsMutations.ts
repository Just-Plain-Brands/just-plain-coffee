export const SUBSCRIPTION_CANCEL_MUTATION = `#graphql
  mutation SubscriptionContractCancel($subscriptionContractId: ID!) {
    subscriptionContractCancel(
      subscriptionContractId: $subscriptionContractId
    ) {
      contract {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;
