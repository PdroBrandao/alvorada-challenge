# Bank Statement Analyzer

A Node.js/TypeScript application that processes bank statement CSV files and generates financial analysis using OpenAI's API.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Add your OpenAI API key to `.env`:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Running

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## API Usage

### POST /analyze

Upload a CSV file containing bank transactions.

```bash
curl -X POST http://localhost:3000/analyze \
  -F "file=@bank_statement.csv"
```

**Response:**

```json
{
  "totalIncome": 17120.00,
  "totalExpenses": 9577.95,
  "categories": {
    "Housing": 4050.00,
    "Food & Dining": 500.00,
    ...
  },
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ]
}
```

### GET /health

Health check endpoint.

```bash
curl http://localhost:3000/health
```

# alvorada-challenge
