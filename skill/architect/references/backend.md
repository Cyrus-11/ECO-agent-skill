# Backend planning

Use the existing stack and documented contracts. These questions guide relevant decisions; they are not a checklist to impose on every endpoint.

## Contracts and ownership

Trace caller -> input validation -> authentication -> resource authorization -> storage or external effect -> response. Identify who owns the data, including tenant boundaries. A valid login does not grant access to every resource.

Specify observable request, response, and error behavior. Check existing clients before changing fields, status codes, pagination, or ordering. Separate product requirements from technical defaults.

## Atomic state changes

Identify invariants such as balances not going negative or an order having only one completed fulfillment. State which writes must commit together.

Choose transaction boundaries, constraints, conditional updates, or locking based on the actual database. A transaction alone does not eliminate every concurrent read/update race; verify the relevant isolation behavior. Include concurrent tests where an invariant depends on it.

## Retries and external effects

For operations that can be retried, define the logical operation identifier, its user/tenant scope, payload compatibility, duplicate-response behavior, and retention period. Handle concurrent duplicates with a durable constraint or equivalent coordination; a check followed by an unprotected insert can race.

Consider crashes before and after the effect, including a committed operation whose response was lost. Do not promise exactly-once behavior across independent services without identifying the mechanism and its limits.

If a database write and external notification must stay consistent, consider the project's existing durable-job or outbox pattern. Do not introduce distributed infrastructure without a concrete requirement. Determine provider retry/idempotency semantics from the provider's actual contract.

## Migrations and rollout

For overlapping old/new application versions, plan an additive schema phase, compatible application change, verified backfill, then removal of obsolete fields when safe. Consider lock duration, index creation, and resumable backfills for large tables.

Distinguish application rollback from data recovery. Reverting code cannot restore deleted or irreversibly transformed data. State the recovery approach before a destructive step.

## Verification and operations

Select checks for the actual risks: invalid input, wrong owner/tenant, duplicate requests, concurrent writes, partial failure, migration compatibility, or timeouts. Include useful redacted logs and request/job identifiers when diagnosing the feature would otherwise be difficult.

## Sources to consult when applicable

These examples illustrate why provider-specific behavior matters; they do not prescribe a stack:

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [Stripe idempotent request semantics](https://docs.stripe.com/api/idempotent_requests)
