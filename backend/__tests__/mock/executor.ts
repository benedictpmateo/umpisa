import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { graphQLServer } from "../../src/app";
import schema, { typeDefs, resolvers } from "../../src/modules/schema";
import { UserModel } from "../../src/database/models/user";
import { UserPokemonModel } from "../../src/database/models/user-pokemon";

const models = {
  UserModel,
  UserPokemonModel,
};

// const schema = addMocksToSchema({
//   schema: makeExecutableSchema({
//     typeDefs,
//     resolvers,
//   }),
// });

const server = graphQLServer(schema, models);
const executor = buildHTTPExecutor({
  fetch: server.fetch,
});

export default executor;
