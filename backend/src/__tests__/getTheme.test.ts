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

    test("GET /get-theme/:username - should return user theme", async () => {
        const mockThemeRes = { theme: "dark" };

        const querySpy = jest.spyOn(pool, "query")
            .mockResolvedValueOnce({ rows: [{ id: 1 }] })
            .mockResolvedValueOnce({ rows: [mockThemeRes] });

        const res = await request(app).get("/get-theme/user123");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockThemeRes);
        expect(querySpy).toHaveBeenCalledTimes(2);
    });

    test("GET /get-theme/:username - should return 500 if user not found", async () => {
        const querySpy = jest.spyOn(pool, "query")
            .mockResolvedValueOnce({ rows: [] });

        const res = await request(app).get("/get-theme/nonexistentuser");

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" });
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

    test("GET /get-theme/:username - should return 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
            .mockRejectedValueOnce(new Error("DB failure"));

        const res = await request(app).get("/get-theme/user123");

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" });
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

})