const modelMongoose = require("mongoose")

const prSchema = {
    name: String,
    lift: String,
    date: String,
    result: String
}

const userPrModels = modelMongoose.model("userprs", prSchema)

module.exports = userPrModels;