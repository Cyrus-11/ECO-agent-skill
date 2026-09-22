# UI registry

## Approved control baseline

Status: approved baseline
Decision: standard controls use a 4px radius.
Human note: keep compact controls in the billing dashboard.

### ActionButton / primary

Source: src/ActionButton.jsx, ActionButton
Status: observed

| Property or state | Token, class, or value | Source / context |
| --- | --- | --- |
| Radius | --control-radius: 4px | src/tokens.css, :root |
| Dark focus outline | --focus-ring: #a8c7fa | src/tokens.css, dark theme |

Notes: primary action; keep its intentional distinction from destructive actions.
Verification: historical browser check, before the token update; not current evidence.

### ActionButton / destructive

Source: src/ActionButton.jsx, ActionButton
Status: observed

| Property or state | Token, class, or value | Source / context |
| --- | --- | --- |
| Radius | --control-radius: 4px | src/tokens.css, :root |
| Background | --danger-bg | src/tokens.css, theme dependent |

### Link / default

Source: src/Link.jsx, Link
Status: observed

| Property or state | Token, class, or value | Source / context |
| --- | --- | --- |
| Radius | --control-radius: 4px | src/tokens.css, :root |

### Badge / default

Source: src/Badge.jsx, Badge
Status: observed
Notes: human note: investigate whether reports still need this badge.
