import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  name: String,
  options: [
    {
      title: String,
      correct: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const UserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Review Title shouldn't be empty."],
    minlength: [10, "Review Title should be at least 10 characters long."],
  },
  ratings: {
    type: Number,
    default: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name shouldn't be empty."],
      minlength: [3, "Name at least contains 3 characters."],
    },
    description: {
      type: String,
      required: [true, "Description shouldn't be empty."],
      minlength: [50, "Descriptrion at least contains 50 characters."],
    },
    users: [UserSchema],
    questions: [QuestionSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [ReviewSchema],
    category: {
      type: String,
      default: "Uncategorised",
    },
    deficulty: {
      type: String,
      default: "Easy",
    },
  },
  { timestamps: true }
);

export const Test = mongoose.model("Test", TestSchema);
