const SHOPIFY_ADMIN_API_VERSION = '2026-04';

const UPSERT_CUSTOMER_MUTATION = `
  mutation NewsletterCustomerUpsert(
    $identifier: CustomerSetIdentifiers
    $input: CustomerSetInput!
  ) {
    customerSet(identifier: $identifier, input: $input) {
      customer {
        id
      }
      userErrors {
        message
      }
    }
  }
`;

const UPDATE_EMAIL_CONSENT_MUTATION = `
  mutation NewsletterEmailConsentUpdate(
    $input: CustomerEmailMarketingConsentUpdateInput!
  ) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        message
      }
    }
  }
`;

type NewsletterAdminApiConfig = {
  accessToken: string;
  storeDomain: string;
};

type SubscribeToNewsletterOptions = NewsletterAdminApiConfig & {
  email: string;
};

export async function subscribeToNewsletter({
  accessToken,
  email,
  storeDomain,
}: SubscribeToNewsletterOptions) {
  const customerId = await upsertCustomer({accessToken, email, storeDomain});

  await updateEmailMarketingConsent({
    accessToken,
    customerId,
    storeDomain,
  });
}

async function upsertCustomer({
  accessToken,
  email,
  storeDomain,
}: SubscribeToNewsletterOptions) {
  const payload = await shopifyAdminGraphql({
    accessToken,
    query: UPSERT_CUSTOMER_MUTATION,
    storeDomain,
    variables: {
      identifier: {email},
      input: {email},
    },
  });

  return readMutationCustomerId(payload, 'customerSet');
}

async function updateEmailMarketingConsent({
  accessToken,
  customerId,
  storeDomain,
}: NewsletterAdminApiConfig & {customerId: string}) {
  const payload = await shopifyAdminGraphql({
    accessToken,
    query: UPDATE_EMAIL_CONSENT_MUTATION,
    storeDomain,
    variables: {
      input: {
        customerId,
        emailMarketingConsent: {
          consentUpdatedAt: new Date().toISOString(),
          marketingOptInLevel: 'SINGLE_OPT_IN',
          marketingState: 'SUBSCRIBED',
        },
      },
    },
  });

  readMutationCustomerId(payload, 'customerEmailMarketingConsentUpdate');
}

async function shopifyAdminGraphql({
  accessToken,
  query,
  storeDomain,
  variables,
}: NewsletterAdminApiConfig & {
  query: string;
  variables: Record<string, unknown>;
}) {
  const domain = normalizeShopifyDomain(storeDomain);
  const response = await fetch(
    `https://${domain}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`,
    {
      body: JSON.stringify({query, variables}),
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      method: 'POST',
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify Admin API returned HTTP ${response.status}.`);
  }

  return response.json();
}

function normalizeShopifyDomain(value: string) {
  const domain = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .split('/')[0];

  if (!domain || !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain)) {
    throw new Error('Shopify Admin store domain is invalid.');
  }

  return domain;
}

function readMutationCustomerId(payload: unknown, mutationName: string) {
  const root = readRecord(payload, 'Shopify Admin API response');
  const graphQLErrors = root.errors;

  if (Array.isArray(graphQLErrors) && graphQLErrors.length > 0) {
    throw new Error(
      readErrorMessage(graphQLErrors[0], 'Shopify GraphQL error'),
    );
  }

  const data = readRecord(root.data, 'Shopify GraphQL data');
  const mutation = readRecord(data[mutationName], mutationName);
  const userErrors = mutation.userErrors;

  if (!Array.isArray(userErrors)) {
    throw new Error(`${mutationName} did not return user errors.`);
  }

  if (userErrors.length > 0) {
    throw new Error(readErrorMessage(userErrors[0], `${mutationName} failed`));
  }

  const customer = readRecord(mutation.customer, `${mutationName} customer`);

  if (typeof customer.id !== 'string' || customer.id.length === 0) {
    throw new Error(`${mutationName} did not return a customer ID.`);
  }

  return customer.id;
}

function readRecord(value: unknown, label: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`${label} has an unexpected shape.`);
  }

  return value;
}

function readErrorMessage(value: unknown, fallback: string) {
  if (!isRecord(value)) return fallback;

  return typeof value.message === 'string' ? value.message : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
