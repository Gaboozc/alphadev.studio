# Unit 3 — UX Writing: The Words in the Interface

**Weeks 6–7 · 12 hours**

**Guiding question:** What words does the user need at each moment in the interface to move forward without hesitating?

**Time per part [INFERENCE; method in `rework/profx/formatos-leccion.md`, section 0.1]:** Guide approx. 20 min (about 1,600 words at 120 wpm + 5 min of quick checks) · Exercises approx. 3 h 00 min (4 level-1 × 10 min, 2 level-2 × 25 min, 2 level-3 × 45 min) · Quiz approx. 30 min · Reflection approx. 1 h 30 min. **Active time approx. 5 h 20 min** of the 12 h planned in the syllabus. The remaining approx. 6 h 40 min is independent study: rereading, notes, reference readings and review.

> **Core idea.** An interface doesn't end with colors and type; it ends when the user finishes what they came to do. The words that guide them (buttons, labels, error messages, empty screens, notices) are part of the design. *UX writing* is the discipline that designs those words. It matters to every role: the developer writing an error message, the designer laying out a form, the marketing team writing an app's welcome screen.

## Objectives

- Tell UX writing apart from copywriting.
- Apply the principles: clear, concise, useful, consistent, human.
- Write buttons, labels, error messages, empty states, confirmations and notices.
- Define voice and tone and document them in a minimal style guide.
- Test microcopy with users.

---

## 1. Copywriting vs. UX writing

| | Copywriting | UX writing |
|---|---|---|
| **Goal** | Persuade, convert | Guide, clarify, reduce friction |
| **When** | Before the decision (page, ad, email) | While using the product |
| **Length** | Can be long | As short as possible without losing clarity |
| **Success** | The reader acts | The user finishes their task without thinking about the words |

They overlap: an app's sign-up screen has to convince (copy) and guide (UX). But once the user is inside, what they need is clarity, not persuasion. Good UX writing is almost invisible.

## 2. Five principles

1. **Clear.** The user shouldn't have to interpret. "Error 403" says nothing; "You don't have permission to view this page. Sign in with an admin account" says what's happening and what to do.
2. **Concise.** Every word that doesn't help gets in the way. "Click here to continue with the registration process" → "Create account." But concise doesn't mean cryptic: if trimming removes necessary information, don't trim.
3. **Useful.** What does the user need to know *right now*? No more, no less.
4. **Consistent.** The same term for the same action across the whole product. If one screen says "Delete" and another says "Remove," or "Project" and "Workspace" for the same thing, users wonder whether they're different things.
5. **Human.** Without sounding like a machine or forcing the friendliness. "Your request has been successfully processed" → "Done: your order is confirmed."

## 3. The elements of microcopy

### 3.1 Buttons and links
- Use **verbs** that describe the action and, if needed, the object: "Download invoice," "Send request," "Create project."
- Avoid generic buttons like "OK," "Yes" or "Submit" when the context doesn't make clear what will happen.
- The button label should match what happens when you press it.
- In confirmation dialogs, the buttons should make sense without reading the rest:

> ✗ "Are you sure? [Yes] [No]"
> ✓ "Delete the project 'Rootbound site'? Its 34 files will be deleted and you won't be able to recover them. [Delete project] [Cancel]"

- Avoid "Click here": it doesn't say where it goes, and it's worse for accessibility (screen readers often list links without their surrounding context).

### 3.2 Form labels and helper text
- **Visible**, short labels above the field: "Email address."
- Don't use the example text inside the field (*placeholder*) as the only label: it disappears when you type and usually has low contrast.
- Helper text for anything that isn't obvious: "We'll only use this number to text you about your delivery."
- State formats and requirements **before** the user makes a mistake: "At least 8 characters, including a number."

### 3.3 Error messages
A good error message answers three questions: **what happened? why? (if it helps) and what can I do?** Also:
- Don't blame the user ("You entered invalid data").
- Don't use internal codes as the main message (they can go separately, for support).
- Show the error next to the affected field and keep what the user already typed.

### Worked example 1 — Rewriting an error

*Original:* "Error processing request. Code: ERR_INVALID_INPUT_002. Contact your system administrator."

*Diagnosis:* it doesn't say what failed, the code means nothing to the user, and "contact your system administrator" isn't a possible action for most people (who is that? how?).

