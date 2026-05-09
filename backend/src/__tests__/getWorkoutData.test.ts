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

    const mockResData = [
        {
            id: 1,
            exercise: "Bench Press",
            date: "2025-03-01",
            weight: 3,
            reps: 5,
            user_id: 1,
        },
        {
            id: 2,
            exercise: "Bench Press",
            date: "2025-03-04",
            weight: 3,
            reps: 5,
            user_id: 1,
        },
        {
            id: 3,
            exercise: "Bench Press",
            date: "2025-03-10",
            weight: 3,
            reps: 6,
            user_id: 1,
        }
    ];

    test("GET /get - should retrieve all workout data", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce({ rows: [mockResData] })

        const res = await request(app).get("/get").query({ token: "John123" })
        expect(res.status).toBe(200);
        expect(querySpy).toHaveBeenCalledTimes(1)
    })

    test("GET /get - should return status 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockRejectedValueOnce(new Error("Database error"));
    
        const res = await request(app).get("/get").query({ token: "John123" })
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" });
        expect(querySpy).toHaveBeenCalledTimes(1)
    });
})