import { GraphQLError } from "graphql";
import { Test } from "../models/test.model.js";
import { UserInputError } from "apollo-server";
import { User } from "../models/user.model.js";

export const createTestFunction = async (data) => {
  try {
    let test = await Test.create(data);
    return test;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const updateTestFunction = async (id, data) => {
  try {
    let test = await Test.findById(id);
    if (!test) {
      return new UserInputError("Invaid Id, No Test Found.");
    }
    let res = await Test.findByIdAndUpdate(id, data, { new: true });
    return res;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const deleteTestFunction = async (id) => {
  try {
    let test = await Test.findById(id);
    if (!test) {
      return new UserInputError("Invalid Id , No Test found.");
    }
    let res = await Test.findByIdAndDelete(id);

    return "Test deleted successfully.";
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const getTestByIdFunction = async (id) => {
  try {
    const test = await Test.findById(id);
    if (!test) {
      return new UserInputError("Invalid Id, No test found.");
    }
    return test;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};
export const getTestFunction = async (page) => {
  try {
    const limit = page * 10;
    const tests = await Test.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("users");
    return tests;
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

// Review Operation

export const AddOrUpdateReviewFunction = async (testId, reviewInput, user) => {
  try {
    let test = await Test.findById(testId);

    if (!test) {
      return "Invalid Id, No Test Provided.";
    }

    const validUser = user.tests.find(
      (data) => data._id.toString() === testId.toString()
    );
    if (validUser) {
      const newReview = { ...reviewInput, user: user._id };
      let alreadyExists = test.reviews.find(
        (data) => data.user.toString() === user._id.toString()
      );
      if (alreadyExists) {
        const reviewIndex = test.reviews.findIndex(
          (data) => data.user._id.toString() === user._id.toString()
        );
        test.reviews[reviewIndex] = newReview;
        await test.save();
        return "Review Updated Successfully.";
      }
      test.reviews.push(newReview);
      await test.save();
      return "Review Added Successfully..";
    }
    return "You are not allowed to perform this action.";
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const deleteReviewFunction = async (testId, reviewId, user) => {
  try {
    let test = await Test.findById(testId);

    if (!test) {
      return "Invalid Id, No Test Found";
    }
    console.log("Test Foound");
    const ReviewIndex = test.reviews.findIndex(
      (data) => data._id.toString() === reviewId.toString()
    );
    if (ReviewIndex !== -1) {
      console.log("Review Found");
      console.log(ReviewIndex);
      if (user.role === "admin") {
        console.log("Review deleted by admin.");
        test.reviews.splice(ReviewIndex, 1);
        await test.save();
        return "Review Deleted Successfully.";
      }
      if (test.reviews[ReviewIndex].user.toString() === user._id.toString()) {
        console.log("Review Deleted By User");
        test.reviews.splice(ReviewIndex, 1);
        await test.save();
        return "Review Deleted Successfully.";
      }
      return "You are not allowed to perform this task.";
    }
    return "Invalid Id, No Review Found.";
  } catch (error) {
    return new GraphQLError(error.message);
  }
};

export const StartTestFunction = async (testId, user, score) => {
  try {
    let test = await Test.findById(testId);
    let userDoc = await User.findById(user._id);
    if (!test) {
      return "Invalid Id, No Test Found.";
    }
    if (!user) {
      return "Invalid Id, No User Found.";
    }

    const isUserAlreadyExistsIndex = test.users.findIndex(
      (data) => data.user.toString() === user._id.toString()
    );
    const newUserData = {
      user: user._id,
      score: score || 0,
    };
    if (isUserAlreadyExistsIndex === -1) {
      userDoc.tests.push(test._id);
      await userDoc.save();
      test.users.push(newUserData);
      await test.save();
      return "Test Completed successfully.";
    } else {
      test.users[isUserAlreadyExistsIndex].score == score;
      await test.save();
      return "Score Updated Successfully.";
    }
  } catch (error) {
    return new GraphQLError(error.message);
  }
};
