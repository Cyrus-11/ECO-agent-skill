---
name: review
description: Review a feature, diff, or implementation for requirement gaps, regressions, project consistency, and release risks. Report prioritized findings with evidence and explicit verification limits.
---

# Review

Review the requested change against its requirements and actual project conventions. Make findings actionable and distinguish observed defects from unverified risks.

## Establish scope and expectations

- Use the requested files, commit range, or feature as the scope. For a Git diff, establish the comparison base and include relevant staged, unstaged, and new files.
- Read the request, available implementation plan, and applicable project instructions. A separate architect plan is optional.
- If no plan exists, use the stated requirements and code context. Ask only when missing intent prevents a meaningful correctness judgment.
- Inspect changed code and the callers, dependencies, or tests needed to understand its effects. State coverage limits.
- Distinguish new regressions from pre-existing issues; include pre-existing problems only when they materially affect the requested change.

For APIs, database changes, workers, or service integrations, consult [backend review](references/backend.md). Report only checks and risks relevant to the reviewed scope.

## Review in three layers

### 1. Plan alignment

Check the requested behavior, acceptance criteria, scope, and explicit decisions. Trace important requirements to the implementation. Do not treat every unplanned implementation detail as a defect.

### 2. System integrity

Check the project's actual architecture, interfaces, data flow, error handling conventions, and design system where relevant.

Do not impose generic bans such as "no database calls in components": validity depends on the framework and execution boundary. Explain the concrete consequence of a violated convention.

For UI changes, distinguish intentional variants from accidental drift. Use an existing design system or registry as evidence, not as unquestionable authority.

### 3. Release risks and verification

Check applicable failure paths: invalid or missing input, empty/loading/error states, permissions and ownership, data integrity, concurrency, compatibility, accessibility, and performance concerns supported by the code.

Run relevant existing checks when tools and scope permit. Inspect test coverage of changed behavior. Record the command or manual check and its outcome. Distinguish failures caused by the change from missing dependencies or environment failures.

Do not claim to have observed browser behavior, logs, or runtime results from reading source alone. An unavailable environment is a verification gap, not proof that the code is defective. Avoid tests that mutate live services without authorization.

## Report findings

Lead with the most consequential findings. For each, provide:

- **Severity and title**
- **Location:** file and line, function, or affected requirement
- **Trigger:** conditions that expose the problem
- **Impact and evidence:** what fails and how you know
- **Suggested direction:** a concise fix or next diagnostic check when useful

Use impact to set severity:

| Severity | Meaning |
| --- | --- |
| Critical | Credible risk of severe data loss, unauthorized access, or widespread failure |
| High | A core requirement or common user flow fails |
| Medium | A supported edge case fails or a meaningful maintenance/consistency issue has a concrete consequence |
| Low | A limited, non-blocking issue worth addressing |

Do not promote style preferences or speculative optimizations into defects. Separate uncertain concerns from confirmed findings and explain what would resolve the uncertainty.

Finish with:

- Coverage of the three review layers.
- Checks performed and results, including checks not run.
- Remaining questions and release risks.

If nothing actionable was found, say "No actionable findings within the reviewed scope" and state any validation limits. A clean review alone does not prove that a feature is ready to ship.

## Respect the requested workflow

For review-only requests, report findings without editing product code. If the developer explicitly requested review and fixes, complete the review, apply authorized fixes, and verify them. Do not ask again for permission already given.

Do not commit, push, deploy, or expand the review into unrelated refactoring merely because the skill was invoked.
