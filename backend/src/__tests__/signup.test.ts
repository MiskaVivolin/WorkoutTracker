import request from "supertest";
import { jest, describe, afterEach, test, expect, afterAll } from "@jest/globals";
import bcrypt from "bcrypt";
import { app } from "../server";
import { pool } from "../db";

jest.mock("../db");

describe("User signup", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await pool.end();
  });

  const mockUser = {
    validationFields: {
      username: "user123",
      password: "securepassword",
    },
  };

  test("POST /signup - should create a new account", async () => {
    const querySpy = jest.spyOn(pool, "query")
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });

    jest.spyOn(bcrypt, "hash" as any).mockResolvedValueOnce("hashedpassword");

    const res = await request(app).post("/signup").send(mockUser.validationFields);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "Signup successful" });
    expect(querySpy).toHaveBeenCalledTimes(2);
  });

  test("POST /signup - should return status 409 if username is taken", async () => {
    const querySpy = jest.spyOn(pool, "query")
      .mockResolvedValueOnce({ rows: [{ username: "existingUser" }] });

    const res = await request(app).post("/signup").send(mockUser.validationFields);

    expect(res.status).toBe(409);
    expect(res.body).toEqual({ message: "Username already taken" });
    expect(querySpy).toHaveBeenCalledTimes(1);
  });

  test("POST /signup - should return status 500 on Database error", async () => {
    const querySpy = jest.spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("Database error"));

    const res = await request(app).post("/signup").send(mockUser.validationFields);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
    expect(querySpy).toHaveBeenCalledTimes(1);
  });
});
