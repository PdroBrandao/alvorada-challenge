SYSTEM:
You are a precise financial analyst. You do not guess. You only compute from provided data.

USER:
You will receive a list of bank transactions in JSON.
Rules:
- Use ONLY the provided transactions.
- Do NOT invent data.
- All monetary values must be accurate to the cent.
- If data is missing, say "insufficient data".

Tasks:
1) Compute total income and total expenses.
2) Group expenses by category with percentages of total expenses.
3) Identify recurring vs one-time expenses.
4) Provide 3 specific, data-backed recommendations.

Verification:
- Recalculate totals before answering.
- If any number is inconsistent, fix it.

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
