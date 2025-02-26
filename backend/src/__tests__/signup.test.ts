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

    test("POST /signup - should create a new account", async () => {
        const mockUser = {
          validationFields: {
            username: "user123",
            password: "securepassword",
          },
        }
        const querySpy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [] })
        querySpy.mockResolvedValueOnce({ rows: [{ id: 1 }] })

        const res = await request(app).post("/signup").send(mockUser)

        expect(res.status).toBe(201)
        expect(res.body).toEqual({
            isTaken: false,
          })
        expect(querySpy).toHaveBeenCalledTimes(2);
    })

    test("POST /signup - should return 409 if username is taken", async () => {
        const mockUser = {
          validationFields: {
            username: "existingUser",
            password: "password123",
          },
        }
    
        const querySpy = jest.spyOn(pool, "query").mockResolvedValueOnce({
          rows: [{ username: "existingUser" }],
        })
    
        const res = await request(app).post("/signup").send(mockUser);
    
        expect(res.status).toBe(409);
        expect(res.body).toEqual({
          isTaken: true,
        });
        expect(querySpy).toHaveBeenCalledTimes(1)
      });
})