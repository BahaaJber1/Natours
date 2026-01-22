import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "#controllers/users.controller";
import express from "express";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export { usersRouter };
