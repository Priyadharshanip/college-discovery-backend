# College Discovery Platform Backend

A production-grade backend for a College Discovery Platform built with Next.js API Routes, Node.js, TypeScript, PostgreSQL, and Prisma ORM.

## Tech Stack
- **Node.js & Next.js** (API routes only)
- **TypeScript**
- **PostgreSQL** (Database)
- **Prisma** (ORM)
- **Bcrypt & JWT** (Authentication)
- **Zod** (Input Validation)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/collegedb"
   JWT_SECRET="your_secure_random_string"
   NODE_ENV="development"
   ```

3. **Initialize the Database:**
   Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

4. **Seed the Database:**
   Populate the database with 20 realistic Indian colleges along with their courses, placements, and reviews:
   ```bash
   npx tsx prisma/seed.ts
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## Schema Overview

The database uses a clean, relational model:
- `User`: Handles authentication (name, email, hashed password).
- `College`: Core entity holding general information about the colleges.
- `Course`: 1-to-Many relation with `College`.
- `Placement`: 1-to-Many relation with `College`.
- `Review`: 1-to-Many relation with `College`.
- `SavedCollege`: Many-to-Many bridge model linking a `User` to a `College`. Ensures unique pairings.

## API Documentation

### 1. Authentication
All auth routes are under `/api/auth`.

- **POST `/api/auth/register`**
  - **Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
  - **Success:** `201 Created`
  - **Response:** `{ "success": true, "data": { "id": "...", "name": "John Doe", "email": "..." } }`

- **POST `/api/auth/login`**
  - **Body:** `{ "email": "john@example.com", "password": "password123" }`
  - **Success:** `200 OK`
  - **Response:** `{ "success": true, "data": { "id": "...", "token": "jwt_token_here..." } }`

### 2. Colleges
- **GET `/api/colleges`**
  - **Query Parameters:** `page`, `limit`, `search`, `location`, `minFees`, `maxFees`, `minRating`
  - **Response:** `{ "success": true, "data": [...], "meta": { "total": 20, "page": 1, "limit": 10, "totalPages": 2 } }`

- **GET `/api/colleges/:id`**
  - **Response:** Includes college details along with related courses, placements, and reviews.

### 3. Saved Items (Requires JWT)
All these routes require an `Authorization` header: `Bearer <token>`

- **GET `/api/saved`**
  - Retrieves all colleges saved by the authenticated user.

- **POST `/api/saved/:collegeId`**
  - Saves a specific college.
  - **Success:** `201 Created`

- **DELETE `/api/saved/:collegeId`**
  - Unsaves a specific college.
  - **Success:** `200 OK`

## Design Decisions & Trade-offs

1. **Next.js API Routes over Express/Nest.js:** Picked Next.js to provide a unified stack setup if the frontend is later added to the same repo, which works great with Vercel or Render. We set `app=false` to use traditional robust `/pages/api` routes.
2. **Prisma ORM:** Chosen for its type safety out of the box, automatic migrations, and ease of defining relations.
3. **Zod Validation:** Ensures strongly typed validation for all incoming requests, preventing dirty data.
4. **JWT Auth:** Kept authentication stateless and scalable without session stores.

## Deployment on Render/Railway

1. Push your repository to GitHub.
2. Connect the repository to your Render/Railway dashboard.
3. Add a PostgreSQL add-on if you don't use an external DB.
4. Set the Build Command: `npm install && npx prisma generate`
5. Set the Start Command: `npm start`
6. Add the `.env` variables (`DATABASE_URL`, `JWT_SECRET`).
