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
        workoutItem: {
            name: "John Doe",
            date: "1.3.2025",
            exercise: "Bench Press",
            result: "100kg"
        },
        username: "user123",
    };

    const mockResData = {
        name: "John Doe",
        date: "1.3.2025",
        exercise: "Bench Press",
        result: "100kg",
        user_id: 1
    };

    const mockFalseData = {
        workoutItem: {
            date: "1.3.2025",
            exercise: "Bench Press",
            result: "100kg",
        },
        username: "user123",
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

    test("POST /create - should return status 422 when data is invalid", async () => {
        const querySpy = jest.spyOn(pool, "query")
    
        const res = await request(app).post("/create").send(mockFalseData);
        expect(res.status).toBe(422);
        expect(querySpy).toHaveBeenCalledTimes(0);
    });

    test("POST /create - should return status 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockRejectedValueOnce(new Error("Database error"));
    
        const res = await request(app).post("/create").send(mockData);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" })
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

})