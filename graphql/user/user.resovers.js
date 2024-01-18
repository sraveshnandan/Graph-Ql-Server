import { AuthenticationError, UserInputError } from "apollo-server";
import { User } from "../../models/user.model.js";
import {
  UserProfileFunction,
  loginUserFunction,
  registerUserFunction,
  updateUserFunction,
} from "../../services/user.service.js";
import { isAuthenticated } from "../../middlewares/Auth.js";
export const UserResolvers = {
  Query: {
    async me(_, { id }, context) {
      const Object = await isAuthenticated(context.auth);
      if (Object.status === true) {
        return await UserProfileFunction(id);
      }
      return new AuthenticationError("UnAuthenticated, Please login again");
    },
    async users(_, args) {
      const { page } = args;
      return await User.find({})
        .sort({ createdAt: -1 })
        .limit(page * 10);
    },
  },
  Mutations: {
    async addUser(_, { userInput }) {
      const user = await registerUserFunction(userInput);
      return user;
    },
    async login(_, { email, password }) {
      const user = await loginUserFunction(email, password);
      return user;
    },
    async updateUser(_, { id, userInput }) {
      const user = updateUserFunction(id, userInput);
      return user;
    },
    async deleteUser(_, { id }) {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
  },
};
