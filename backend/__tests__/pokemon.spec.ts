import { it, expect, describe } from "@jest/globals";
import assert from "node:assert";
import { parse } from "graphql";
import executor from "./mock/executor";

describe("query Pokemon($size: Int, $page: Int)", () => {
  it("should fetch a paginated list of pokemon", async () => {
    const paginate = {
      size: 10,
      page: 1,
    }
    const result: any = await executor(global.__UmpisaAuthHeaders)({
      document: parse(`
        query Pokemon($size: Int, $page: Int) {
          pokemons(size: $size, page: $page) {
            id
            name {
              english
            }
          }
          metadata(collection: "pokemon", size: $size, page: $page) {
            total
            totalPages
            hasNext
            hasPrev
          }
        }
      `),
      variables: {
        size: paginate.size,
        page: paginate.page,
      },
    });
    expect(result.data).toBeTruthy();
    expect(result.data.pokemons).toHaveLength(paginate.size);
    expect(result.data.metadata?.total).toBeGreaterThan(1)
  });
});
