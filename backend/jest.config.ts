export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|js)",
    "**/?(*.)+(spec|test).+(ts|js)"
  ]
};