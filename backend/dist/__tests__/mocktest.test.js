"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("Sanity check", () => {
    it("1 + 1 equals 2", () => {
        (0, globals_1.expect)(1 + 1).toBe(2);
    });
});
