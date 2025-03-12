import express from "express";
import cors from "cors";
import router from "./router";

export const app = express();

app.use(cors())
app.use(express.json())

app.use("/", router)

if (process.env.NODE_ENV !== 'test') {
    app.listen(3001, function() {
        console.log("express server is running on port 3001")
    })
}