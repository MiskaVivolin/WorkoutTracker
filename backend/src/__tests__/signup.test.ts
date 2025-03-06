import request from "supertest";
import { jest, describe, afterEach, test, expect, afterAll } from "@jest/globals"
import { app } from "../server";
import { pool } from "../db";


jest.mock("../db")

describe("User signup", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    afterAll(async () => {
        await pool.end();
    })

    const mockUser = {
      validationFields: {
        username: "user123",
        password: "securepassword",
      },
    }

    test("POST /signup - should create a new account", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] })

        const res = await request(app).post("/signup").send(mockUser)

        expect(res.status).toBe(201)
        expect(res.body).toEqual({
            isTaken: false,
          })
        expect(querySpy).toHaveBeenCalledTimes(2);
    })

    test("POST /signup - should return status 409 and a boolean value if username is taken", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce({ rows: [{ username: "existingUser" }] })
    
        const res = await request(app).post("/signup").send(mockUser)
    
        expect(res.status).toBe(409);
        expect(res.body).toEqual({ isTaken: true })
        expect(querySpy).toHaveBeenCalledTimes(1)
      });

// improve

    test("POST /signup - should return status 500 on invalid data", async () => {
        const mockInvalidData = {}
    
        const querySpy = jest.spyOn(pool, "query")
    
        const res = await request(app).post("/signup").send(mockInvalidData);
        expect(res.status).toBe(500);
        expect(querySpy).toHaveBeenCalledTimes(0)
      });
})