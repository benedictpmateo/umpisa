import { HeadersConfig, buildHTTPExecutor } from "@graphql-tools/executor-http";
import { graphQLServer } from "../../src/app";
import schema from "../../src/modules/schema";
import { UserModel } from "../../src/database/models/user";
import { UserPokemonModel } from "../../src/database/models/user-pokemon";

const models = {
  UserModel,
  UserPokemonModel,
};

const server = graphQLServer(schema, models);

const executor = (headers?: HeadersConfig) =>  buildHTTPExecutor({
  fetch: server.fetch,
  headers,
});

export default executor;
