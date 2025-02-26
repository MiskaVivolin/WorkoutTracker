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

    test("GET /get - should retrieve all workout data", async () => {

        const querySpy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: mockData })

        const res = await request(app).get("/get")
        expect(res.status).toBe(200);
        expect(querySpy).toHaveBeenCalledTimes(1)
    })

    test("GET /get - should return an empty array on failure", async () => {
        
        const querySpy = jest.spyOn(pool, "query").mockRejectedValueOnce(new Error("Database error"));
    
        const res = await request(app).get("/get")    
        expect(res).toEqual([]);
        expect(querySpy).toHaveBeenCalledTimes(1)

    });
})