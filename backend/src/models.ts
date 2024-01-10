const modelMongoose = require("mongoose")

const prSchema = {
    
    user: String,
    name: String,
    lift: String,
    date: String,
    result: String
}

const userPrModels = modelMongoose.model("userprs", prSchema)

module.exports = userPrModels;