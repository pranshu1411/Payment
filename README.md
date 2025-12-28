# Payment App

Lightweight payment/demo app with a Node.js + Express backend and a React (Vite) frontend.

## Contents

- **Backend**: [backend](backend/) — Express API, MongoDB models, auth utilities.
- **Frontend**: [frontend/vite-project](frontend/vite-project/) — React + Vite UI.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB connection (URI)

## Environment

Create a `.env` file in `backend/` with the following variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs

## Setup & Run

Backend

```bash
cd backend
npm install
# add .env with MONGO_URI and JWT_SECRET
npm run dev
```

Frontend

```bash
cd frontend/vite-project
npm install
npm run dev
```

The frontend talks to the backend API endpoints defined under [backend/routes](backend/routes/).

## Run locally (detailed)

This project runs the backend on port `3000` and the Vite frontend on a dev port (usually `5173`).

1. Backend

	 - Create `backend/.env` (example):

		 ```text
		 MONGO_URI=mongodb://localhost:27017/payment-app
		 JWT_SECRET=your_jwt_secret_here
		 ```

	 - Install and start the backend:

		 ```bash
		 cd backend
		 npm install
		 npm run dev
		 ```

	 - The server will listen on `http://localhost:3000/`. API routes are mounted under `/api/` (e.g. `http://localhost:3000/api/users`).

2. Frontend

	 - Install and start the frontend:

		 ```bash
		 cd frontend/vite-project
		 npm install
		 npm run dev
		 ```

	 - Vite will print the local URL (e.g. `http://localhost:5173`) — open that in the browser.

3. Notes & verification

	 - Ensure your MongoDB instance is running (local `mongod` or Atlas). If using Atlas, replace `MONGO_URI` with the provided connection string.
	 - If the frontend needs a different API base, update the environment/config in the frontend to point to `http://localhost:3000`.
	 - Quick curl check to verify backend is reachable:

		 ```bash
		 curl http://localhost:3000/api/health || curl http://localhost:3000/api
		 ```

	 - If you see CORS issues, confirm the backend is running and `cors()` is enabled in [backend/index.js](backend/index.js).

## Example development workflow

- Start MongoDB (if local): `mongod --dbpath /path/to/db` or use Atlas.
- Start backend: `cd backend && npm run dev`.
- Start frontend: `cd frontend/vite-project && npm run dev`.
- Open the Vite URL in your browser and sign in / sign up.

## Key Files

- Server entry: [backend/index.js](backend/index.js)
- DB models: [backend/db/db.js](backend/db/db.js)
- Auth helpers: [backend/utils/auth.js](backend/utils/auth.js)
- Frontend entry: [frontend/vite-project/src/main.jsx](frontend/vite-project/src/main.jsx)

## API Overview

The backend exposes user, account and transaction routes under `/api` (see [backend/routes](backend/routes/)). Authentication uses JWT tokens — see `generateToken` and `authenticateToken` in [backend/utils/auth.js](backend/utils/auth.js).

## Notes

- The backend uses MongoDB via Mongoose and requires a valid `MONGO_URI`.
- Dev server uses `nodemon` (script: `npm run dev`).
