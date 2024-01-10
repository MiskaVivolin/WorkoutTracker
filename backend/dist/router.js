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
Object.defineProperty(exports, "__esModule", { value: true });
const routerExpress = require("express");
const router = routerExpress.Router();
const userPrs = require("./models");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 4 },
    password: { type: String, required: true, minlength: 10, unique: true },
});
userSchema.index({ password: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body.validationFields;
    try {
        const user = yield User.findOne({ username });
        if (!user) {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: hashedPassword,
            });
            yield newUser.save();
            res.json({ isTaken: false });
        }
        else {
            res.json({ isTaken: true });
        }
    }
    catch (error) {
        console.error('Error checking username and password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body.validationFields;
    const user = yield User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
    }
    const isPasswordValid = yield bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
}));
router.route("/create").post((req, res) => {
    const user = req.body.username;
    const name = req.body.prObject.name;
    const date = req.body.prObject.date;
    const lift = req.body.prObject.lift;
    const result = req.body.prObject.result;
    if (name === '' || undefined || date === '' || undefined || lift === '' || undefined || result === '' || undefined) {
        res.json({ message: "Error: object has empty or undefined fields" });
    }
    else {
        const newuserPr = new userPrs({
            user, name, date, lift, result
        });
        newuserPr.save()
            .then((data) => {
            res.json(data);
            console.log(`Object ${data} created\n`);
        })
            .catch((err) => {
            res.json({ message: "Error creating object" });
            console.log("Error creating object", err);
        });
    }
});
router.route("/get").get((req, res) => {
    userPrs.find({})
        .then((data) => {
        console.log('find data: ', data);
        res.json(data);
    })
        .catch((err) => {
        res.json({ message: "Error retrieving data" });
        console.log('Error retrieving data', err);
    });
});
router.route("/get/:id").get((req, res) => {
    userPrs.findById(req.params.id)
        .then((data) => {
        res.json(data);
        console.log(`Object ${data} acquired\n`);
    })
        .catch((err) => {
        res.json({ message: 'Error retrieving specific object' });
        console.log(err);
    });
});
router.route("/put/:id").put((req, res) => {
    const { name, date, lift, result } = req.body;
    userPrs.findOneAndUpdate({ _id: req.params.id }, { name, date, lift, result }, { new: true, useFindAndModify: false })
        .then((data) => {
        res.json({ message: `Object ${data} updated` });
        console.log(`Object ${data} updated\n`);
    })
        .catch((err) => {
        res.json('Error updating object');
        console.log('Error updating object', err);
    });
});
router.route("/delete").delete((req, res) => {
    userPrs.findByIdAndDelete(req.query.id)
        .then((data) => {
        res.json({ message: `Object: ${data} deleted` });
        console.log(`Object: ${data} deleted\n`);
    })
        .catch((err) => {
        res.json({ message: "Error deleting object" });
        console.log("Error deleting object", err);
    });
});
module.exports = router;
