import { toursRouter } from "#root/routes/tours.routes.js";
import { usersRouter } from "#root/routes/users.routes.js";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(`/api/v1/users`, usersRouter);
app.use(`/api/v1/tours`, toursRouter);

export { app };
