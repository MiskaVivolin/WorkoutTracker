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
(0, globals_1.describe)("User signup", () => {
    (0, globals_1.afterEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.pool.end();
    }));
    (0, globals_1.test)("POST /signup - should create a new account", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            validationFields: {
                username: "user123",
                password: "securepassword",
            },
        };
        const querySpy = globals_1.jest.spyOn(db_1.pool, "query").mockResolvedValueOnce({ rows: [] });
        querySpy.mockResolvedValueOnce({ rows: [{ id: 1 }] });
        const res = yield (0, supertest_1.default)(server_1.app).post("/signup").send(mockUser);
        (0, globals_1.expect)(res.status).toBe(201);
        (0, globals_1.expect)(res.body).toEqual({
            isTaken: false,
        });
        (0, globals_1.expect)(querySpy).toHaveBeenCalledTimes(2);
    }));
    (0, globals_1.test)("POST /signup - should return 409 if username is taken", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            validationFields: {
                username: "existingUser",
                password: "password123",
            },
        };
        const querySpy = globals_1.jest.spyOn(db_1.pool, "query").mockResolvedValueOnce({
            rows: [{ username: "existingUser" }],
        });
        const res = yield (0, supertest_1.default)(server_1.app).post("/signup").send(mockUser);
        (0, globals_1.expect)(res.status).toBe(409);
        (0, globals_1.expect)(res.body).toEqual({
            isTaken: true,
        });
        (0, globals_1.expect)(querySpy).toHaveBeenCalledTimes(1);
    }));
});
