# Quiz Builder

Full‑stack playground for creating, browsing, and previewing quizzes. The backend stores quizzes in PostgreSQL via Prisma/Express, and the frontend is a Next.js 16 app for building and reviewing questions (boolean, free‑text, and checkbox types).

## Features
- Create quizzes with multiple questions and answer types (BOOLEAN, INPUT, CHECKBOX)
- Auto‑persist questions and options to PostgreSQL via Prisma
- Browse quizzes with counts, open details, and delete entries
- Modern Next.js UI built with React 19 and Tailwind CSS v4 styles

## Tech Stack
- Frontend: Next.js 16 (App Router), React 19, react-hook-form, Tailwind CSS v4
- Backend: Express 5, Prisma, PostgreSQL
- Language/Tooling: TypeScript, ESLint, Prettier

## Getting Started
### Prerequisites
- Node.js 20+ recommended
- PostgreSQL instance

### Backend Setup (`backend/`)
1) Install deps: `npm install`
2) Create `.env` with your database connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/quizbuilder"
   ```
3) Apply schema and generate client: `npx prisma migrate dev && npx prisma generate`
4) Run the API: `npm run dev` (defaults to port 4000)

### Frontend Setup (`frontend/`)
1) Install deps: `npm install`
2) Point the UI to the API (optional if running on default port):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
3) Start the dev server: `npm run dev` (Next.js on port 3000)

## API Quick Reference
- `GET /quizzes` — list quizzes (`[{ id, title, questionsCount }]`)
- `POST /quizzes` — create a quiz. Example body:
  ```json
  {
    "title": "Sample Quiz",
    "questions": [
      { "text": "Is this true?", "type": "BOOLEAN", "correctAnswer": "true" },
      {
        "text": "Choose correct options",
        "type": "CHECKBOX",
        "options": [
          { "text": "A", "isCorrect": true },
          { "text": "B", "isCorrect": false }
        ]
      },
      { "text": "Fill the gap", "type": "INPUT", "correctAnswer": "42" }
    ]
  }
  ```
- `GET /quizzes/:id` — quiz with ordered questions and options
- `DELETE /quizzes/:id` — remove a quiz

## Package Scripts
- Backend: `npm run dev` | `npm run build` | `npm start` | `npm run lint`
- Frontend: `npm run dev` | `npm run build` | `npm start` | `npm run lint`

## Project Structure
- `backend/` — Express server, Prisma schema, migrations, API routes
- `frontend/` — Next.js app (App Router), React components, API client
