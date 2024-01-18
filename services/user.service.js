import { AuthenticationError, UserInputError } from "apollo-server";
import { User } from "../models/user.model.js";
import { hashSync, compareSync } from "bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { Credentials } from "../config/credirntials.js";

export const registerUserFunction = async (data) => {
  try {
    const { name, email, password } = data;
    let user = await User.create({
      name,
      email,
      password: hashSync(password, 10),
    });
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

export const loginUserFunction = async (email, password) => {
  try {
    let user = await User.findOne({ email })
      .select("+password")
      .populate("tests");
    if (!user) {
      return new UserInputError("No user Found");
    }
    const isPassOk = compareSync(password, user.password);
    if (!isPassOk) {
      return new AuthenticationError("Invalid Credientials.");
    }
    const token = jwt.sign({ _id: user._id }, Credentials.JWT_SECRET, {
      expiresIn: "1d",
    });
    const responce = {
      user,
      token,
    };
    return responce;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const updateUserFunction = async (id, userInput) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return new UserInputError("Invalid Id provided, No user found");
    }
    const res = await User.findByIdAndUpdate(id, userInput, { new: true });
    return res;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const DeleteUserFunction = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return new UserInputError("Invalid Id, No User Found");
    }
    const res = await User.deleteOne({ _id: id });

    return "Acount Deleted Successfully.";
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const UserProfileFunction = async (id) => {
  try {
    const user = await User.findById(id).populate("tests");
    if (!user) {
      return new UserInputError("Invalid Id , No user Found.");
    }
    return user;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};
