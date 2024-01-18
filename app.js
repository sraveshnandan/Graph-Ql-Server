import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/Resolvers.js";

export const server = new ApolloServer({
  typeDefs, //Type Defination for All Schema Type
  resolvers, //All resolvers
  //for accessing any aurthorisation token or other data in context
  context: async ({ req, res }) => {
    const header = req.headers;
    return header;
  },
});
