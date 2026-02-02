import { parse } from "csv-parse/sync";

export interface BankTransaction {
    date: string;
    description: string;
    amount: number;
    category?: string;
}

export function csvParse(buffer: Buffer): BankTransaction[]{
    const csvParse = buffer.toString("utf-8");

    const records = parse(csvParse,{
        columns: true,
        skip_empty_lines: true,
        trim: true
    }) as Record<string, string>[]

    return records.map((row)=> ({
        date: row.date,
        description: row.description,
        amount: Number(row.amount)
    }));
}