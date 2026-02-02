# SOLUTION.md

## Overview

This solution implements a Node.js + TypeScript application that processes bank statement CSV files and generates a financial analysis using OpenAI’s API.

The core challenge was not only integrating the API, but **making the AI output reliable**, numerically consistent, and semantically meaningful when dealing with structured financial data.  
To address this, the solution emphasizes **prompt iteration, explicit constraints, and post-LLM validation**, prioritizing correctness and stability over analytical breadth.

---

## 1. Prompt Changes

### Prompt v1 — Baseline (Provided)

The initial prompt focused on high-level tasks (totals, categories, recommendations) but left several aspects underspecified.

Observed issues:
- Categories were returned as abstract scores or weights instead of monetary values.
- Numerical outputs were inconsistent across runs.
- Ambiguity around what constituted an “expense” led to hallucinated conventions.

This version demonstrated that a generic prompt is insufficient for deterministic financial analysis.

---

### Prompt v2 — Enforcing Numeric Semantics

The second iteration explicitly constrained category values to represent **total monetary amounts** and required that category totals equal `totalExpenses`.

Improvements:
- Categories now had clear financial meaning.
- Abstract scoring and weighting were eliminated.

Remaining issues:
- The model occasionally applied accounting sign conventions (negative expenses).
- Savings and internal transfers were sometimes misclassified as expenses.
- Some expense transactions were not consistently assigned to a category.

This showed that numeric semantics alone are not enough without stricter conceptual boundaries.

---

### Prompt v3 — Semantic and Structural Constraints (Final)

The final iteration introduced explicit semantic constraints:
- Expenses are strictly money spent.
- Savings, transfers, and internal allocations are explicitly excluded.
- Every expense transaction must be assigned to exactly one category.
- Categories must cover the full expense set.

This shifted the model from “summarizing numbers” to **mapping transactions to categories**, significantly reducing hallucination and improving consistency.

This version was selected as the final prompt due to its balance between correctness, stability, and interpretability.

---

## 2. Hallucination Mitigation

Several strategies were used to reduce hallucination:

- Strict scoping: the model is instructed to use only the provided transactions and never invent data.
- Explicit constraints: ambiguous financial concepts (e.g., savings vs expenses) are clearly defined.
- Invariant enforcement: category totals must equal total expenses, and all transactions must be categorized.
- Low temperature: `temperature = 0` was used to reduce output variance.
- Post-LLM validation: the application validates the returned JSON structure and types before responding.

Importantly, the solution avoids forcing the model to “fix” numbers by arbitrarily adjusting categories, as this was observed to degrade semantic correctness.

---

## 3. Testing Approach

Prompt quality was evaluated through iterative manual testing:

- Multiple executions per prompt version to assess variance.
- Direct comparison of outputs between versions (v1 → v2 → v3).
- Verification that:
  - Categories had consistent meaning.
  - No abstract or symbolic values appeared.
  - Savings and transfers were excluded.
  - Recommendations referenced real numeric values.

This iterative approach made failure modes visible and guided prompt refinement.

---

## 4. Trade-offs and Design Decisions

### Deterministic Math vs Probabilistic Models

Large language models are probabilistic by nature and are not ideal for deterministic financial calculations.

This solution deliberately uses the LLM for:
- Categorization
- Semantic interpretation
- Insight generation

Deterministic calculations (e.g., percentages, month-over-month comparisons) can be safely computed downstream once category totals are stable.

---

### Percentages and Month-over-Month Analysis

Although mentioned in the expected output structure, these features were intentionally not implemented in the final prompt.

Rationale:
- Early experiments showed that adding multiple analytical dimensions increased inconsistency.
- Percentages and MoM comparisons are deterministic transformations that do not require probabilistic reasoning.

The solution prioritizes semantic correctness and reliability over analytical completeness.

---

## Conclusion

This solution demonstrates a pragmatic approach to AI-assisted financial analysis:

- Prompt engineering treated as an iterative engineering task.
- Clear separation between probabilistic reasoning and deterministic computation.
- Conscious trade-offs made under time constraints.

The final result is a stable, defensible system that can be incrementally extended without compromising correctness.
