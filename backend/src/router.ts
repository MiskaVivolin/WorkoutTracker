import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { pool } from "./db";
import { createTrainingData, getTrainingData, userSignup } from "./models";
import { PostReq, PostRes, GetRes } from "./types/types";

const router = express.Router()


router.post("/signup", async (req: any, res: any) => {
  try {
    const { username, password } = req.body.validationFields;

    const signUp = await userSignup(username, password)
    if (!signUp) {
      res.status(409).json({ isTaken: true })
    } else {
      res.status(201).json({ isTaken: false })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})


router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body.validationFields;

  try {
    const user = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password" })
    }
    const token = jwt.sign({ userId: user.rows[0].id }, "your_secret_key", { expiresIn: "1h" });
    return res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "internal server error" })
  }
})


router.post("/create", async (req: PostReq, res: PostRes) => {
  try {
    const { user_id, name, exercise, date, result } = req.body

    if (!user_id || !name || !exercise || !date || !result) {
      return res.status(422).json({ error: "Missing required fields" });
    }
    
    const newWorkoutData = await createTrainingData({ user_id, name, exercise, date, result })
    res.status(200).json(newWorkoutData)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})


router.get("/get", async (_req: any, res: GetRes) => {
  try {
    const workoutData = await getTrainingData()
    res.status(200).json(workoutData)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router;

// OLD MONGO ROUTER

// const userPrs = require("./models")
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// import type { DataItem, PostReq, PostRes, GetRes, DeleteReq, DeleteRes, GetItemReq } from "./types/types";

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, minlength: 4 },
//   password: { type: String, required: true, minlength: 10, unique: true },
// });

// userSchema.index({ password: 1 }, { unique: true });

// const User = mongoose.model('User', userSchema);

// router.post('/signup', async (req: any, res: any) => {
//   const { username, password } = req.body.validationFields;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({
//         username,
//         password: hashedPassword,
//       });
      
//       await newUser.save();
      
//       res.json({ isTaken: false });
//     } else {
//       res.json({ isTaken: true });
//     }
//   } catch (error) {
//     console.error('Error checking username and password:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.post('/login', async (req: any, res: any) => {

//   const { username, password } = req.body.validationFields;

//   const user = await User.findOne({ username });

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid username' });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ message: 'Invalid password' });
//   }

//   const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

//   res.json({ token });
// });

// router.route("/create").post((req: PostReq, res: PostRes) => {

//     const user = req.body.username
//     const name = req.body.prObject.name
//     const date = req.body.prObject.date
//     const exercise = req.body.prObject.exercise
//     const result = req.body.prObject.result

//     if (name === '' || undefined || date === '' || undefined || exercise === '' || undefined || result === '' || undefined) {
//         res.json({ message: "Error: object has empty or undefined fields" });
//     }
//     else {
//         const newuserPr = new userPrs({
//             user, name, date, exercise, result
//         });
//         newuserPr.save()
//             .then((data: string) => {
//             res.json(data);
//             console.log(`Object ${data} created\n`);
//         })
//             .catch((err: string) => {
//             res.json({ message: "Error creating object" });
//             console.log("Error creating object", err);
//         });
//     }
// })

// router.route("/get").get((req: string, res: GetRes) => {

//     userPrs.find({})
//     .then((data: DataItem) => {
//       console.log('find data: ', data)
//         res.json(data)
//     })
//     .catch((err: JSON) => {
//         res.json({ message: "Error retrieving data"})
//         console.log('Error retrieving data', err)
//     })
// })

// router.route("/get/:id").get((req: GetItemReq, res: any) => {

//     userPrs.findById(req.params.id)
//     .then((data: string) => {
//         res.json(data)
//         console.log(`Object ${data} acquired\n`)
//     })
//     .catch((err: string) => {
//         res.json({ message: 'Error retrieving specific object' })
//         console.log(err)
//     })
// })

// router.route("/put/:id").put((req: any, res: any) => {

//     const { name, date, exercise, result } = req.body
//     userPrs.findOneAndUpdate(
//         { _id: req.params.id },
//         { name, date, exercise, result },
//         { new: true, useFindAndModify: false }
//     )
//     .then((data: string) => {
//         res.json({message: `Object ${data} updated`})
//         console.log(`Object ${data} updated\n`)
//     })
//     .catch((err: string) => {
//         res.json('Error updating object')
//         console.log('Error updating object', err)
//     })
// })

// router.route("/delete").delete((req: DeleteReq, res: DeleteRes) => {
    
//     userPrs.findByIdAndDelete(req.query.id)
//     .then((data: string) => {
//         res.json({ message: `Object: ${data} deleted`})
//         console.log(`Object: ${data} deleted\n`)
//     })
//     .catch((err: string) => {
//         res.json({ message: "Error deleting object" })
//         console.log("Error deleting object", err)
//     })
// })
