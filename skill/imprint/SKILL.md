---
name: imprint
description: Capture reusable UI patterns from components into ui-registry.md or audit an existing interface for inconsistencies. Use when documenting design conventions, updating a UI registry, or checking visual consistency.
allowed-tools: Read Grep Glob Write Edit
---

# Imprint

Record evidence about reusable UI patterns. Keep observed implementations separate from an approved design baseline so one inconsistent component does not become a rule for the whole project.

## Modes and scope

- `/imprint`: capture the components changed in the current task.
- `/imprint [filepath]`: capture a specific component.
- `/imprint audit`: inspect the requested UI scope and propose a baseline.

Use the requested registry location, then the project's established location, otherwise `ui-registry.md` in the project root. Read existing entries before changing them.

Use session context and relevant diffs to identify components. Do not infer the target solely from modification times or sweep unrelated edits into a capture. If the target is unclear, ask.

An existing UI does not require a full audit before a targeted capture. For an audit, inspect the requested scope; exclude generated output and dependencies. If sampling is necessary, report the selection and coverage limits.

## Inspect the sources of styling

Read the component plus the styles, tokens, theme configuration, and shared primitives that determine its appearance. Support the project's actual styling approach: CSS, CSS modules, utility classes, styled components, or equivalent.

Capture reusable patterns where present:

- Background, foreground, border, radius, and shadow.
- Typography hierarchy and component spacing.
- Interactive states, including keyboard focus, disabled, error, selected, and loading.
- Theme and responsive variants that change the pattern.
- Shared dimensions, layout, or motion when they are established conventions, such as control heights or reduced-motion behavior.

Distinguish reusable rules from one-off layout choices. Do not discard a responsive or dark-mode variant just to record a simpler base value.

Record symbolic tokens and their source. If a value depends on runtime data or cannot be resolved, say so rather than inventing a computed value. Source inspection alone does not verify rendered appearance, contrast, or keyboard behavior.

## Capture into the registry

Find the entry by component identity, source path, and variant. Update that entry in place; repeated captures should not create duplicates.

Keep deliberate variants separate, such as destructive and primary buttons or compact and spacious cards. Record exceptions and their reasons when known.

For each entry, include:

```markdown
### [Component / variant]

Source: [relative path and symbol]
Updated: [actual available date]
Status: [observed / approved baseline / unresolved conflict]
Source state: [current / needs recheck / missing / retired; reason when relevant]

| Property or state | Token, class, or value | Source / context |
| --- | --- | --- |
| [property] | [observed value] | [definition or condition] |

Notes: [intentional variations, unresolved values, supporting decisions]
Verification: [source inspection; rendering checks only if performed]
```

Preserve existing decisions and human notes. Do not overwrite an approved baseline because the newest component differs from it. Record the conflicting observation and explain the discrepancy.

Use "approved" only when supported by an existing project standard or an explicit developer decision. A frequent pattern is a candidate baseline, not proof that it is correct.

Confirm which entries were added or updated and any unresolved conflicts. Capturing patterns does not authorize changing component code.

## Reconcile stale entries

Check source paths, exported symbols, and relevant token definitions before updating or reusing an entry. A recent registry timestamp alone does not prove that its sources are current. Keep source freshness separate from design approval: an approved decision can outlive its original component.

- **Moved or renamed component:** establish continuity from the current source, imports, available diff/history, or a documented move. Update the existing entry's path and symbol, retaining variants, decisions, and human notes; note the former identity when useful. Similar names or styles alone are not proof of a rename. If identity remains ambiguous, mark it for recheck rather than merging unrelated entries.
- **Missing source:** make a bounded search in the relevant project area for a move or replacement. Mark the source missing if it cannot be found. Use retired only when deletion or replacement is supported by evidence, and identify a known replacement. Preserve the entry and its decision history; do not silently remove it or treat its old observations as current implementation guidance.
- **Changed shared token or primitive:** re-read the definition and affected conditions, including theme overrides, even if the component file is unchanged. Refresh inspected observations and record any conflict with an approved baseline without changing that decision. Identify other registry entries referencing the changed source; mark affected observations as needing recheck when they have not been inspected. A targeted capture need not become a full codebase audit.

Advance an entry's verification date or claim only for the sources and states actually rechecked. Retain earlier rendering evidence as historical if relevant; source inspection does not renew it. Report entries updated, missing or retired sources, and remaining rechecks with their reasons. Leave unrelated notes and entries intact.

## Audit

1. Establish the relevant design system, registry, and UI scope.
2. Compare components with equivalent roles, states, themes, and density variants.
3. Report deviations with source locations, expected patterns, and concrete effects. Separate intentional variants and unresolved cases from actual conflicts.
4. Recommend a baseline based on documented tokens and design decisions, supported by consistent examples.
5. Where the baseline requires new design choices, present the choices for confirmation before marking them approved. Already authorized or established standards do not need repeated approval.
6. Record the agreed baseline without erasing existing observations or unresolved conflicts, then list components that need changes.

Hardcoded values are findings only when they conflict with an established convention or create a concrete problem. A project without design tokens does not automatically need a new token system.

An audit reports and records patterns. If the developer also requested UI fixes, apply those within scope and verify the changed behavior; otherwise leave component code unchanged.

## Reuse

Consult relevant registry entries during subsequent UI work when this skill is active. Other sessions or agents must explicitly load the registry or follow existing project instructions that reference it; the file does not enforce itself.

Do not silently edit agent configuration to make the registry load automatically. Reconcile stale entries before using their observations as current evidence; a missing source does not by itself revoke a documented design decision.
