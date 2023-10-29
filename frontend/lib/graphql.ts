import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3001/graphql';

const graphqlClient = new GraphQLClient(endpoint);

export default graphqlClient
