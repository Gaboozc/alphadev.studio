# Project: Agent with Tools Over Real Data
area: AI Engineering | module: iaeng-2 — Agentic Engineering: Models That Act | lesson 9
id: ie2-l5 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-2/ie2-l5

## Project brief

Build an agent that solves a real task in your operations by querying data and running actions, with all the controls that make it production-ready.

Ideas that come from agency work rather than a tutorial:

- An agent that checks a client's campaign metrics, spots the ones that dropped, and drafts the report with likely causes.
- An agent that receives a client request in writing, checks inventory and calendar, and proposes a quote with availability.
- An agent that audits a website — broken links, missing metadata, images without alt text — and generates a prioritized fix list.

It must have at least three tools, one of them with a real-world effect requiring human confirmation.

## Tasks
- Define the task and argue why it needs an agent rather than a fixed workflow
- Design the tools and write their descriptions before coding them
- Build the loop with all three limits from the start, not at the end
- Run ten real cases and record what happened in each
- Intentionally test a prompt injection in the input data

## Deliverables
- Python agent with loop, step cap, spend limit and time limit
- At least three tools with descriptions stating when to use them and when not to
- Pydantic validation of all arguments coming from the model, with errors explaining how to fix them
- At least one sensitive tool that pauses the loop and asks for confirmation
- Repeated-call detection and a retry policy distinguishing transient from permanent failures
- Code-level verification of the result claimed by the agent
- Complete per-step log: prompt, response, tool, arguments, result, tokens and time
- Report with ten real runs: how many succeeded, how much each cost, and where it failed

## Rubric
- The loop always ends: no case can run indefinitely
- No irreversible action executes without explicit approval from a person
- Model arguments are validated before touching anything, and an invalid argument doesn't crash the agent
- When stuck repeating a call, the agent detects it and changes strategy or stops
- The claimed result is verified in code and a false claim is caught
- The log makes it possible to reconstruct why the agent made every decision
- The report includes average cost per task and success rate across ten runs
- At least one real bug found and how it was fixed is documented

## Discussion questions
- What happens if the agent stops mid-task after already modifying data? How do you undo what was done?
- How much could the worst possible run of your agent cost, and is that number acceptable to the client?

## Tip

Build limits before capabilities. It's tempting to get it working first and add controls later, but an agent without a spend cap that gets stuck in a loop overnight is an invoice you'll have to explain.
