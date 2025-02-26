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
exports.getTrainingData = exports.createTrainingData = exports.userLogin = exports.userSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const userSignup = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield db_1.pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) {
            return false;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
        return true;
    }
    catch (error) {
        console.error("Error signing up:", error);
        throw new Error("Database error");
    }
});
exports.userSignup = userSignup;
const userLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.userLogin = userLogin;
const createTrainingData = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, name, exercise, date, result }) {
    try {
        const res = yield db_1.pool.query("INSERT INTO user_records (user_id, name, exercise, date, result) VALUES ($1, $2, $3, $4, $5) RETURNING *", [user_id, name, exercise, date, result]);
        return res.rows[0];
    }
    catch (error) {
        console.error("Error creating user record:", error);
    }
});
exports.createTrainingData = createTrainingData;
const getTrainingData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query('SELECT * FROM user_records');
        return res.rows;
    }
    catch (error) {
        console.error("Error retrieving user records:", error);
        return [];
    }
});
exports.getTrainingData = getTrainingData;
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
