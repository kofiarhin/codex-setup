# Codex Setup

This repo stores repo-local Codex skills, agents, and templates.

## Structure

- `.codex/skills/` contains end-user skills
- `.codex/agents/` contains supporting agents
- `.codex/templates/` contains shared templates
- `notes.txt` contains repo-specific invocation notes

## Skill Invocation

Skills are invoked by naming the skill in your prompt and supplying the target artifact or task.

Examples:

- `Use frontend-design to build a responsive React pricing page.`
- `Use spec-generator to create a /spec prompt for adding login.`
- `Use implement-plan on _plan/login-feature.md.`
- `Run code-review on my current diff.`
- `/commit-message`

## Available Skills

- `frontend-design`: Create polished frontend UI and layouts
- `spec-generator`: Generate a reusable `/spec ...` prompt
- `implement-plan`: Execute a plan using repo agents
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
4. Review the resulting diff:
   - `Run code-review on my current diff.`
5. Draft a commit message after staging changes:
   - `/commit-message`
