import request from "supertest";
import { jest, describe, afterEach, test, expect, afterAll } from "@jest/globals";
import { app } from "../server";
import { pool } from "../db";

jest.mock("../db");

describe("API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await pool.end();
  });

  const mockUser = {
    id: 1,
    username: "user123",
  };

  test("DELETE /delete-user/:username - should delete a user", async () => {
    const querySpy = jest
      .spyOn(pool, "query")
      .mockResolvedValueOnce({ rows: [mockUser] } as any);

    const res = await request(app).delete("/delete-user/user123");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "User deleted successfully",
      user: mockUser,
    });
    expect(querySpy).toHaveBeenCalledTimes(1);
  });

  test("DELETE /delete-user/:username - should return 404 if user not found", async () => {
    const querySpy = jest
      .spyOn(pool, "query")
      .mockResolvedValueOnce({ rows: [] } as any);

    const res = await request(app).delete("/delete-user/user123");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "User not found" });
    expect(querySpy).toHaveBeenCalledTimes(1);
  });

  test("DELETE /delete-user/:username - should return status 500 on database error", async () => {
    const querySpy = jest
      .spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("Database error"));

    const res = await request(app).delete("/delete-user/user123");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
    expect(querySpy).toHaveBeenCalledTimes(1);
  });
});
