import { createSchema } from "graphql-yoga";
import { UserTypeDef, UserResolver } from "./user";
import { PokemonTypeDef, PokemonResolver } from "./pokemon";
import { merge } from "../utils/objects";
import { generatePaginatedMetadata } from "../utils/metadata";

const BaseTypeDef = /* Base Type Defs to be extended in modules */ `
  type Query {
    health: String
    metadata(collection: String!, size: Int, page: Int): Pagination
  }
  type Mutation {
    base: String!
  }

  type Pagination {
    total: Int
    totalPages: Int
    hasPrev: Boolean
    hasNext: Boolean
  }
`;

const BaseResolver = {
  Query: {
    health: () => "check",
    metadata: (
      _,
      args: { collection: string; size?: number; page?: number }
    ) => {
      return generatePaginatedMetadata(args);
    },
  },
  Mutation: {
    base: () => "mutate!",
  },
};

export const typeDefs = [BaseTypeDef, UserTypeDef, PokemonTypeDef];
export const resolvers = {
  Query: merge(BaseResolver.Query, UserResolver.Query, PokemonResolver.Query),
  Mutation: merge(
    BaseResolver.Mutation,
    UserResolver.Mutation,
    PokemonResolver.Mutation
  ),
}

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default schema;
