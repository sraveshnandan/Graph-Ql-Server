import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Credentials } from "../config/credirntials.js";
import { GraphQLError } from "graphql";

export const isAuthenticated = async (token) => {
  try {
    let Object = {
      status: false,
      User: null,
    };
    const decode = jwt.verify(token, Credentials.JWT_SECRET);
    if (!decode) {
      return new AuthenticationError("Invalid or Expired Token.");
    }
    const user = await User.findById(decode._id).populate("tests");
    if (!user) {
      return new AuthenticationError("Invalid Id , No user found");
    }
    Object.status = true;
    Object.User = user;
    return Object;
  } catch (error) {
    return new AuthenticationError(error.message);
  }
};

export const isAdmin = async (role, token) => {
  try {
    let status = false;
    if (!token) {
      throw new AuthenticationError("You are not allowed to do this action.");
    }
    const decode = jwt.verify(token, Credentials.JWT_SECRET);
    if (!decode) {
      return new AuthenticationError("Invalid or Expired Token.");
    }
    const user = await User.findById(decode._id);
    if (!user) {
      throw new AuthenticationError("Invalid Id , No user found");
    }
    if (user.role.toString() === role.toString()) {
      status = true;
    }
    return status;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};
