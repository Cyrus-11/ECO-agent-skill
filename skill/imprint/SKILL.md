---
name: imprint
description: Capture reusable UI patterns from components into ui-registry.md or audit an existing interface for inconsistencies. Use when documenting design conventions, updating a UI registry, or checking visual consistency.
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

| Property or state | Token, class, or value | Source / context |
| --- | --- | --- |
| [property] | [observed value] | [definition or condition] |

Notes: [intentional variations, unresolved values, supporting decisions]
Verification: [source inspection; rendering checks only if performed]
```

Preserve existing decisions and human notes. Do not overwrite an approved baseline because the newest component differs from it. Record the conflicting observation and explain the discrepancy.

Use "approved" only when supported by an existing project standard or an explicit developer decision. A frequent pattern is a candidate baseline, not proof that it is correct.

Confirm which entries were added or updated and any unresolved conflicts. Capturing patterns does not authorize changing component code.

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

Do not silently edit agent configuration to make the registry load automatically. Keep source paths and observations current, and recheck stale entries before using them as a baseline.
