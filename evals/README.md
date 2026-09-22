# Skill behavior evaluations

Eleven scenarios exercise the five ECO skills using small local projects. Preparation copies the project and the skill under test into a fresh directory. No model SDK, network service, or additional package is required by the harness. Node and Git are required; Git is used to create real working changes in recovery scenarios.

`npm test` checks the harness and fixture integrity. It does **not** run an AI agent or certify skill behavior. Agent runs are performed separately with the target host, and a human reviews the transcript. This separation keeps the suite usable across agents.

## Run a scenario

From the repository root:

```sh
npm run eval -- list
npm run eval -- prepare recover-zero
```

The second command prints the new run directory and project path. By default this is a unique directory under your operating system's temporary directory. You may supply a destination that does not already exist:

```sh
npm run eval -- prepare recover-zero .eval-results/recover-zero
```

For an explicit destination, create its parent directory first. Preparation refuses to overwrite an existing directory.

1. Start a **fresh agent session** with the printed `project` directory as its workspace. Limit writes to that disposable workspace. Use the target host's sandbox and disable network or external tools for the run; the prompt is not a security boundary.
2. Give the agent the contents of `prompt.txt`. It references the copied `skill/SKILL.md` and supplies the realistic task. Do not give the agent the reviewer rubric or expected outcomes. Grant read access to the copied skill if the host requires it.
3. Save the complete conversation and tool results as `transcript.md` in the run directory, outside `project`. Record the agent/host version, model, date, and any additional active instructions in `review.md`. Do not silently provide answers or extra hints; record interventions.
4. From the ECO repository, run the checker against the run directory:

   ```sh
   npm run eval -- check "PATH_TO_RUN"
   ```

5. Review `rubric.md`, the transcript, and `results/latest.json`. In `review.md`, mark each criterion **pass**, **fail**, or **not observed**, with a quote, tool result, or artifact as evidence. Do not award a full pass while any criterion is unobserved or an automated check fails.

For `imprint-variants`, check after the first capture with the label `first`, give the same agent `followup.txt`, then check with `second`:

```sh
npm run eval -- check "PATH_TO_RUN" first
npm run eval -- check "PATH_TO_RUN" second
```

The two JSON files retain registry contents for checking duplicate entries. Reusing a result label replaces that report; use distinct labels when preserving checkpoints.

## What is checked

| Automated artifact checks | Transcript and semantic review |
| --- | --- |
| Unexpected file edits, additions, or deletions | Correct diagnosis, proportional severity, and useful plans |
| Required memory/registry files exist and are nonempty | Retained decisions, human notes, and unresolved work |
| Dummy credential does not appear in project files | No invented test, browser, or deployment claims |
| Git revision and unrelated working changes survive | No destructive commands or redundant approval requests |
| Count repair passes an external behavioral oracle | UI variants, approved baselines, and duplicate-free captures |
| The skill copy remains unchanged | Correct treatment of stale context and old authorization |

The checker exits nonzero on an automated failure. Exit zero means **needs-human-review**, never an overall pass. It cannot infer behavior from file checks alone. For example, an unchanged review fixture does not show whether the agent found the defect.

Recovery checks execute the candidate's local JavaScript in a subprocess with a timeout; this is not a code sandbox. Run only trusted/local evaluation artifacts or use an appropriate isolated environment. The counter fixtures deliberately fail `node --test` before the repair. The evaluator's independent oracle checks zero, a positive count, null, and undefined even if candidate tests are altered; altered fixture tests also fail preservation checks.

## Compare skill changes

Prepare a fresh run before and after the skill change. Each baseline records the scenario, initial file hashes, and hashes of the copied skill and references. Keep the same agent, model, prompt, and tool access. Compare evidence for each rubric criterion, including regressions and reviewer interventions; a single run is not a reliability estimate.

For an optional no-skill comparison, use a separate fresh run and remove the skill-use line from the prompt you supply. Record that variation in `review.md`; do not change the task or show the expected result. No-skill comparisons may still be affected by the host's automatically loaded skills, so record those too.

Fixtures contain dummy data only. Run artifacts stay outside the repository by default; `.eval-results/` is ignored for explicitly located local runs. Keep prompts and rubrics separate from the agent's project, and share only reviewed transcripts without credentials or private account details.
