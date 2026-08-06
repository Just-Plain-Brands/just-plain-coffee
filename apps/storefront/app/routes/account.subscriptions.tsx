import {Money} from '@shopify/hydrogen';
import type {
  SubscriptionBillingPolicyFragment,
  SubscriptionContractFragment,
  SubscriptionDiscountFragment,
} from 'customer-accountapi.generated';
import {data, useFetcher, useLoaderData} from 'react-router';

import {SUBSCRIPTION_CANCEL_MUTATION} from '~/graphql/customer-account/CustomerSubscriptionsMutations';
import {SUBSCRIPTIONS_CONTRACTS_QUERY} from '~/graphql/customer-account/CustomerSubscriptionsQuery';

import type {Route} from './+types/account.subscriptions';

type ActionResponse =
  | {kind: 'success'; contractId: string}
  | {kind: 'error'; message: string};

export const meta: Route.MetaFunction = () => [{title: 'Subscriptions'}];

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  await customerAccount.handleAuthStatus();

  const {data: subscriptions, errors} = await customerAccount.query(
    SUBSCRIPTIONS_CONTRACTS_QUERY,
  );

  if (errors?.length || !subscriptions?.customer) {
    throw new Error('Customer subscriptions could not be loaded.');
  }

  return {subscriptions};
}

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'DELETE') {
    return data<ActionResponse>(
      {kind: 'error', message: 'Method not allowed.'},
      {status: 405},
    );
  }

  const formData = await request.formData();
  const contractId = formData.get('contractId');

  if (typeof contractId !== 'string' || !contractId) {
    return data<ActionResponse>(
      {kind: 'error', message: 'Subscription ID is required.'},
      {status: 400},
    );
  }

  try {
    const {data: result, errors} = await context.customerAccount.mutate(
      SUBSCRIPTION_CANCEL_MUTATION,
      {variables: {subscriptionContractId: contractId}},
    );
    const userError = result?.subscriptionContractCancel?.userErrors[0];

    if (errors?.length) throw new Error(errors[0].message);
    if (userError) throw new Error(userError.message);
    if (!result?.subscriptionContractCancel?.contract) {
      throw new Error('Subscription could not be cancelled.');
    }

    return data<ActionResponse>({kind: 'success', contractId});
  } catch (error: unknown) {
    return data<ActionResponse>(
      {
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Subscription could not be cancelled.',
      },
      {status: 400},
    );
  }
}

export default function AccountSubscriptions() {
  const {subscriptions} = useLoaderData<typeof loader>();
  const contracts = subscriptions.customer.subscriptionContracts.nodes;

  return (
    <section
      className="account-subscriptions"
      aria-labelledby="subscriptions-heading"
    >
      <h2 id="subscriptions-heading">My subscriptions</h2>
      <br />
      {contracts.length > 0 ? (
        <div className="grid gap-4">
          {contracts.map((contract) => (
            <SubscriptionContractCard contract={contract} key={contract.id} />
          ))}
        </div>
      ) : (
        <p>You don&apos;t have any subscriptions yet.</p>
      )}
    </section>
  );
}

function SubscriptionContractCard({
  contract,
}: {
  contract: SubscriptionContractFragment;
}) {
  const fetcher = useFetcher<ActionResponse>();
  const isCancelling = fetcher.state !== 'idle';
  const actionError =
    fetcher.data?.kind === 'error' ? fetcher.data.message : null;

  return (
    <article className="rounded-3xl bg-neutral-100 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold tracking-[0.1em] text-primary uppercase">
            {formatContractStatus(contract.status)}
          </p>
          <h3 className="mt-1 text-2xl">
            {contract.lines.nodes.map((line) => line.name).join(', ')}
          </h3>
        </div>
        <p className="font-bold">
          {formatBillingInterval(contract.billingPolicy)}
        </p>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-bold tracking-[0.1em] text-neutral-600 uppercase">
            Next order
          </dt>
          <dd className="mt-1 font-semibold">
            {contract.nextBillingDate
              ? new Date(contract.nextBillingDate).toLocaleDateString()
              : 'Not scheduled'}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold tracking-[0.1em] text-neutral-600 uppercase">
            Price
          </dt>
          <dd className="mt-1 font-semibold">
            {contract.lines.nodes[0] ? (
              <Money data={contract.lines.nodes[0].currentPrice} />
            ) : (
              '—'
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold tracking-[0.1em] text-neutral-600 uppercase">
            Savings
          </dt>
          <dd className="mt-1 font-semibold">
            {formatDiscounts(contract.discounts?.nodes ?? [])}
          </dd>
        </div>
      </dl>

      {actionError ? (
        <p className="mt-4 text-sm font-semibold text-red-700" role="alert">
          {actionError}
        </p>
      ) : null}

      {contract.status === 'ACTIVE' &&
      contract.appEligibleForCustomerActions ? (
        <fetcher.Form
          className="mt-5"
          method="delete"
          onSubmit={(event) => {
            if (
              !window.confirm(
                'Cancel this subscription? This cannot be undone.',
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <input name="contractId" type="hidden" value={contract.id} />
          <button
            className="text-sm font-bold text-neutral-600 underline underline-offset-4 hover:text-neutral-900 disabled:opacity-40"
            disabled={isCancelling}
            type="submit"
          >
            {isCancelling ? 'Cancelling…' : 'Cancel subscription'}
          </button>
        </fetcher.Form>
      ) : null}
    </article>
  );
}

function formatBillingInterval(
  billingPolicy: SubscriptionBillingPolicyFragment,
): string {
  const count = billingPolicy.intervalCount?.count ?? 1;
  const unit = billingPolicy.interval.toLowerCase();
  return `Every ${count} ${unit}${count === 1 ? '' : 's'}`;
}

function formatContractStatus(
  status: SubscriptionContractFragment['status'],
): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatDiscounts(discounts: SubscriptionDiscountFragment[]): string {
  if (discounts.length === 0) return '—';

  return discounts
    .map((discount) => {
      const {value} = discount;
      switch (value?.__typename) {
        case 'SubscriptionDiscountPercentageValue':
          return `${value.percentage}% off`;
        case 'SubscriptionDiscountFixedAmountValue':
          return `${value.amount.amount} ${value.amount.currencyCode} off`;
        default:
          return discount.title ?? 'Discount applied';
      }
    })
    .join(', ');
}
