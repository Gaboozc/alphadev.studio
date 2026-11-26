# Project: Bulletproof a Real Module
area: Programming | module: fund-2 — Errors, Debugging, and Testing | lesson 7
id: f2-l5 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/fund-2/f2-l5

## Project brief

Take a working project of your own — a client's site, your portfolio, anything with business logic — and turn it into a project that doesn't fail silently.

You won't write new code: you'll bulletproof what you already have. This is the exact work that separates a deliverable from a maintainable product, and it's what a serious client checks before trusting you with something bigger.

The scope is one module, not the whole application. Pick the one with the most logic: price calculation, form validation, transforming data from an API.

## Tasks
- Pick the module with the most business logic from a working project of yours
- Write tests BEFORE touching error handling: they'll reveal bugs you didn't know you had
- Document every bug you discover while writing the tests
- Add validation at the boundary and separate error messages by audience
- Break the code on purpose and confirm the tests catch it

## Deliverables
- GitHub repository with the chosen module, its tests and a README explaining how to run them
- At least 8 unit tests on the business logic, including edge cases
- Complete error handling in the module: no empty catch blocks, separate messages for users and logs
- Input data validation with Zod at the module boundary
- A one-page document listing the bugs you found while writing the tests

## Rubric
- Tests run with a single command and all pass green
- Each test has a name describing the expected behavior, not the function name
- At least three edge cases are covered: empty input, missing data and out-of-range value
- When breaking the code on purpose, the corresponding tests turn red
- No catch block is empty or limited to a console.log
- User-facing error messages contain no technical jargon or status codes
- The README explains how to install, how to run tests and what each group covers

## Tip

Writing tests on code that already works almost always reveals bugs nobody had noticed: division by zero, empty lists returning NaN, optional fields breaking the calculation. Documenting those findings is half the value of the exercise.
