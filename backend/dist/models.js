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
exports.setUserTheme = exports.deleteWorkoutItem = exports.editWorkoutItem = exports.getWorkoutItem = exports.getWorkoutData = exports.createWorkoutItem = exports.userLogin = exports.userSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        throw new Error("Error signing up");
    }
});
exports.userSignup = userSignup;
const userLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.pool.query(`SELECT id, username, password 
      FROM users 
      WHERE username = $1`, [username]);
        if (user.rows.length === 0) {
            return "Invalid username";
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return "Invalid password";
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.rows[0].id }, "your_secret_key", { expiresIn: "1h" });
        return token;
    }
    catch (error) {
        throw new Error("Error logging in");
    }
});
exports.userLogin = userLogin;
const createWorkoutItem = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, name, date, exercise, result }) {
    try {
        const userRes = yield db_1.pool.query(`SELECT id 
      FROM users 
      WHERE username = $1`, [username]);
        const user_id = userRes.rows[0].id;
        const res = yield db_1.pool.query(`INSERT INTO user_records (name, date, exercise, result, user_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`, [name, date, exercise, result, user_id]);
        return res.rows[0];
    }
    catch (error) {
        throw new Error("Unable to create new workout data to the database");
    }
});
exports.createWorkoutItem = createWorkoutItem;
const getWorkoutData = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query(`SELECT user_records.*
       FROM user_records 
       JOIN users ON user_records.user_id = users.id 
       WHERE users.username = $1`, [username]);
        return res.rows;
    }
    catch (error) {
        throw new Error("Unable to retrieve workout data from the database");
    }
});
exports.getWorkoutData = getWorkoutData;
const getWorkoutItem = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query(`SELECT * FROM user_records 
      WHERE id = $1`, [itemId]);
        return res.rows[0];
    }
    catch (error) {
        throw new Error("Unable to retrieve workout Item from the database");
    }
});
exports.getWorkoutItem = getWorkoutItem;
const editWorkoutItem = (workoutData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, exercise, result, id } = workoutData;
        const res = yield db_1.pool.query(`UPDATE user_records 
      SET name = $1, date = $2, exercise = $3, result = $4 
      WHERE id = $5
      RETURNING *`, [name, date, exercise, result, id]);
        return res.rows;
    }
    catch (error) {
        throw new Error("Unable to edit a workout item in the database");
    }
});
exports.editWorkoutItem = editWorkoutItem;
const deleteWorkoutItem = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query(`DELETE FROM user_records
      WHERE id = $1
      RETURNING *`, [itemId]);
        return res.rows;
    }
    catch (error) {
        throw new Error("Unable to delete a workout item from the database");
    }
});
exports.deleteWorkoutItem = deleteWorkoutItem;
const setUserTheme = (themeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, theme } = themeData;
        const userRes = yield db_1.pool.query(`SELECT id FROM users WHERE username = $1`, [username]);
        const user_id = userRes.rows[0].id;
        const res = yield db_1.pool.query(`INSERT INTO user_theme (user_id, theme)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET theme = EXCLUDED.theme
       RETURNING *`, [user_id, theme]);
        return res.rows[0];
    }
    catch (error) {
        console.error(error);
        throw new Error("Unable to set user theme in the database");
    }
});
exports.setUserTheme = setUserTheme;
