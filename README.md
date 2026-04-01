# Codex Setup

This repo stores repo-local Codex skills, agents, templates, scripts, and references.

## Structure

- `.codex/skills/` contains end-user skills
- `.codex/agents/` contains supporting agents
- `.codex/templates/` contains shared templates
- `assets/templates/` contains scaffold source files
- `scripts/` contains executable repo helpers
- `references/` contains convention maps and supporting docs
- `notes.txt` contains repo-specific invocation notes

## Skill Invocation

Skills are invoked by naming the skill in your prompt and supplying the target artifact or task.

Examples:

- `Use frontend-design to build a responsive React pricing page.`
- `Use spec-generator to create a /spec prompt for adding login.`
- `Use implement-plan on _plan/login-feature.md.`
- `Use repo-bootstrap-mern to scaffold ../kitchen-portal.`
- `Run code-review on my current diff.`
- `/commit-message`

## Available Skills

- `frontend-design`: Create polished frontend UI and layouts
- `spec-generator`: Generate a reusable `/spec ...` prompt
- `implement-plan`: Execute a plan using repo agents
- `repo-bootstrap-mern`: Scaffold a standards-aligned MERN starter repo
- `code-review`: Review staged and unstaged diffs
- `commit-message`: Draft a commit message from staged changes

## Supporting Agents

Examples of directly invokable agents:

- `Use plan-reader on _plan/login-feature.md.`
- `Use reviewer to validate the implementation against the plan.`
- `Use a11y-reviewer on this UI diff.`
- `Use api-mapper to trace the backend request flow.`

## Quick Start

Example flow for a new feature:

1. Generate a reusable spec prompt:
   - `Use spec-generator to create a /spec prompt for adding login.`
2. Run the generated `/spec ...` prompt to create a plan in `_plan/`
3. Implement the saved plan:
   - `Use implement-plan on _plan/login-feature.md.`
4. Scaffold a new standards-aligned MERN repo when needed:
   - `Use repo-bootstrap-mern to scaffold ../kitchen-portal.`
5. Review the resulting diff:
   - `Run code-review on my current diff.`
6. Draft a commit message after staging changes:
   - `/commit-message`
