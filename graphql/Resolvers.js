import { UserResolvers } from "./user/user.resovers.js";
import { TestResolvers } from "./test/test.resolvers.js";

export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...TestResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutations,
    ...TestResolvers.Mutation,
  },
};
