# Frontend review

Review the changed user flow and the components or styles that determine its behavior. Report a concrete trigger and consequence; missing tooling or a preferred styling technique is not itself a defect.

## State and interactions

- Trace initial, loading, empty, success, and error states where relevant. Check that users can recover from an error without losing required context or getting stuck behind a disabled control.
- Check form submission through both clicks and keyboard input, validation timing, field errors, and preservation of entered values. Follow the actual submit handler, not only the button's disabled state.
- For asynchronous updates, trace whether an older response can overwrite newer input, repeated actions can duplicate an effect, or optimistic UI can remain successful after a failed request. Show the event sequence that makes the issue possible.
- For navigation changes, inspect direct links, back/forward behavior, and state restoration where required. A client-side permission check does not establish server authorization.

## Accessibility

Inspect control semantics, accessible names, label/error associations, and keyboard handlers. For widgets that move focus, check the intended entry, dismissal, and return paths. Use the relevant interaction pattern; the presence of a role alone does not prove correct behavior.

Run browser checks for actual tab order, visible focus, focus containment in modal dialogs, and applicable rendered contrast when tools are available. Automated accessibility checks can find some defects but do not establish full accessibility. Record assistive-technology verification only when performed.

## Styling and responsive behavior

Follow the cascade through component styles, shared tokens, inheritance, themes, and media queries. Compare equivalent variants before reporting drift. If a registry entry references a missing file or an old token value, resolve that discrepancy before treating it as the expected design.

Check plausible failures from narrow viewports, zoom, long content, overflow, overlays, or stacking contexts. Confirm an obscured or clipped action in the affected state when possible; a suspicious CSS declaration alone may not prove a visual defect. Preserve intentional responsive and theme differences.

## Verification and reporting

Use existing interaction and browser tests for the changed behavior. Distinguish logic tested with mocks from rendered behavior and real integration results. Report the browser, viewport, theme, and reproduction sequence when those conditions explain a finding.

If a browser or application runtime is unavailable, give supported source findings and identify the unverified interactions or layouts. Do not invent screenshots, computed styles, contrast measurements, or keyboard observations.

## Sources for applicable checks

- [WAI form feedback](https://www.w3.org/WAI/tutorials/forms/notifications/) for error associations and submission feedback.
- [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for modal keyboard and focus expectations.
