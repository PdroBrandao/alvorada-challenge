import "dotenv/config";
import express, { Request, Response } from "express";
import { transactionAnalize } from "./ai/openAiAdapter";
import { upload } from "./middlewares/upload";
import { csvParse } from "./services/csvParser";

const app = express();

app.get("/health", (req: Request, res: Response)=>{
    res.json({status:"ok"})
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Running server on PORT: ${PORT}`)
})

app.post("/analyze", upload.single("file"), async (req:Request, res:Response)=>{
    if (!req.file) {
        res.status(400).json({error: "File is required"})
        return
    }
    try {
        const transactions = csvParse(req.file.buffer);
        const analize = await transactionAnalize({transactions})
        res.json(analize)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to analyze transactions"})
    }
})