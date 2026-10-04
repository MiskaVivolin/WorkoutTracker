import express from "express";
import cors from "cors";
import router from "./router";
import { pool } from "./db";

export const app = express();

app.use(cors())
app.use(express.json())

app.get("/health", async (_req, res) => {
    try {
        await pool.query("SELECT 1");
        return res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error("Health check failed:", error);
        return res.status(503).json({ status: "unavailable" });
    }
});

app.use("/", router)

if (process.env.NODE_ENV !== 'test') {
    const port = Number.parseInt(process.env.PORT ?? "3001", 10);

    app.listen(port, function() {
        console.log(`express server is running on port ${port}`)
    })
}
