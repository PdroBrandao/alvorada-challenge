USER:
You will receive a list of bank transactions in JSON.
Rules:
- Use ONLY the provided transactions.
- Do NOT invent data.
- All monetary values must be accurate to the cent.
- If data is missing, say "insufficient data".

Tasks:
1) Compute total income and total expenses.
2) Group expenses by category using total monetary amounts.
3) Identify recurring vs one-time expenses.
4) Provide 3 specific, data-backed recommendations.

Verification:
- Recalculate totals before answering.
- If any number is inconsistent, fix it.

For categories:
- Each category value MUST represent the TOTAL monetary amount spent in that category.
- Values must be numbers (not counts, weights, or scores).
- The sum of all category values MUST equal totalExpenses.
- Expenses include only money spent.
- Do NOT include savings, transfers, or internal allocations as expenses.
- Every expense transaction MUST be assigned to exactly one category.

Output:
Return STRICT JSON in this exact shape:
{
  "totalIncome": number,
  "totalExpenses": number,
  "categories": { "string": number },
  "recommendations": string[]
}

DATA:
{{TRANSACTIONS_JSON}}
