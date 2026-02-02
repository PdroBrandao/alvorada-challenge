import fs from "fs";
import OpenAI from "openai";
import path from "path";
import { AnalyzeInput, AnalyzeOutput } from "./types";

const promptPath = path.join(__dirname, "../../prompts/prompt_v3.md");
const basePrompt = fs.readFileSync(promptPath, "utf-8")

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function transactionAnalize(input: AnalyzeInput): Promise<AnalyzeOutput>{

    const promptWithTransactions = basePrompt.replace("{{TRANSACTIONS_JSON}}", JSON.stringify(input.transactions, null, 2));

    const response = await client.chat.completions.create({
        model:"gpt-4o-mini",
        temperature: 0,
        messages:[
            {role: "system", content: "You are a precise financial analyst. You do not guess"},
            {role: "user", content: promptWithTransactions}
        ],
    });

    const content = response.choices[0].message.content;
    if(!content) throw new Error("Empty response from OPENAI");

    console.log(content)

    let result: AnalyzeOutput;

    try{
        const cleanContent = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        result = JSON.parse(cleanContent);
        console.log(result.totalExpenses)
    } catch {
        throw new Error("Invalid JSON returned by OPENAI")
    }

    if( typeof result.totalIncome !== "number" || typeof result.totalExpenses !== "number" || 
        typeof result.categories !== "object" || !Array.isArray(result.recommendations)) {
            throw new Error("OPENAI responses does not match AnalyzeOutput schema")
    }
    return result;
}