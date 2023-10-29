import express from "express";
import { createYoga } from "graphql-yoga";
import jwt from 'jsonwebtoken';
import schema from "./modules/schema";
import { UserModel } from "./database/models/user";
import { UserPokemonModel } from "./database/models/user-pokemon";
import { verifyToken } from "./utils/jwt";

const models = {
  UserModel,
  UserPokemonModel,
}

export interface Context {
  auth?: boolean;
  user?: { _id: string; email: string } & jwt.JwtPayload;
  models: {
    UserModel: typeof UserModel,
    UserPokemonModel: typeof UserPokemonModel,
  }
}

export const graphQLServer = (_schema: any, _models: any) => createYoga({
  cors: {
    origin: '*'
  },
  schema: _schema,
  logging: false,
  context: async ({ request }): Promise<Context> => {
    try {
      const token = request.headers.get("authorization");
      if (token) {
        // jwt guard
        const user = await verifyToken(token)
        return { auth: true, user, models: _models }
      }
    } catch (error) {
      console.log(error);
    }
    return { models: _models }
  },
});

const server = graphQLServer(schema, models);

export function buildApp(app: ReturnType<typeof express>) {
  app.use(server.graphqlEndpoint, server);
  return server.graphqlEndpoint;
}
