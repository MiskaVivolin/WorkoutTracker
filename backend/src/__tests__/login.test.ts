import request from "supertest";
import { jest, describe, afterEach, test, expect, afterAll } from "@jest/globals"
import bcrypt from "bcrypt";
import { app } from "../server";
import { pool } from "../db";


jest.mock("../db")

describe("User login", () => {
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

    test("POST /login - should log in to an account", async () => {
      const mockHashedUser = {
        username: "user123", password: await bcrypt.hash("securepassword", 10)
      }

      const querySpy = jest.spyOn(pool, "query")
      .mockResolvedValueOnce({ rows: [mockHashedUser] })

      const res = await request(app).post("/login").send(mockUser)
      expect(res.status).toBe(200)
      expect(querySpy).toHaveBeenCalledTimes(1);
    })

    // test("POST /login - should return status 401 if username is invalid", async () => {

    //   const mockHashedUser = {
    //     username: "user123", password: await bcrypt.hash("securepassword", 10)
    //   }
    //     const querySpy = jest.spyOn(pool, "query")
    //     .mockResolvedValueOnce({ rows: [mockHashedUser] })
    
    //     const res = await request(app).post("/login").send(mockUser);
    
    //     expect(res.status).toBe(401);
    //     expect(res.body).toEqual({ isTaken: true })
    //     expect(querySpy).toHaveBeenCalledTimes(1)
    // })

    test("POST /login - should return status 500 on database error", async () => {
        const querySpy = jest.spyOn(pool, "query")
        .mockResolvedValueOnce(new Error("Database error"))
    
        const res = await request(app).post("/login").send(mockUser);
    
        expect(res.status).toBe(500);
        expect(querySpy).toHaveBeenCalledTimes(1)
    })
})