"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const models_1 = require("./models");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body.validationFields;
        const signUp = yield (0, models_1.userSignup)(username, password);
        if (!signUp) {
            res.status(409).json({ isTaken: true });
        }
        else {
            res.status(201).json({ isTaken: false });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body.validationFields;
        const user = yield db_1.pool.query("SELECT id FROM users WHERE username = $1", [username]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.rows[0].id }, "your_secret_key", { expiresIn: "1h" });
        return res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, name, exercise, date, result } = req.body;
        if (!user_id || !name || !exercise || !date || !result) {
            return res.status(422).json({ error: "Missing required fields" });
        }
        const newWorkoutData = yield (0, models_1.createTrainingData)({ user_id, name, exercise, date, result });
        res.status(200).json(newWorkoutData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/get", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workoutData = yield (0, models_1.getTrainingData)();
        res.status(200).json(workoutData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
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
