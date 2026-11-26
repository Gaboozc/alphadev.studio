# Deploy, Monitor, and Maintain
area: AI Engineering | module: iaeng-capstone — Capstone: Delivering an AI Product to a Client | lesson 3
id: iec-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-capstone/iec-l3

## Content

## What changes compared with a normal deployment

Everything from the back-end area still applies: containers, environment variables, migrations, tests. On top of that come four things specific to AI.

**API keys are real money.** A leaked key isn't just a security problem: it's an invoice. They go in environment variables, rotate periodically, and get a spend cap in the provider dashboard.

**Cost is variable and has to be watched live.** A traffic spike turns into a bill immediately. Per-task limit, daily limit, and an alert before hitting the cap.

**The provider can shift under your feet.** Models get updated, retired, and repriced. **Pin the model version** instead of using a generic alias, and have a plan for when that version retires.

**Quality can degrade without you touching anything.** That's why evaluation runs periodically, not only at deploy time.

### Staged rollout

```
1. Internal   the team uses it and logs what breaks
2. Pilot      a small, informed group with a direct channel to report issues
3. Partial    a percentage of real traffic
4. Full       with evaluation green and alerts in place
```

And at every stage, **a way back**. A kill switch that disables the system and returns flow to the prior manual process. Make sure it exists and is tested.

### What to monitor

```
technical: errors, p95 latency, uptime
cost:      hourly spend and month-to-date total
quality:   periodic evaluation pass rate
usage:     tasks per day, human escalations, drop-offs
business:  the number the project promised to improve
```

The last one is what the client cares about. The technical numbers are means to an end; if the system runs flawlessly and the business metric doesn't budge, the project didn't deliver.

### User feedback

A thumbs-up / thumbs-down button on every answer is the cheapest improvement source there is. Every thumbs-down is a candidate case for the evaluation set.

Save the full trace with each rating. That way you can reconstruct exact what happened on answers people flagged as bad.

### Maintenance: what has to be sold alongside the project

An AI system isn't delivered and forgotten. On an ongoing basis it needs: reviewing evaluation, adding new failures to the set, updating documents, watching spend, and migrating when the provider changes the model.

**That's recurring work and gets priced as such.** An AI project sold as a one-off handoff leaves the client with something that degrades and leaves you with unpaid support. A maintenance retainer isn't an add-on: it's part of the product.

## Tasks
- Pin the exact model version in your config and document the plan if it gets retired
- Set up spend limits and alerts before hitting the cap
- Implement the kill switch and actually test it
- Add user feedback that saves the full trace alongside the vote

## Tip

Using a model's generic alias instead of a pinned version means the provider can change your system without notice. One day your evals drop and you changed nothing: the model changed. Pin the version and upgrade when you choose.
