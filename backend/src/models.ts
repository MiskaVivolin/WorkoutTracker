import { DataItem } from "./types/types";

const usePool = require("./db");


const createTrainingData = async ({user_id, name, exercise, date, result}: DataItem) => {
    try {
        const res = await usePool.query(
            "INSERT INTO user_records (user_id, name, exercise, date, result) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id, name, exercise, date, result]
        )
        return res.rows[0]
    } catch (error) {
        console.error("Error creating user record:", error)
    }
}

const getTrainingData = async () => {
    try {
        const res = await usePool.query('SELECT * FROM user_records')
        return res.rows
    } catch (error) {
        console.error("Error retrieving user records:", error)
    }
}

module.exports = {
    createTrainingData,
    getTrainingData
}


// const modelMongoose = require("mongoose")

// const prSchema = {
    
//     user: String,
//     name: String,
//     exercise: String,
//     date: String,
//     result: String
// }

// const userPrModels = modelMongoose.model("userprs", prSchema)

// module.exports = userPrModels;