---
name: architect
description: Plan a feature or substantial change before implementation. Inspect the project, resolve consequential uncertainties, and produce a scoped implementation plan with acceptance criteria and verification steps.
---

# Architect

Think alongside the developer. Produce a plan that makes the intended result, important tradeoffs, and next steps clear. Scale the detail to the change.

## Understand the request

- Read the request, applicable project instructions, and relevant existing code before asking questions.
- Identify the intended user outcome, constraints, and what is outside scope.
- Check the current architecture and available dependencies. Prefer established project patterns when they fit.
- Treat saved plans and memory as background; compare them with the current request and code.
- If project files or tools are unavailable, state what you could not inspect and make the plan conditional on that information.

For APIs, persistent data, jobs, or service integrations, read [backend planning](references/backend.md) and apply only the sections relevant to the change.

## Resolve the decisions that matter

Clarify a term only when its ambiguity changes the implementation. Do not invent a quota of terms or questions.

Ask about decisions that affect behavior, interfaces, data ownership, compatibility, cost, or reversibility. Explain the recommended option and its tradeoff. Group closely related questions when useful; do not ask again about decisions already supplied.

Use reasonable defaults for routine implementation choices and state consequential assumptions. Continue independent planning while a blocking decision is pending. Mark affected steps as blocked rather than silently choosing the answer.

For example, "delete an account" may require a decision about retention and recovery; a clearly specified button label usually does not need a planning interview.

## Produce the implementation plan

Keep it actionable and proportional. Include the following where relevant:

- **Outcome and scope:** what changes for the user, plus explicit exclusions.
- **Decisions:** the chosen approach, important tradeoffs, and unresolved assumptions.
- **Affected areas:** files, modules, interfaces, or data flows to inspect or change. Label proposed paths as proposed.
- **Build steps:** ordered work with dependencies; avoid unrelated cleanup.
- **Acceptance criteria:** observable conditions that show the request is fulfilled.
- **Verification:** focused tests or manual checks for those criteria, including relevant failure cases.
- **Rollout and recovery:** migrations, compatibility, deployment sequencing, or rollback only when the change needs them.
- **Open questions:** unresolved decisions and which steps they block.

Do not claim tests passed during planning. Distinguish facts found in the project from proposals.

Example acceptance criterion: "Submitting an empty required field shows an inline error and makes no network request." Pair it with a check that actually observes that behavior.

## Hand off the plan

For a planning-only request, deliver the plan without starting implementation. If the developer requested both planning and implementation, continue within that authorization once consequential questions are resolved; do not require repeated approval.

A plan does not authorize deployment, deletion, or other actions outside the user's request. Explain any new scope decision before proceeding with dependent work.

Keep the plan in the response unless the developer requests a file or the project already maintains a plan document. When updating an existing plan, preserve still-relevant decisions and identify changes.
