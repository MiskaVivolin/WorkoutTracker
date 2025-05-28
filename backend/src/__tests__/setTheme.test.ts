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

    test("POST /set-theme - should update user theme", async () => {
        const mockThemeRes = {
            user_id: 1,
            theme: "dark",
        };

        const querySpy = jest.spyOn(pool, "query")
            .mockResolvedValueOnce({ rows: [{ id: 1 }] })
            .mockResolvedValueOnce({ rows: [mockThemeRes] });

        const res = await request(app).post("/set-theme").send({
            username: "miska123",
            theme: "dark",
        });

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockThemeRes);
        expect(querySpy).toHaveBeenCalledTimes(2);
    });

    test("POST /set-theme - should return 422 for invalid input", async () => {
        const querySpy = jest.spyOn(pool, "query");

        const res = await request(app).post("/set-theme").send({
            username: "miska123",
            theme: "blue",
        });

        expect(res.status).toBe(422);
        expect(res.body).toEqual({ error: "Missing or invalid fields" });
        expect(querySpy).toHaveBeenCalledTimes(0);
    });

    test("POST /set-theme - should return 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
            .mockRejectedValueOnce(new Error("DB failure"));

        const res = await request(app).post("/set-theme").send({
            username: "miska123",
            theme: "light",
        });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" });
        expect(querySpy).toHaveBeenCalledTimes(1);
    });

    test("POST /set-theme - should return 500 if user not found", async () => {
        const querySpy = jest.spyOn(pool, "query")
            .mockResolvedValueOnce({ rows: [] });

        const res = await request(app).post("/set-theme").send({
            username: "nonexistentuser",
            theme: "dark",
        });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" });
        expect(querySpy).toHaveBeenCalledTimes(1);
    });


})