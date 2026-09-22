# Frontend diagnosis

Locate the first boundary where observed behavior differs from the intended interaction. Use the existing stack and preserve unrelated UI changes.

## Establish a reproduction

Record the route, input, action sequence, and expected versus actual result. Include browser, viewport, theme, or input method only when relevant. Capture redacted console errors and network outcomes when available; distinguish a rendering failure from a failed request or stale UI state.

If runtime access is unavailable, trace the closest reliable source or test evidence and state what remains unobserved. Do not describe a source-based hypothesis as a browser reproduction.

## Isolate the failing boundary

- **Interaction:** follow the event target, handler, validation, state update, and resulting render. Check keyboard and pointer paths separately when only one fails. Native form validation may prevent a submit handler from running; inspect constraints and validity before assuming the handler is missing.
- **Asynchronous state:** control response ordering or failure in a local test to distinguish stale responses, duplicate events, and missing error recovery. Check whether a pending state clears on both success and failure.
- **Styles and layout:** inspect matched rules, computed values, inheritance, token definitions, media queries, overflow, and stacking contexts. Find the rule causing the symptom before adding another override or arbitrary z-index.
- **Focus and semantics:** inspect the actual active element, accessible name, disabled state, and overlay behavior when a control cannot be reached or activated. Compare with the appropriate native control or widget pattern.
- **Rendering and navigation:** when server rendering or hydration is involved, compare the initial server output with client state and browser-only assumptions. Distinguish route/data changes from styling failures rather than suppressing warnings without a cause.

For a request that may already have saved data, inspect its outcome before clicking again or replaying it. Cancelling a client request does not prove the server operation was cancelled. Use a local fixture or authorized test environment for side effects.

## Repair and verify

Make the smallest change at the identified boundary. Preserve intentional theme, responsive, and interaction variants. Do not rewrite shared primitives or clear site storage as a diagnostic shortcut; cached or persisted state should be investigated with an isolated test profile when possible.

Repeat the original action sequence, then check nearby affected behavior: keyboard submission for a form fix, error recovery for a loading fix, or the relevant narrow/wide and theme states for a style fix. Add a regression test when it protects the failure, using existing project tooling.

Report what was reproduced, the cause supported by evidence, the change, and the checks actually performed. A passing logic test does not verify layout or focus; give the specific remaining browser check if it could not run.

## Sources for applicable diagnosis

- [MDN constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation) for native form validation behavior and its limits.
- [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for expected modal focus and keyboard behavior.
