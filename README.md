# campus-connect-frontend

Campus Connect is a web application designed to help Santa Clara University students discover campus events in one place. The goal is to make it easier for students to find events, explore campus activities, and get involved without having to search through multiple platforms.

This repository contains the React frontend for Campus Connect. The backend API and data management are handled in a separate backend repository (https://github.com/nfallin/campus-connect), which must be running for the application to work.

## 1. Prerequisites

- Node.js 22 or newer (`node -v` to check)
- The backend repo cloned and running (see its README) — it must be
  reachable at `http://localhost:8080`

## 2. Install dependencies

```bash
npm install
```

## 3. Start the backend first

In the backend repo:

```bash
go run .
```

This starts the API on port `8080`. Leave that terminal running.

## 4. Start the frontend

In this repo:

```bash
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in a
browser.

## 5. How the frontend talks to the backend

- All API calls go through `src/lib/api.ts`, which prefixes requests with
  `VITE_API_BASE_URL` (defaults to `/api`, see `.env.example`).
- In dev, `vite.config.ts` proxies anything under `/api` to
  `http://localhost:8080` and strips the `/api` prefix, since the backend's
  routes (`/events`, `/users`, ...) don't use that prefix themselves. So a
  frontend call to `/api/events` reaches the backend's `/events` route.
- In production there is no Vite proxy, so either put a reverse proxy in
  front of both services doing the same `/api` rewrite, or set
  `VITE_API_BASE_URL` to the backend's full deployed URL and enable CORS on
  the backend for the frontend's origin.

## 5. Using Campus Connect

## How the Frontend Talks to the Backend

The frontend communicates with the Go backend through API requests handled in `src/lib/api.ts`. During development, Vite forwards requests to the backend running at `http://localhost:8080`.

For example, a request to `/api/events` from the frontend is forwarded to the backend's `/events` endpoint.as development continues.

## 6. Other scripts

```bash
npm test      # run unit tests (vitest)
npm run lint  # lint with oxlint
npm run build # typecheck + production build
npm run preview # preview the production build locally
```
## Tech Stack

- **React and TypeScript:** Frontend development
- **Vite:** Development server and build tool
- **Go:** Backend API
- **Vitest:** Frontend unit testing
- **GitHub Actions:** Automated testing and build checks

## CI

`.github/workflows/ci.yml` runs `npm test`, `npm run lint`, and
`npm run build` on every push and pull request.
