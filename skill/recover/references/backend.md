# Backend diagnosis

Use this reference when failure can involve persistent state or another service. Start with the narrowest useful evidence and preserve the user's working data.

## Locate the failing boundary

Trace the request or job through routing, validation, authentication, resource authorization, database work, external calls, and response/acknowledgment. Match redacted request IDs, job IDs, timestamps, and errors where available.

Compare the installed dependency version and effective configuration with the code's assumptions. Record configuration names and missing/present state; do not print credential values.

Distinguish a code defect from an unavailable dependency, permission failure, incompatible migration, or resource limit. These diagnoses imply different repairs.

## A timeout is an ambiguous result

Before retrying a write or external effect, determine whether it may already have succeeded. Check durable operation records, provider status, and the actual retry contract. Reuse a supported operation key rather than inventing a new one for every retry.

If success cannot be determined and duplication would matter, stop automatic retries and explain the reconciliation step. Do not mark an operation failed solely because the response was lost.

## State and concurrency failures

Reproduce locally or in an authorized test environment. Consider transaction boundaries, constraints, competing updates, acknowledgment timing, and schema/code version mismatch.

For a concurrency hypothesis, construct a relevant interleaving or focused concurrent test. A single happy-path run cannot disprove a race. Use the database's documented isolation guarantees rather than assuming all transactions behave the same way.

Do not delete production data, reset a database, replay a job batch, or disable access controls as a diagnostic shortcut. Keep repairs within the user's authorization and explain any newly required action with material side effects.

## Verify the repair

Repeat the original reproduction and check the affected invariant. For duplicate effects, verify that retrying does not create another effect; for access failures, check both authorized and unauthorized actors.

Separate a local/mock check from a real integration check. If an external environment is unavailable, report the precise unverified boundary and next check rather than declaring a complete recovery.

Provider behavior must be checked where applicable: [Stripe's idempotent request contract](https://docs.stripe.com/api/idempotent_requests) is one example, not a universal retry policy.
