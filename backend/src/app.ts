import express from "express";
import { createYoga } from "graphql-yoga";
import schema from "./modules/schema";
import { verifyToken } from "./utils/jwt";

export const graphQLServer = createYoga({
  schema,
  logging: false,
  context: async ({ request }) => {
    try {
      const token = request.headers.get("authorization");
      if (token) {
        // jwt guard
        const user = await verifyToken(token)
        return { auth: true, user }
      }
    } catch (error) {
      return {}
    }
  },
});

export function buildApp(app: ReturnType<typeof express>) {
  app.use(graphQLServer.graphqlEndpoint, graphQLServer);
  return graphQLServer.graphqlEndpoint;
}
