# Project: A Script That Actually Saves You Work
area: Programming | module: fund-3 — Python: The Second Language | lesson 6
id: f3-l6 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/fund-3/f3-l6

## Project brief

You're going to write a command-line tool that solves a real repetitive task from your work. Not a made-up exercise: something you do by hand today and that tomorrow your script will do.

Ideas that work well and come from real agency work:

- Read an ad platform's CSV export and generate a summary by campaign with cost, conversions and cost per conversion.
- Walk through a folder of images, rename them with a pattern, convert them to WebP and report how much size was saved.
- Query a public API and save a JSON or Markdown report ready to send to a client.
- Check a list of URLs, see which ones return errors and generate a report.

What matters isn't size; it's that it's something you'll actually use again.

## Tasks
- Pick a real repetitive task you do by hand today and describe it in two sentences
- Set up the project with its virtual environment and requirements.txt
- Write the core function first and test it in the interactive interpreter before building the rest
- Add argparse for arguments and error handling by exception type
- Run ruff and mypy on it, and write the README with a real usage example

## Deliverables
- Repository with the script, requirements.txt and a README explaining what it does and how to use it
- The script accepts command-line arguments with argparse, with no hardcoded paths inside the code
- Type hints on every function and a dataclass or Pydantic model for the data it handles
- Error handling with specific exceptions: missing file, invalid format, network failure
- One sample input and one sample output included in the repository

## Rubric
- The script runs on a clean machine following only what the README says
- No paths or keys are hardcoded in the code: they arrive via arguments or environment variables
- When given a missing file, it shows a clear message instead of a stack trace
- Functions are annotated with type hints and mypy passes with no errors
- Ruff reports no issues
- There is an if __name__ == "__main__" block and logic lives in functions, not loose at top level
- The README explains the problem it solves, not just how to run it

## Discussion questions
- How long does that task take you by hand and how many times a month do you do it? That number is the script's real return.
- What happens if the input file arrives with an extra column or a different format than expected?

## Tip

Pick a task you do at least once a week. A script you run once rarely pays back the time to write it; one you run every week pays for itself in the first month and becomes something you can offer a client.
