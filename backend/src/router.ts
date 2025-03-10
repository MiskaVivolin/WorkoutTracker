import express from "express";
import { createTrainingData, getTrainingData, getTrainingItem, userLogin, userSignup } from "./models";
import { PostReq, PostRes, GetRes, UserData, SignupRes, LoginRes, GetReq, GetItemReq } from "./types/types";

const router = express.Router()


router.post("/signup", async (req: UserData, res: SignupRes) => {
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


router.post("/login", async (req: UserData, res: LoginRes) => {
  try {
    const { username, password } = req.body.validationFields;
    
    const user = await userLogin(username, password)
    if (user === "Invalid username" ) {
      return res.status(401).json({ message: user })
    }    
    if (user === "Invalid password") {
      return res.status(403).json({ message: user })
    }
    res.status(200).json({ token: user })
  } catch (error) {
    res.status(500).json({ error: "internal server error" })
  }
})


router.post("/create", async (req: PostReq, res: PostRes) => {
  try {
    const { name, date, exercise, result } = req.body.workoutItem
    const { username } = req.body

    if (!username || !name || !date || !exercise || !result) {
      return res.status(422).json({ error: "Missing required fields" });
    }
    
    const newWorkoutData = await createTrainingData({ username, name, date, exercise, result })
    res.status(200).json(newWorkoutData)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})


router.get("/get", async (req: GetReq, res: GetRes) => {
  try {
    const username = req.query.token
    const workoutData = await getTrainingData(username)
    console.log("wrokoutdata: ", workoutData)
    res.status(200).json(workoutData)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/get/:id", async (req: GetItemReq, res: GetRes) => {
  try {
    const itemId = req.params.id
    console.log("item id: ", itemId)
    const workoutItem = await getTrainingItem(itemId)
    console.log("workout item: ", workoutItem)
    res.status(200).json(workoutItem)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

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
