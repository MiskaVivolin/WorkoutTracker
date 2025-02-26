import { WorkoutData } from "./types/types";
import bcrypt from "bcrypt"
import { pool } from "./db"


export const userSignup = async (username: String, password: Buffer) => {
    try {
      const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      if (userExists.rows.length > 0) {
        return false
      }
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    )
      return true
    } catch (error) {
        console.error("Error signing up:", error);
        throw new Error("Database error");
    }
}

export const userLogin = async (username: String, password: Buffer) => {

}

export const createTrainingData = async ({user_id, name, exercise, date, result}: WorkoutData) => {
    try {
      const res = await pool.query(
        "INSERT INTO user_records (user_id, name, exercise, date, result) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, name, exercise, date, result]
      )
      return res.rows[0]
    } catch (error) {
      console.error("Error creating user record:", error)
    }
}

export const getTrainingData = async () => {
    try {
        const res = await pool.query('SELECT * FROM user_records')
        return res.rows
    } catch (error) {
        console.error("Error retrieving user records:", error)
        return []
    }
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