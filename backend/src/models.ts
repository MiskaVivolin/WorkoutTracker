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
        throw new Error("Error signing up");
    }
}

export const retrieveUser = async (username: String) => {
  try {
    const user = await pool.query("SELECT username, password FROM users WHERE username = $1", [username])
    return user
  } catch (error) {
    throw new Error("Error logging in")
  }
}

export const createTrainingData = async ({username, name, exercise, date, result}: WorkoutData) => {
    try {
      const userRes = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [username]
      )
      const user_id = userRes.rows[0].id

      const res = await pool.query(
        "INSERT INTO user_records (name, exercise, date, result, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, exercise, date, result, user_id]
      )
      return res.rows[0]
    } catch (error) {
      throw new Error("Unable to create new workout data to the database");
    }
}

export const getTrainingData = async (username: string) => {
    try {
      const userRes = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [username]
      )
      const user_id = userRes.rows[0].id

      const res = await pool.query(
        'SELECT * FROM user_records WHERE user_id = $1', 
        [user_id])
      return res.rows
    } catch (error) {
      throw new Error("Unable to retrieve workout data from the database");
    }
}