import express from "express";
import cors from "cors";
import router from "./router";

export const app = express();
// const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

// mongoose.connect("mongodb+srv://miskavivolin:paviaanihuutaa123@cluster0.fpqvj.mongodb.net/mytrainingDB")

app.use("/", router)

if (process.env.NODE_ENV !== 'test') {
    app.listen(3001, function() {
        console.log("express server is running on port 3001")
    })
}