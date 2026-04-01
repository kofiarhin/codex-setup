# `repo-bootstrap-mern` Implementation Plan

## Goal
Create a reusable bootstrap tool that generates a consistent MERN project baseline with your preferred folder structure, configuration, and conventions so new repos start production-ready instead of hand-assembled.

## Desired Outcome
- One command scaffolds a full-stack MERN starter repo.
- Generated projects follow the same naming, layout, scripts, linting, formatting, and environment patterns.
- Optional features are selectable without changing the core baseline.
- The bootstrap output is deterministic, documented, and easy to evolve.

## Proposed Deliverable
Build `repo-bootstrap-mern` as a template-driven scaffolder that can:
- generate `client` and `server` apps
- create shared root-level tooling and scripts
- inject config from prompts or flags
- support optional modules like auth, Docker, testing, and CI
- stamp a ready-to-run `README.md` and `.env.example`

## Recommended Scope

### Phase 1: Core scaffolder
- Create CLI entrypoint for `repo-bootstrap-mern`.
- Support project name, package manager, and feature flags.
- Generate root workspace structure and baseline config.
- Generate React frontend with standard folders and defaults.
- Generate Node/Express backend with standard folders and defaults.
- Add MongoDB connection wiring and environment placeholders.

### Phase 2: Quality and consistency
- Add ESLint, Prettier, `.editorconfig`, and ignore files.
- Add shared scripts for install, dev, build, lint, and test.
- Add validation for project name, target path, and conflicting options.
- Add template token replacement for naming and environment values.

### Phase 3: Optional feature packs
- JWT/auth starter
- Docker and `docker-compose`
- GitHub Actions CI
- Testing baseline for client and server
- API route example and healthcheck
- Shared types or contracts if using TypeScript later

### Phase 4: Documentation and maintenance
- Document all flags, prompts, and generated structure.
- Add snapshot or fixture-based tests for template output.
- Add upgrade strategy for future template changes.

## Baseline Project Shape

### Root
- `client/`
- `server/`
- `.gitignore`
- `.editorconfig`
- `.env.example`
- `README.md`
- `package.json`
- optional workspace config depending on package manager

### Client
- `src/components`
- `src/pages`
- `src/hooks`
- `src/services`
- `src/context`
- `src/utils`
- `src/assets`
- `src/App.*`
- `src/main.*`

### Server
- `src/config`
- `src/controllers`
- `src/models`
- `src/routes`
- `src/middleware`
- `src/services`
- `src/utils`
- `src/app.*`
- `src/server.*`

## Convention Decisions To Lock Early
- JavaScript or TypeScript as the first supported mode
- `npm`, `pnpm`, or `yarn` as the default package manager
- monorepo workspace or independent package setup
- Vite or Create React App for the client baseline
- CommonJS or ESM for the server baseline
- testing stack choice
- styling baseline choice

These decisions should be fixed first, because they affect template layout, scripts, and maintenance cost.

## Technical Approach

### Option A: Simple file-template scaffolder
Best if speed and maintainability matter most.
- Store template files under `templates/base`, `templates/auth`, `templates/docker`, etc.
- Copy files into target repo.
- Replace tokens like `__PROJECT_NAME__`, `__SERVER_PORT__`, `__CLIENT_NAME__`.
- Run optional post-generation steps like dependency install or git init.

### Option B: Programmatic generators by feature
Best if the generated structure will vary heavily.
- Build the filesystem tree in code.
- Compose features in layers.
- Use helper functions to merge files and patch config.

### Recommendation
Start with Option A plus light composition. It keeps the bootstrap logic understandable while still allowing modular feature packs.

## Suggested CLI Interface
Example commands:

```bash
repo-bootstrap-mern my-app
repo-bootstrap-mern my-app --pm pnpm --auth --docker --ci
repo-bootstrap-mern my-app --no-install --use-js
```

Suggested prompts/flags:
- project name
- package manager
- JavaScript vs TypeScript
- auth starter on/off
- Docker on/off
- CI on/off
- install dependencies on/off
- initialize git on/off

## Implementation Steps
1. Define the exact baseline conventions to standardize.
2. Freeze the generated folder structure and default scripts.
3. Create the root, client, and server template sets.
4. Build the CLI argument parser and interactive prompts.
5. Implement template copy and token replacement.
6. Add optional feature-pack composition.
7. Add validation and friendly error handling.
8. Add fixture-based tests for generated output.
9. Write generator documentation and example usage.

## Acceptance Criteria
- Running the CLI creates a working MERN starter in a new directory.
- Generated output always includes the agreed baseline structure.
- Feature flags only add relevant files and config.
- Invalid names and conflicting options fail with clear messages.
- Generated repo includes readable setup docs and environment guidance.
- At least one automated test verifies generated file trees and key file contents.

## Risks
- Too many early options can make the generator hard to maintain.
- Unclear conventions will cause template churn.
- Supporting both JS and TS too early doubles template complexity.
- Mixing package-manager-specific behavior can complicate scripts.

## Recommended First Cut
For the first implementation, keep it intentionally narrow:
- Vite React client
- Express server
- Mongo connection stub
- JavaScript only
- `npm` only
- ESLint + Prettier
- `.env.example`
- healthcheck route
- one example API flow

This gives you a stable baseline quickly, then optional features can be layered in after the generator proves useful.

## Next Decisions Needed
- Should the first version target JavaScript only or TypeScript?
- Do you want a monorepo workspace at the root?
- Should auth be part of the default baseline or optional?
- Do you want Tailwind included by default?
- Which package manager should be canonical?
