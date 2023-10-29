import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: __dirname,
  modulePathIgnorePatterns: ["dist"],
  globalSetup: "<rootDir>/__tests__/mock/globalSetup.ts",
  setupFilesAfterEnv: ["<rootDir>/__tests__/mock/setupFilesAfterEnv.ts"],
  globalTeardown: "<rootDir>/__tests__/mock/globalTeardown.ts",
};

export default config;
