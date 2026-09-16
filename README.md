# ECO Skills

AI agents are powerful. They're also stateless, pattern-matching tools that will confidently build the wrong thing if you let them.

ECO Skills give your AI agent reusable engineering workflows: saved context between sessions, architectural thinking before implementation, and structured review afterward. Five skills that keep you in the driver's seat.

Designed for agents that support the SKILL.md format, including Claude Code, Cursor, Windsurf, Codex, Cline, and more. Invocation syntax depends on your agent.

**Philosophy:** The problem isn't that AI writes bad code. It's that developers stop thinking when it writes fast code. These skills keep you thinking.


---

## Install

Install the skills from this repository:

```bash
npx skills@latest add Cyrus-11/ECO-agent-skill
```

Preview the available skills without installing them:

```bash
npx skills@latest add Cyrus-11/ECO-agent-skill --list
```

For a local checkout, use `npx skills@latest add . --list` to check discovery.

---

## Skills

### `/architect`

**Use before building anything.**

Think through what you are about to build like a senior engineer before writing any code. Resolves meaningful uncertainties and produces a scoped plan with acceptance criteria and verification steps. Planning-only requests stop at the plan; requests to plan and build continue within your authorization.

This is not a grilling session. It is a thinking session — collaborative, not adversarial.

---

### `/remember`

**Use at the end and start of every session.**

Session context doesn't always carry over. This skill saves useful project context to a file that can be read in a later session.

- `/remember save` — consolidate useful context into memory.md, retaining unresolved work and excluding secrets
- `/remember restore` — load saved context, check for stale information, and summarize the next step

Memory must be saved and loaded explicitly, or through your existing agent instructions. The file does not automatically carry context into every session.

---

### `/review`

**Use after building any feature.**

Review in three layers: plan alignment, system integrity, and release risks. Findings include severity, location, impact, and evidence, along with checks performed and verification gaps. Review-only requests leave product code unchanged; explicitly requested fixes can follow the review.

Working and correct are not the same thing.

---

### `/recover`

**Use when something goes wrong.**

Not every problem is a bug. Not every bug needs debugging. This skill diagnoses which type of failure you are dealing with before deciding how to respond:

- **Targeted fix** — isolated problem, find root cause, fix precisely
- **Hard reset** — prepare a clean-session handoff that preserves useful work; this does not reset Git or delete files
- **Rethink** — wrong foundation, no amount of debugging helps

---

### `/imprint`

**Use after building any UI component.**

Extract reusable visual patterns into ui-registry.md, including theme variants, responsive behavior, and interactive states. Works with the project's styling approach and separates observed patterns from approved design rules. Later UI work can consult the registry for consistency.

- `/imprint` — capture from recently built component
- `/imprint [file]` — capture from specific file
- `/imprint audit` — scan entire codebase, find conflicts, establish baseline

---

## The Engineering Loop

```text
/architect  →  Build  →  /review  →  Ship
                 ↓
/imprint  (after every UI component)
/remember  (end and start of every session)
/recover   (when something breaks)
```

---

## Learn More

Built by [ECO the 2x DEV](https://github.com/Cyrus-11).


---

## Contributing

Found a bug or want to improve a skill? Open an issue or PR. Skills are just markdown — contributions are welcome from anyone.

Run `npm test` to validate skill structure before submitting, then work through [CONTRIBUTING.md](CONTRIBUTING.md) for behavioral checks. Passing a format check does not prove the skill behaves correctly in every agent.

---

## License

[MIT](LICENSE)
