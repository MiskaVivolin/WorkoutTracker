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
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const server_1 = require("../server");
const db_1 = require("../db");
globals_1.jest.mock("../db");
(0, globals_1.describe)("API Routes", () => {
    (0, globals_1.afterEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.pool.end();
    }));
    const mockData = {
        user_id: 1,
        name: "John Doe",
        exercise: "Bench Press",
        date: "2025-02-20",
        result: "100kg"
    };
    (0, globals_1.test)("POST /create - should create a workout record", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(db_1.pool, "query").mockResolvedValueOnce({ rows: [mockData] });
        const res = yield (0, supertest_1.default)(server_1.app).post("/create").send(mockData);
        (0, globals_1.expect)(res.status).toBe(200);
        (0, globals_1.expect)(res.body).toHaveProperty("name", "John Doe");
    }));
    (0, globals_1.test)("GET /get - should retrieve all workout data", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(db_1.pool, "query").mockResolvedValueOnce({ rows: mockData });
        const res = yield (0, supertest_1.default)(server_1.app).get("/get");
        (0, globals_1.expect)(res.status).toBe(200);
    }));
});
