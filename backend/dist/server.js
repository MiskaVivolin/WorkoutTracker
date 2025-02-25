"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
exports.app = (0, express_1.default)();
// const mongoose = require("mongoose")
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// mongoose.connect("mongodb+srv://miskavivolin:paviaanihuutaa123@cluster0.fpqvj.mongodb.net/mytrainingDB")
exports.app.use("/", router_1.default);
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(3001, function () {
        console.log("express server is running on port 3001");
    });
}