*Suppose* the code means "the date of birth is in the wrong format." Rewritten, next to the field:
> "Enter the date as MM/DD/YYYY, for example 03/07/1995."

If the error is the system's fault, not the user's:
> "We couldn't save your changes because of a problem on our end. Your information is still here: try again in a few minutes. If it keeps failing, email support@company.com and mention code ERR-002."

Notice that **to rewrite an error, you have to know what it means**: UX writing requires talking to the engineering team.

### 3.4 Empty states
The screen the user sees when there's no content yet (no projects, no messages, no results). It's a chance to explain and orient:

> ✗ "No data."
> ✓ "You don't have any projects yet. Create your first one to start organizing your tasks. [Create project]"

For a search with no results: "No results for 'red shoos.' Check the spelling or try fewer words."

### 3.5 Confirmations, loading and notices
- **Confirmation:** say what happened and what's next. "Payment received. We emailed your receipt to ana@example.com."
- **Loading:** if it takes a while, say so. "Generating your report… this usually takes less than a minute."
- **Destructive actions:** describe the consequence and offer undo when possible ("Conversation archived. [Undo]").

## 4. Voice and tone

- **Voice:** the product's stable personality (e.g., friendly, clear, knowledgeable, jargon-free). It doesn't change.
- **Tone:** how the voice adapts to each situation. A celebration can take enthusiasm ("Your store is live!"); a payment error can't ("We couldn't process your card. Check the details or try another card.").

### Register: how casual?
English has no formal "you," so formality lives in other choices: contractions ("you'll" vs. "you will"), everyday words vs. formal ones ("get" vs. "obtain"), exclamation points, humor and emoji. Most consumer apps in the US write casually and use contractions; banking, health care, government and products for older audiences usually lean more formal and avoid humor. What matters is choosing deliberately and staying **consistent**.

### Minimal style guide
Document on one page:
1. Voice (3 adjectives with "do / don't" examples).
2. Register (contractions or not, humor or not, emoji or not).
3. Glossary: chosen terms and banned terms ("Project," not "Space" or "Workspace").
4. Rules: capitalization (decide between sentence case, "Create new project," which Google's and Microsoft's style guides recommend for UI text, and Title Case, "Create New Project," and apply it everywhere), date and time formats, numbers, emoji use.
5. Patterns: templates for errors, confirmations and empty states.

## 5. Testing microcopy

The simplest test: ask someone who's never seen the interface to complete a task without help, and watch. Wherever they hesitate or ask "what does this mean?", there's a copy (or design) problem. Other techniques:
- **Comprehension test:** show a message and ask, "What would you do now?"
- **A/B test** of button labels or key screens, if there's enough traffic.
- **Review support tickets:** lots of repeated questions point to confusing copy.

### Worked example 2 — A complete flow

*Flow:* resetting a password.

| Screen | Before | After |
|---|---|---|
| Link on the sign-in screen | "Trouble?" | "Forgot your password?" |
| Title | "Credential recovery" | "Reset your password" |
| Field | (placeholder) "Email" | Label: "Email you signed up with" |
| Button | "Submit" | "Send reset link" |
| Confirmation | "Request processed" | "If there's an account for ana@example.com, we've sent a link. Check your spam folder too. The link expires in 30 minutes." |
| Link error | "Invalid token" | "This link has expired. [Get a new link]" |

Look at the confirmation: "If there's an account…" is deliberate. Not confirming whether an email is registered is a common security practice, and the copy respects it without confusing the user. UX writing also works within technical and legal constraints.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Ambiguous "OK"/"Yes" buttons | Verb + object |
| Technical codes as the message | What happened and what to do; the code goes separately |
| Blaming the user | Neutral, solution-oriented language |
| Placeholder as the only label | A visible label |
| Different terms for the same thing | A glossary and consistency |
| A cheerful tone on a serious error | Adapt the tone to the situation |
| Writing without knowing what the system does | Talk to the engineering team |

## Summary

UX writing designs the words that guide users inside a product, with five principles: clear, concise, useful, consistent and human. Buttons use verbs that announce what will happen; errors say what happened and what to do without blaming; empty states orient; confirmations say what's next. A stable voice with an adaptable tone, documented in a minimal guide, keeps things consistent. And all microcopy gets tested with real users.
