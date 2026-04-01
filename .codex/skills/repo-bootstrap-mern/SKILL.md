---
name: repo-bootstrap-mern
description: Scaffold a standards-aligned MERN starter repo using the shared template, generator script, and DevKofi conventions.
---

Use this skill when the user wants to create a new MERN repository that follows the conventions in `AGENT.md`.

## Goal

Generate a consistent MERN starter with:
- root `package.json` running client and server via `concurrently`
- React + Vite frontend with Redux Toolkit, React Query, React Router, and SCSS
- Express + MongoDB backend with validation, central error handling, and consistent API responses
- standard env files, README, and repo hygiene defaults

## Resources

- `scripts/scaffold_mern.js`
- `assets/templates/mern-base/`
- `references/standards-map.md`

## Execution Rules

1. Validate the target path before generating files.
2. Prefer the generator script over hand-writing scaffold files.
3. Default to the narrow baseline already encoded in the template:
   - JavaScript only
   - `npm` only
   - Vite client
   - Express server
   - Mongo connection stub
   - ESLint + Prettier
   - healthcheck route
   - example `projects` API flow
4. Do not add auth, Docker, CI, Tailwind, or TypeScript unless the user explicitly asks.
5. Keep output aligned with `AGENT.md`.

## Command Pattern

Use:

```bash
node scripts/scaffold_mern.js <target-path>
```

Useful flags:
- `--project-name "Display Name"`
- `--install`
- `--git`
- `--force`
- `--smoke-check`

Examples:

```bash
node scripts/scaffold_mern.js ../kitchen-portal --project-name "Kitchen Portal"
node scripts/scaffold_mern.js ../kitchen-portal --project-name "Kitchen Portal" --install --git --smoke-check
```

## Response Expectations

After scaffolding:
- summarize the generated structure
- call out the exact command used
- note whether dependencies were installed
- note whether git was initialized
- provide the next 1-2 commands the user should run if installation was skipped

If the target directory is not empty and `--force` was not requested, stop and report the conflict clearly.
