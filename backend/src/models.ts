import { CreateWorkoutData, ThemeData, WorkoutData } from "./types/types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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

export const userLogin = async (username: String, password: Buffer) => {
  try {
    const user = await pool.query(
      `SELECT id, username, password 
      FROM users 
      WHERE username = $1`, 
      [username]
    )
        
    if (user.rows.length === 0) {
      return "Invalid username"
    }
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return "Invalid password"
    }
    const token = jwt.sign({ userId: user.rows[0].id }, "your_secret_key", { expiresIn: "1h" });
    return token
  } catch (error) {
    throw new Error("Error logging in")
  }
}

export const createWorkoutItem = async ({username, name, date, exercise, result}: CreateWorkoutData) => {
  try {
    const userRes = await pool.query(
      `SELECT id 
      FROM users 
      WHERE username = $1`,
      [username]
    )
    const user_id = userRes.rows[0].id
    const res = await pool.query(
      `INSERT INTO user_records (name, date, exercise, result, user_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [name, date, exercise, result, user_id]
    )
    return res.rows[0]
  } catch (error) {
    throw new Error("Unable to create new workout data to the database");
  }
}

export const getWorkoutData = async (username: string) => {
  try {
    const res = await pool.query(
      `SELECT user_records.*
       FROM user_records 
       JOIN users ON user_records.user_id = users.id 
       WHERE users.username = $1`, 
      [username]
    )
    return res.rows
  } catch (error) {
    throw new Error("Unable to retrieve workout data from the database");
  }
}

export const getWorkoutItem = async (itemId: number) => {
  try {
    const res = await pool.query(
      `SELECT * FROM user_records 
      WHERE id = $1`, 
      [itemId]
    )
    return res.rows[0]
  } catch (error) {
    throw new Error("Unable to retrieve workout Item from the database");
  }
}

export const editWorkoutItem = async (workoutData: WorkoutData) => {
  try {
    const { name, date, exercise, result, id } = workoutData
    const res = await pool.query(
      `UPDATE user_records 
      SET name = $1, date = $2, exercise = $3, result = $4 
      WHERE id = $5
      RETURNING *`,
      [name, date, exercise, result, id]
    )
    return res.rows
  } catch (error) {
    throw new Error("Unable to edit a workout item in the database")
  }
}

export const deleteWorkoutItem = async (itemId: number) => {
  try {
    const res = await pool.query(
      `DELETE FROM user_records
      WHERE id = $1
      RETURNING *`,
      [itemId]
    )
    return res.rows
  } catch (error) {
    throw new Error("Unable to delete a workout item from the database")
  }
}

export const getUserTheme = async (username: string) => {
  try {
    const userRes = await pool.query(
      `SELECT id FROM users 
      WHERE username = $1`, 
      [username]
    );
    const user_id = userRes.rows[0].id;
    const res = await pool.query(
      `SELECT theme FROM user_theme 
      WHERE user_id = $1`, 
      [user_id]
    );
    return res.rows[0];
  } catch (error) {
    throw new Error("Unable to retrieve user theme from the database")
  }
}

export const setUserTheme = async (themeData: ThemeData) => {
  try {
    const { username, theme } = themeData;
    const userRes = await pool.query(
      `SELECT id FROM users 
      WHERE username = $1`,
      [username]
    );
    const user_id = userRes.rows[0].id;
    const res = await pool.query(
      `INSERT INTO user_theme (user_id, theme)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET theme = EXCLUDED.theme
       RETURNING *`,
      [user_id, theme]
    );
    return res.rows[0];
  } catch (error) {
    throw new Error("Unable to set user theme in the database");
  }
};
