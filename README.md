# ECO Skills

Reusable engineering workflows for AI coding agents.

ECO Skills help an agent plan substantial changes, preserve project context, review implementations, recover from failed debugging, and keep UI patterns consistent. They are designed to keep decisions visible and developers in control—not to replace engineering judgment.

The repository contains five portable `SKILL.md` packages for agents that support the skill format, including Codex, Claude Code, Cursor, Windsurf, and Cline. Invocation syntax can vary by agent.

## Choose a skill

| Skill | Use it when you need to… | Primary result |
| --- | --- | --- |
| [`architect`](skill/architect/SKILL.md) | Plan a substantial feature or resolve meaningful tradeoffs | Scoped implementation plan with acceptance criteria |
| [`remember`](skill/remember/SKILL.md) | Save work for a later session or restore a previous handoff | Current, secret-free `memory.md` context |
| [`review`](skill/review/SKILL.md) | Check a feature or diff for correctness and release risk | Prioritized, evidence-backed findings |
| [`recover`](skill/recover/SKILL.md) | Diagnose a failure or escape a stalled debugging loop | Targeted repair, clean handoff, or rethink plan |
| [`imprint`](skill/imprint/SKILL.md) | Capture reusable UI conventions or audit visual drift | Source-traceable `ui-registry.md` entries |

Use only the skills that fit the task. A small, clearly specified edit does not need a planning ceremony.

## Install

Install all skills from the repository:

```bash
npx skills@latest add Cyrus-11/ECO-agent-skill
```

Preview the skills before installing:

```bash
npx skills@latest add Cyrus-11/ECO-agent-skill --list
```

From a local checkout, verify discovery with:

```bash
npx skills@latest add . --list
```

After installation, invoke a skill using the syntax supported by your agent—for example, `/architect`, `$architect`, or a natural-language request that matches the skill description.

## How the skills work

### Architect

Use before substantial changes or decisions with meaningful tradeoffs.

`architect` inspects the project, resolves consequential uncertainty, and connects requirements to implementation steps, acceptance criteria, and verification. Planning-only requests stop at the plan; requests to plan and build can continue within the user's authorization.

Example:

```text
/architect Plan account deletion with a recovery window. Planning only.
```

### Remember

Use when handing work to another session or resuming from saved context.

`remember` maintains a concise project handoff rather than a transcript. It preserves durable decisions, unfinished work, verification results, and the next concrete step while excluding credentials and other secrets.

```text
/remember save
/remember restore
```

Saved memory remains project data: it can become stale, does not grant new authorization, and must be explicitly restored unless the host is configured to load it.

### Review

Use when a change needs a structured correctness or regression review.

`review` checks three layers:

1. Alignment with the request and acceptance criteria.
2. Integrity of interfaces, data flow, architecture, and project conventions.
3. Release risks, failure paths, and verification gaps.

Findings include severity, location, trigger, impact, evidence, and a suggested direction. Review-only requests do not modify product code.

```text
/review Review this diff for regressions. Do not make changes.
```

### Recover

Use when a build, runtime behavior, or debugging session has failed.

`recover` chooses the least disruptive response supported by evidence:

- **Targeted fix:** reproduce, isolate the cause, repair it, and verify the original failure.
- **Clean-session handoff:** preserve useful state and prepare context for a fresh investigation. This never means deleting files or resetting Git.
- **Rethink:** identify a contradicted assumption and plan the smallest viable change in approach.

```text
/recover Reproduce this failure, fix the root cause, and verify the repair.
```

### Imprint

Use when reusable UI patterns change or an interface has become inconsistent.

`imprint` records observed tokens, variants, states, responsive behavior, and semantic conventions in `ui-registry.md`. It keeps observations separate from approved design decisions so one inconsistent component does not silently become the standard.

```text
/imprint
/imprint src/components/Button.tsx
/imprint audit
```

## A practical engineering loop

```text
                    ┌──────────────┐
                    │  /remember   │  Save or restore context
                    └──────┬───────┘
                           │
/architect  →  Build  →  /review  →  Ship
                 │
                 ├── /imprint      Capture reusable UI patterns
                 └── /recover      Diagnose failures when needed
```

This is a menu, not a mandatory sequence. Use `remember` at handoff boundaries, `imprint` for reusable UI work, and `recover` only when investigation is needed.

## Design principles

- **Evidence before claims:** source inspection, tests, and runtime observations are reported separately.
- **Proportional process:** routine work stays routine; complex or risky changes receive more structure.
- **Visible uncertainty:** unresolved decisions and verification gaps are stated instead of guessed away.
- **Preserved ownership:** a skill does not authorize deployment, deletion, or unrelated changes.
- **Portable handoffs:** saved context is concise, current, and useful without depending on another installed skill.

## Validate and evaluate

Install dependencies and run the structural and harness tests:

```bash
npm install
npm test
```

List the eleven reproducible behavior scenarios:

```bash
npm run eval -- list
```

The test suite validates package structure and the evaluation harness; it does not run an AI agent or prove behavioral quality. See the [evaluation guide](evals/README.md) for isolated scenario runs and [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution checklist.

## Repository structure

```text
skill/       Installable skill packages and supporting references
evals/       Behavior scenarios and disposable project fixtures
scripts/     Validation and evaluation tooling
```

## Contributing

Bug reports, skill improvements, and new evaluation cases are welcome. Keep changes focused on behavior that materially improves an agent's decisions, then run `npm test` before opening a pull request.

## Author and license

Created by [ECO the 2x DEV](https://github.com/Cyrus-11). Licensed under the [MIT License](LICENSE).
