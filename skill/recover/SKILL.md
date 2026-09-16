---
name: recover
description: Diagnose a failed build, runtime error, regression, or stalled debugging session. Choose a targeted fix, a clean-session handoff, or an architectural rethink using evidence, then verify authorized repairs.
---

# Recover

Choose the recovery approach from evidence. Repeated failed attempts are useful history, but do not by themselves prove that the session or architecture must be replaced.

## Gather the minimum useful evidence

Read the reported problem, relevant code, recent changes, and available errors before asking for information. Establish:

- Expected behavior and the actual result.
- A reproduction or failing check, including the relevant environment.
- Recent changes and any known working state.
- Previous fixes and what each attempt actually demonstrated.

Ask only for missing information you cannot obtain. Keep credentials and private data out of diagnostic output.

Separate observations from hypotheses. If evidence is insufficient, identify the next discriminating check instead of asserting a root cause.

For API, database, queue, or integration failures, consult [backend diagnosis](references/backend.md) before retrying operations with side effects.

## Choose a recovery mode

| Mode | Evidence | Response |
| --- | --- | --- |
| Targeted fix | A defect can be narrowed to a behavior, dependency, configuration, or interface | Reproduce, isolate the cause, make a focused repair, verify |
| Hard reset / clean-session handoff | Conflicting assumptions or lost context prevent a coherent investigation | Preserve working state and prepare a concise handoff |
| Rethink | A core requirement or technical assumption is contradicted by evidence | Explain the failed assumption and plan the smallest viable change in approach |

Modes can overlap. State the current diagnosis, evidence, and uncertainty. Prefer the least disruptive response that addresses the problem. Environment failures, unavailable services, and dependency mismatches do not automatically require a rewrite.

## Targeted fix

1. Reproduce the failure when feasible. Otherwise explain the limit and gather the closest reliable evidence.
2. Trace the failing behavior through relevant callers and dependencies. Test a specific hypothesis.
3. Explain the cause and the proposed change. If the user requested a fix, make the focused repair within that scope. For diagnosis-only requests, report it without editing.
4. Verify the original failure is resolved and check nearby behavior that the change could affect. Use a regression test when it protects meaningful behavior; do not add tests that merely mirror implementation.
5. Report the change, checks, and remaining uncertainty.

If a fix fails, compare the result with the hypothesis before trying again. Undo only changes attributable to your failed attempt when appropriate, preserving the user's work.

Each new attempt should test a new or refined hypothesis. When attempts produce no new evidence, stop patching and state the blocker or propose a different diagnostic approach. Do not restart the session solely because an arbitrary retry count was reached.

## Hard reset means context, not file deletion

A "hard reset" here is a fresh conversation with a clear handoff. It is not permission to run Git reset/clean, discard edits, delete files, or reinstall the project.

Prepare a handoff containing:

- Original objective and expected behavior.
- Current branch/commit and uncommitted work, if available.
- Reproduction steps and observed errors, with sensitive values removed.
- Confirmed facts, unresolved hypotheses, and failed approaches.
- Useful work to preserve and the next diagnostic step.

Present the handoff in the response, or save it to a user-requested/project-established location. Preserve existing notes when updating them. The handoff must be usable without another installed skill.

Explain how a fresh session may help. Do not claim to clear context or restart the agent unless the host actually provides that capability. The user may choose to continue with the clarified evidence.

## Rethink

Identify the assumption, the evidence contradicting it, and the consequences. Avoid calling the entire implementation unsalvageable when a smaller boundary can change.

Describe the viable approach, reusable work, affected interfaces/data, verification, and any necessary migration or recovery steps.

For a new architectural decision outside existing authorization, resolve that decision before rebuilding. If the user already selected and authorized the approach, proceed within that scope.

## Completion

A proposed fix is not a verified fix. State what was actually reproduced, changed, and checked. If blocked, provide the next concrete action and the information or access needed.
