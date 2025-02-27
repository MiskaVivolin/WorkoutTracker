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
        
        const querySpy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [mockData] })
        
        const res = await request(app).post("/create").send(mockData);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining(mockData));
        expect(querySpy).toHaveBeenCalledTimes(1)
    })

    test("POST /create - should handle failure when unable to create a workout record", async () => {
        const querySpy = jest.spyOn(pool, "query").mockRejectedValueOnce(new Error("Internal server error"));
    
        const res = await request(app).post("/create").send(mockData);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" })
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

})