import request from "supertest";
import { jest, describe, afterEach, test, expect, afterAll } from "@jest/globals"
import { app } from "../server";
import { pool } from "../db";

jest.mock("../db")

describe("API Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    afterAll(async () => {
        await pool.end();
    })
    
    const mockData = {
        user_id: 1,
        name: "John Doe",
        exercise: "Bench Press",
        date: "2025-02-20",
        result: "100kg"
    };

    test("POST /create - should create a workout record", async () => {
        
        jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [mockData] })
        
        const res = await request(app).post("/create").send(mockData);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name", "John Doe");
    })

    test("GET /get - should retrieve all workout data", async () => {

        jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: mockData })

        const res = await request(app).get("/get")
        expect(res.status).toBe(200);
    })
})