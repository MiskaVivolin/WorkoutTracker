const mongoose = require("mongoose")

const prSchema = {
    name: String,
    lift: String,
    date: String,
    result: String
}

const userprs = mongoose.model("userprs", prSchema)

module.exports = userprs