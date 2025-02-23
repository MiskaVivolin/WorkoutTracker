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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var routerExpress = require("express");
var router = routerExpress.Router();
var _a = require('./models'), createTrainingData = _a.createTrainingData, getTrainingData = _a.getTrainingData;
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_id, name_1, exercise, date, result, newWorkoutData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log("Incoming request body:", req.body);
                _a = req.body, user_id = _a.user_id, name_1 = _a.name, exercise = _a.exercise, date = _a.date, result = _a.result;
                if (!user_id || !name_1 || !exercise || !date || !result) {
                    return [2 /*return*/, res.status(400).json({ error: "Missing required fields" })];
                }
                return [4 /*yield*/, createTrainingData({ user_id: user_id, name: name_1, exercise: exercise, date: date, result: result })];
            case 1:
                newWorkoutData = _b.sent();
                res.json(newWorkoutData);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error("Error creating workout data", error_1);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/get", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var workoutData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getTrainingData()];
            case 1:
                workoutData = _a.sent();
                res.json(workoutData);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error retrieving workout data");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
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
