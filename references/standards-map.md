# `repo-bootstrap-mern` Standards Map

This document maps the scaffolded MERN starter to the rules in `AGENT.md`.

## Root Conventions

- `package.json`: uses `concurrently` and root orchestration scripts to run client and server together
- `.gitignore`: ignores `node_modules`, `.env`, build output, coverage, and `notes.txt`
- `.editorconfig` and `.prettierrc.json`: standard formatting defaults
- `.env.example`: documents both frontend and backend environment variables

## Frontend Conventions

- `client/`: Vite + React baseline
- `client/src/app/store.js`: Redux Toolkit store
- `client/src/app/providers/AppProviders.jsx`: React Query, Redux, and Router providers
- `client/src/services/apiClient.js`: central API helper with `VITE_API_URL` normalization
- `client/src/components/*`: component-per-folder structure with SCSS companion files
- `client/src/pages/*`: page-per-folder structure with BEM-style SCSS

## Backend Conventions

- `server/server.js`: entrypoint
- `server/app.js`: Express app for runtime and test reuse
- `server/config/db.js`: Mongo connection wiring via `.env`
- `server/routes/*`: route layer
- `server/controllers/*`: focused controller layer
- `server/models/*`: Mongoose models
- `server/middleware/errorHandler.js`: central error handling middleware
- `server/middleware/validateRequest.js`: request validation integration
- `server/utils/apiResponse.js`: consistent success/error response helpers

## API Contract

The generated backend uses the response envelope required by `AGENT.md`:

- success: `{ "success": true, "data": ... }`
- error: `{ "success": false, "message": "..." }`

Validation failures may also include `details` while keeping the same top-level shape.

## First-Cut Decisions

- JavaScript only
- `npm` with root `--prefix` scripts
- Vite for the frontend
- CommonJS for the backend
- SCSS for styling
- no auth, Docker, CI, or TypeScript by default

## Smoke Check Expectations

The generator verifies:

- required scaffold files exist
- template tokens are fully replaced
- the output directory contains the expected root, client, and server structure

If `--install` and `--smoke-check` are used together, the generator also runs the generated server tests.
