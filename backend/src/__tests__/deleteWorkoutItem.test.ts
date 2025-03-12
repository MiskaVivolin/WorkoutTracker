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

    const mockResData = {
        id: 3,
        name: "John Doe",
        date: "10.3.2025",
        exercise: "Bench Press",
        result: "80kg x 8",
        user_id: 1,
    };

    test("DELETE /delete/:id - should delete a workout item", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce({ rows: [mockResData] })

        const res = await request(app).delete("/delete/:id").query({ id: 1 })
        expect(res.status).toBe(200);
        expect(querySpy).toHaveBeenCalledTimes(1)
    })

    test("DELETE /delete/:id - should return status 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockRejectedValueOnce(new Error("Database error"));
    
        const res = await request(app).delete("/delete/:id").query({ id: 1 })
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: "Internal server error" });
        expect(querySpy).toHaveBeenCalledTimes(1)
    });
})