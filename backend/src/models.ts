const modelMongoose = require("mongoose")

const prSchema = {
    
    user: String,
    name: String,
    exercise: String,
    date: String,
    result: String
}

const userPrModels = modelMongoose.model("userprs", prSchema)

module.exports = userPrModels;