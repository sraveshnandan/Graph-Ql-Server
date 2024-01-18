import { AuthenticationError, UserInputError } from "apollo-server";
import { isAdmin, isAuthenticated } from "../../middlewares/Auth.js";
import {
  AddOrUpdateReviewFunction,
  StartTestFunction,
  createTestFunction,
  deleteReviewFunction,
  deleteTestFunction,
  getTestByIdFunction,
  getTestFunction,
  updateTestFunction,
} from "../../services/test.service.js";

export const TestResolvers = {
  Query: {
    async getTest(_, { id }, context) {
      const status = await isAdmin("admin", context.auth);
      if (status === true) {
        const data = await getTestByIdFunction(id);
        return data;
      }
      return new UserInputError(status);
    },
    async tests(_, { page }, context) {
      const status = await isAdmin("admin", context.auth);
      if (status === true) {
        const data = await getTestFunction(page);
        return data;
      }
      return new UserInputError(status);
    },
  },
  Mutation: {
    // Test Based User Mutations

    async StartTest(_, { testId, score }, context) {
      const Object = await isAuthenticated(context.auth);

      if (Object.status === true) {
        const user = Object.User;
        const res = await StartTestFunction(testId, user, score);
        return res;
      }
      return new AuthenticationError("Please login to continue...");
    },

    // Pure Test Mutations
    async createTest(_, { testInput }, context) {
      const data = await isAdmin("admin", context.auth);
      if (data === true) {
        const data = await createTestFunction(testInput);
        return data;
      }
      return new AuthenticationError("You are not allowed for this action.");
    },
    async updateTest(_, { id, testInput }, context) {
      const status = await isAdmin("admin", context.auth);
      if (!status) {
        return new AuthenticationError(
          "You are not allowed to do this action."
        );
      }
      const data = await updateTestFunction(id, testInput);
      return data;
    },
    async deleteTest(_, { id }, context) {
      const status = await isAdmin("admin", context.auth);
      if (!status) {
        return new AuthenticationError(
          "You are not allowed to do this action."
        );
      }
      const data = await deleteTestFunction(id);
      return data;
    },

    // Review MUTATIONS

    async addOrUpdateReview(_, { testId, reviewInput }, context) {
      const Object = await isAuthenticated(context.auth);

      if (Object.status === true) {
        const user = Object.User;
        const res = await AddOrUpdateReviewFunction(testId, reviewInput, user);
        return res;
      }
      return new AuthenticationError("Please login to continue...");
    },

    async deleteReview(_, { reviewId, testId }, context) {
      const Object = await isAuthenticated(context.auth);

      if (Object.status === true) {
        const user = Object.User;
        const res = await deleteReviewFunction(testId, reviewId, user);
        return res;
      }
      return new AuthenticationError("Please login to continue...");
    },
  },
};
