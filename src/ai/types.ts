import { BankTransaction } from "../services/csvParser";

export interface AnalyzeInput {
    transactions: BankTransaction[];
}

export interface AnalyzeOutput {
    totalIncome: number;
    totalExpenses: number;
    categories: Record<string, number>;
    recommendations: string[];
}