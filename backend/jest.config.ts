import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: __dirname,
  modulePathIgnorePatterns: ["dist"],
  globalSetup: "<rootDir>/__tests__/mock/globalSetup.ts",
  globalTeardown: "<rootDir>/__tests__/mock/globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/__tests__/mock/setupFile.ts"],
};

export default config;
