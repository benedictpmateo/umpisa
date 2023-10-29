import { it, expect } from '@jest/globals';
import { parse } from "graphql";
import executor from './mock/executor';

it("runs a health against our graphql schema", async () => {
  const result: any = await executor()({
    document: parse(`
      query {
        health
      }
    `),
  });

  expect(result?.errors).toBeUndefined()
  expect(result).toHaveProperty("data");
  expect(result).toEqual({ data: { health: "check" } });
});
