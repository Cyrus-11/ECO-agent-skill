# Frontend planning

Plan the user interaction and its observable result. Reuse the project's components, styling approach, and test tools; a UI change does not automatically require a design system or framework migration.

## Interaction and state

Trace the user action through event handling, state changes, requests, and rendered feedback. Identify whether state belongs in the component, URL, shared store, or server using the project's existing conventions.

Specify the relevant initial, loading, empty, success, and error states, plus how users recover. For asynchronous interactions, consider repeated submission, responses arriving out of order, navigation during a request, and preserving entered data after failure. Plan these only where they can affect the requested flow.

For forms, decide when validation runs and how field and submission errors are shown. Reuse existing validators and check both button and keyboard submission paths. Client validation improves feedback; server validation and authorization still protect the operation. Do not assume disabling a button prevents duplicate server effects.

## Accessibility and navigation

Prefer appropriate native controls and existing accessible primitives. Plan accessible names, keyboard operation, visible focus, and feedback associated with the relevant controls. For dialogs or other focus-changing interactions, specify initial focus, dismissal, and where focus returns. Follow the actual widget pattern rather than adding ARIA attributes without its interaction behavior.

If routing changes, cover direct links and back/forward navigation where they are part of the flow. Clarify unsaved-work behavior only when the change introduces that decision.

## Layout and visual conventions

Inspect shared tokens, themes, and equivalent components before proposing new values. Recheck registry entries against their sources when paths or token definitions have changed; an old observation is not current design evidence.

Plan for the affected viewport sizes, long content, text zoom, and relevant theme or motion preferences. Choose checks that expose a plausible issue, such as an action becoming unreachable in a narrow dialog, instead of requiring an exhaustive device matrix for every edit.

## Verification

Pair acceptance criteria with observable checks. For example: submitting whitespace shows the associated error, preserves the input, and sends no request; a successful submission transitions to the intended result.

Use unit checks for transformation logic, interaction checks for user flows, and browser checks for actual layout, focus, and rendering. Reuse the project's test tools. State which checks need a browser, service stub, or backend and which are unavailable. A screenshot alone does not verify keyboard behavior, and a source review does not establish rendered accessibility.

## Sources for specific interactions

- [WAI form feedback](https://www.w3.org/WAI/tutorials/forms/notifications/) for associating errors with controls and communicating submission results.
- [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for focus and keyboard behavior when a modal is involved.
