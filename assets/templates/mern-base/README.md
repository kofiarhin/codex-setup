# __PROJECT_NAME__

Opinionated MERN starter aligned with the DevKofi engineering standards.

## Stack

- React + Vite
- Redux Toolkit
- React Query
- React Router
- SCSS
- Node + Express
- MongoDB + Mongoose
- `express-validator`

## Project Structure

- `client/`: frontend app
- `server/`: backend API
- `.env.example`: shared environment reference
- `package.json`: root orchestration scripts

## Quick Start

1. Copy `client/.env.example` to `client/.env`.
2. Copy `server/.env.example` to `server/.env`.
3. Run `npm install` from the project root.
4. Run `npm run dev` to start client and server together.

## Useful Scripts

- `npm run dev`: run both apps
- `npm run client:dev`: run only the frontend
- `npm run server:dev`: run only the backend
- `npm run lint`: lint client and server
- `npm run test`: run backend tests
- `npm run build`: build the Vite frontend

## Environment Variables

### Client

- `VITE_API_URL=__API_URL__`

### Server

- `PORT=__SERVER_PORT__`
- `CLIENT_URL=__CLIENT_URL__`
- `MONGODB_URI=__MONGODB_URI__`

## Included Example Flow

- `GET /api/health`: healthcheck
- `GET /api/projects`: example project list route
- `POST /api/projects`: validated example create route

If MongoDB is not connected yet, the server still boots and healthcheck stays available.
