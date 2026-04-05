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
    
    const mockReqData = {
        workoutItem: {
            date: "2025-03-01",
            exercise: "Bench Press",
            sets: 3,
            reps: 10
        },
        username: "user123",
    };

    const mockResData = {
        id: 1,
        exercise: "Bench Press",
        date: "2025-03-01",
        sets: 3,
        reps: 10,
        user_id: 1
    };

    const mockFalseReqData = {
        workoutItem: {
            date: "2025-03-01",
            exercise: "Bench Press",
        },
        username: "user123",
    };

    test("POST /create - should create a workout record", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [mockResData] })
        
        const res = await request(app).post("/create").send(mockReqData);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining(mockResData));
        expect(querySpy).toHaveBeenCalledTimes(2)
    })

    test("POST /create - should return status 422 when data is invalid", async () => {
        const querySpy = jest.spyOn(pool, "query")
    
        const res = await request(app).post("/create").send(mockFalseReqData);
        expect(res.status).toBe(422);
        expect(querySpy).toHaveBeenCalledTimes(0);
    });

    test("POST /create - should return status 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockRejectedValueOnce(new Error("Database error"));
    
        const res = await request(app).post("/create").send(mockReqData);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" })
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

})