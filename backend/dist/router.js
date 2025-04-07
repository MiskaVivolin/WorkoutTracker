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
const models_1 = require("./models");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
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
        const { username, password } = req.body;
        console.log(req.body);
        const user = yield (0, models_1.userLogin)(username, password);
        if (user === "Invalid username") {
            return res.status(401).json({ message: user });
        }
        if (user === "Invalid password") {
            return res.status(403).json({ message: user });
        }
        res.status(200).json({ token: user });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, exercise, result } = req.body.workoutItem;
        const { username } = req.body;
        if (!username || !name || !date || !exercise || !result) {
            return res.status(422).json({ error: "Missing required fields" });
        }
        const newWorkoutData = yield (0, models_1.createWorkoutItem)({ username, name, date, exercise, result });
        res.status(200).json(newWorkoutData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.query.token;
        const workoutData = yield (0, models_1.getWorkoutData)(username);
        res.status(200).json(workoutData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/get/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const workoutItem = yield (0, models_1.getWorkoutItem)(itemId);
        res.status(200).json(workoutItem);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.put("/put", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workoutItem = req.body;
        const editedWorkoutItem = yield (0, models_1.editWorkoutItem)(workoutItem);
        res.status(200).json(editedWorkoutItem);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const deletedWorkoutItem = yield (0, models_1.deleteWorkoutItem)(itemId);
        res.status(200).json(deletedWorkoutItem);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
