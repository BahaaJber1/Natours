import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "#controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export { usersRouter };
