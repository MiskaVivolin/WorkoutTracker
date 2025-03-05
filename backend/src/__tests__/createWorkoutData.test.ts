import request from "supertest";
import { jest, describe, afterEach, test, expect, afterAll } from "@jest/globals"
import { app } from "../server";
import { pool } from "../db";
import { WorkoutData } from "../types/types";


jest.mock("../db")

describe("API Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    afterAll(async () => {
        await pool.end();
    })
    
    const mockData = {
        name: "John Doe",
        exercise: "Bench Press",
        date: "2025-02-20",
        result: "100kg",
        username: "matti123",
    };

    const mockResData = {
        id: 5,
        name: "John Doe",
        exercise: "Bench Press",
        date: "2025-02-20",
        result: "100kg",
        user_id: 1
    };

    const mockFalseData = {
        exercise: "Bench Press",
        date: "2025-02-20",
        result: "100kg",
    };

    test("POST /create - should create a workout record", async () => {
        
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [mockResData] })
        
        const res = await request(app).post("/create").send(mockData);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining(mockResData));
        expect(querySpy).toHaveBeenCalledTimes(2)
    })

    test("POST /create - should handle failure when unable to create a workout record", async () => {
        const querySpy = jest.spyOn(pool, "query").mockRejectedValueOnce({ rows: [mockFalseData] });
    
        const res = await request(app).post("/create").send(mockData);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" })
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

})