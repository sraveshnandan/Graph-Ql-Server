import dotenv from "dotenv";
import mongoose from "mongoose";
import { server } from "./app.js";
dotenv.config();

// main function to connect database or start graphql server
const startServer = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log(` Database connected : ${res.connection.host}`);
      server
        .listen({ port: 4000 })
        .then((res) =>
          console.log(`🤑 Graphql Server is started on ${res.url}`)
        );
    })
    .catch((err) => console.log(err));
};
// invoking main function
startServer();
