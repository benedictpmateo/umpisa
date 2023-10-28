import { it, expect } from '@jest/globals';
import { parse } from "graphql";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { graphQLServer } from "../src/app";

it("runs a health against our graphql schema", async () => {
  const executor = buildHTTPExecutor({
    fetch: graphQLServer.fetch,
  });
  const result: any = await executor({
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
