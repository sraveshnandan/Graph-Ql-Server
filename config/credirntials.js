import dotenv from "dotenv";

dotenv.config();

export const Credentials = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};
