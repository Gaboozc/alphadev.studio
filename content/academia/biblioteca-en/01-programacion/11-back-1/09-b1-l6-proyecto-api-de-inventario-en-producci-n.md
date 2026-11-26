# Project: Production Inventory API
area: Programming | module: back-1 — Back End with Python and FastAPI | lesson 9
id: b1-l6 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/back-1/b1-l6

## Project brief

You're going to build the complete API for an inventory system for a real business — it can be a client's or an invented one with realistic data — and leave it deployed and documented.

The scenario: a business needs to track products, suppliers and stock movements. Several people use it, so you have to distinguish who can read from who can modify.

This project is the foundation the next two modules build on: in the databases module you'll give it real persistence with relationships, and in the Docker module you'll package it so it runs the same on any machine. Build it with that in mind.

## Tasks
- Design the endpoints and input/output models before writing code
- Set up the domain-based structure from the start, even if it feels excessive at first
- Implement products completely, with tests, before moving on to suppliers
- Add token authentication with a reusable dependency
- Test every endpoint from /docs as if you were an external consumer

## Deliverables
- FastAPI API with REST endpoints for products, suppliers and stock movements
- Separate Pydantic models for input and output, with response_model on each endpoint
- Domain-based structure with all three layers: router, service and data access
- Token authentication and a dependency distinguishing read from write
- Documentation in /docs with descriptions and examples on all endpoints
- Tests with TestClient: happy path, validation, permissions and edge cases
- README with instructions to run it from scratch

## Rubric
- All five REST methods are implemented and return the right status code in each case
- No endpoint returns sensitive fields: verified that response_model filters them out
- Business logic lives in services and can be tested without an HTTP client
- A PATCH with exclude_unset doesn't wipe out fields that weren't sent
- Without a token, write endpoints return 401; with a token lacking permissions, 403
- Tests run with a single command and don't touch the real database
- Configuration arrives via environment variables and the app refuses to start if any is missing
- In /docs you can run every endpoint without having to guess the data format

## Discussion questions
- What should happen if someone tries to delete a supplier that has associated products? Error, cascade delete, or mark inactive?
- Should a stock movement be editable, or only corrected with another movement in the opposite direction?

## Tip

Start with in-memory data, with no database. It sounds like a shortcut, but it's the right move: it forces you to get the shape of the API and its contracts right before mixing them with persistence issues. The database enters in the next module and drops right in without rewriting endpoints.
