const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userPr = require("./models")

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://miskavivolin:paviaanihuutaa123@cluster0.fpqvj.mongodb.net/mytrainingDB")

app.use("/", require("./router"))

app.get("/", (req, res) => {
    res.body
})

app.listen(3001, function() {
    console.log("express server is running on port 3001")
})