import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists."],
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlenght: [8, "Password must be at least of eight characters."],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "modrator"],
      default: "user",
    },
    rank: {
      type: Number,
      default: 999,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
