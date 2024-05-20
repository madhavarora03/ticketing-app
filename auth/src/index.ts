import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(express.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Listening on 3000!!!");
  });
};

start();
