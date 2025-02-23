const express = require("express")
const app = express()
const cors = require("cors")
const usePool = require("./db");
// const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

// mongoose.connect("mongodb+srv://miskavivolin:paviaanihuutaa123@cluster0.fpqvj.mongodb.net/mytrainingDB")

app.use("/", require("./router"))

app.listen(3001, function() {
    console.log("express server is running on port 3001")
})