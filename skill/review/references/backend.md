# Backend review

Trace concrete failure paths before reporting them. Name the relevant request, concurrent interleaving, or partial failure; do not report a missing technology as a defect by itself.

## Access and data boundaries

- Follow the authenticated actor through resource lookup and mutation. Check ownership and tenant predicates at the point where access occurs.
- Inspect which client-supplied fields can be written. Avoid confusing authentication with authorization or trusting a supplied owner ID.
- Check response fields and logs for unintended disclosure, using the application's actual data sensitivity and contract.

## Integrity and concurrency

- Trace multi-write operations and failure paths. Confirm that required invariants survive a partial failure.
- Examine check-then-write sequences under concurrent requests. Identify the constraint, lock, conditional write, or isolation guarantee that protects them.
- For retried requests or jobs, inspect durable deduplication, operation-key scope, changed payloads using the same key, and behavior after a committed effect loses its response.
- Treat mocks as evidence of application behavior, not proof of database isolation or provider guarantees. State when an integration/concurrency test is still needed.

## Compatibility and migrations

- Check old and new clients, or old and new application instances during rolling deployment, against the changed contract/schema.
- Inspect destructive migrations, defaults, existing nulls, backfill resumability, and potentially blocking schema changes in context.
- Ask what code rollback can actually recover after a data transformation. Do not assume a down migration restores deleted data.

## Jobs and service failures

- Check timeout scope, retry limits, duplicate deliveries, acknowledgment timing, and permanent versus transient failures where these affect the change.
- An ambiguous external result needs reconciliation or a supported idempotent retry; blindly retrying a side effect can duplicate it.
- Report performance risks with a plausible workload or query path. Prefer evidence such as unbounded results, repeated queries, or lock contention to speculative optimization.

## Report boundaries

Include the smallest source location that explains each defect and a reproduction/check when feasible. If no database, provider sandbox, or runtime is available, state that gap instead of claiming the integration was verified.

Consult the actual database/provider documentation before relying on its guarantees; for example, [PostgreSQL isolation behavior](https://www.postgresql.org/docs/current/transaction-iso.html) and [Stripe retry semantics](https://docs.stripe.com/api/idempotent_requests) are specific to those systems.
