import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: __dirname,
  modulePathIgnorePatterns: ['dist'],
}

export default config;
