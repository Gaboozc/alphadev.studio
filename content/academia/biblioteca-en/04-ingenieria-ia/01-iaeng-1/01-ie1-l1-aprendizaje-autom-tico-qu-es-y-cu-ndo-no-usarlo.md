# Machine Learning: What It Is and When Not to Use It
area: AI Engineering | module: iaeng-1 — Models, Embeddings, and RAG | lesson 1
id: ie1-l1 | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-1/ie1-l1

## Content

## The idea in one sentence

In normal programming you write the rules and the program produces answers. In machine learning you give examples of right answers and the program infers the rules.

It works when the rules exist but are too many or too fuzzy to write by hand: spotting whether a review is positive, detecting a suspicious transaction, grouping customers who look alike.

### The three types you'll encounter

**Supervised.** You have labeled examples — emails marked spam and not spam — and the model learns to predict the label. It's 90% of what gets used in products.

- **Classification**: the output is a category. Spam or not? What product is this image?
- **Regression**: the output is a number. How much will this rental cost?

**Unsupervised.** There are no labels; the model looks for structure. Grouping customers by behavior (k-means) is the classic case.

**Reinforcement.** The model learns by trying things and getting a reward or penalty. That's what's behind chess-playing systems, and rarely what you need in an agency product.

### When NOT to use machine learning

This is the part almost nobody teaches and the one that saves the most money.

**If the rules can be written, write them.** Using a model to decide if an order exceeds a thousand dollars is absurd: it's an `if`. A model is slower, more expensive, harder to debug, and can be wrong. An `if` isn't.

**If you have no data, you have no model.** You need examples, lots of them and representative ones. Without them, there's no machine learning project; there's an unresolved conversation about where they'll come from.

**If errors are unacceptable.** Every model gets some percentage wrong. If that percentage can't be tolerated — medical, legal or financial decisions without human review — the model can suggest, not decide.

**If a pretrained model already solves it.** Training from scratch to classify sentiment when good models already exist is throwing weeks away.

### The minimum vocabulary

```
feature       each input piece of data: price, age, category
label         the right answer in the training examples
training      the process of inferring rules from examples
inference     using the already-trained model to predict
overfitting   memorized the examples and fails on new data
```

### The golden rule: split your data

Never evaluate a model on the same data you trained it on. It's like grading an exam with answers the student already saw.

```python
from sklearn.model_selection import train_test_split

X_entrena, X_prueba, y_entrena, y_prueba = train_test_split(
  X, y, test_size=0.2, random_state=42
)
```

A model with 99% accuracy in training and 60% on test didn't learn: it memorized. That's overfitting, and it's the most common beginner mistake.

### The misleading metric

If 99% of transactions are legitimate, a model that always answers "legitimate" is right 99% of the time and completely useless.

That's why accuracy alone says nothing on imbalanced data. You also look at:

- **Precision**: of the ones I flagged as fraud, how many actually were?
- **Recall**: of the real frauds, how many did I catch?

Which matters more depends on the business. In fraud detection, letting one slip through costs more than checking a false alarm: prioritize recall. In a spam filter, sending a real email to trash is worse: prioritize precision.

## Tasks
- Take three real business problems and decide for each whether it needs a model or rules are enough
- For one that does need it, define what the features would be and what the label would be
- Explain with an example of your own why accuracy can mislead on imbalanced data
- Train any sample model and compare its score on training vs. test

## Tip

Before pitching a model to a client, ask where the labeled data is going to come from. If the answer is "we'll generate it as we go," the project isn't a machine learning project yet: it's a data-collection project, and it takes months.
