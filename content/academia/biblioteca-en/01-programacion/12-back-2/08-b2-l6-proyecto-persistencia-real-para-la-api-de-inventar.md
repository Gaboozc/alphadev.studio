# Project: Real Persistence for the Inventory API
area: Programming | module: back-2 — Relational Databases: Modeling, SQL, and ORM | lesson 8
id: b2-l6 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/back-2/b2-l6

## Project brief

You're going to take the inventory API you built in the previous module — the one storing data in memory — and give it a real database, with relationships, migrations and reporting queries.

If the endpoints were well designed, you barely have to touch them: you swap out the data-access layer and everything else stays the same. Verifying that is part of the exercise, and it's the best demonstration of why layers are separated.

## Tasks
- Draw the complete model before writing code, including the join table
- Write the SQLAlchemy models and generate the initial migration with Alembic
- Replace the in-memory data layer with the database without touching the routers
- Turn on echo=True, load the listing screen and count the queries: fix any N+1 that shows up
- Write the reporting endpoint in SQL and compare its clarity with the ORM version

## Deliverables
- Schema with at least four tables, including a many-to-many relationship with its own data
- SQLAlchemy models with relationships declared in both directions
- Alembic migrations versioned in the repository, including one that adds a required column to a table with data
- The previous module's API running against the database, with the same endpoints
- A reporting endpoint solved with direct SQL and aggregations
- Indexes on foreign keys and filtered columns, justified in the README
- Tests that run against a test database, not the real one

## Rubric
- Prices use numeric and not float, and dates use timestamptz
- Business constraints live in the database: NOT NULL, CHECK and foreign keys
- At least one piece of historical data is frozen, with written justification
- No listing query triggers an N+1: shown with the query log
- Migrations apply cleanly to an empty database and leave the right schema
- Every migration has its downgrade and has been tested to work
- The connection string arrives via environment variable and isn't in the repository
- The reporting endpoint uses parameters and doesn't concatenate text with input data

## Discussion questions
- What should happen to stock movements if a product is deleted? And to historical orders?
- If tomorrow the business wants to manage two warehouses, what changes in your model and how costly would that migration be?

## Tip

When you finish, count how many files you had to touch outside the data layer. If it's only a few, your layer separation from the previous module was done well. If you had to rewrite the routers, there's the most valuable lesson of the project.
