import {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  tours,
  updateTour,
} from "#controllers/tours.controller";
import { checkIdParam } from "#middlewares/checkIdParam.middleware";
import { checkBody } from "#middlewares/checkBody.middleware";
import express from "express";

const toursRouter = express.Router();
toursRouter.param("id", checkIdParam(tours)); // Middleware for the 'id' parameter

toursRouter.route("/").get(getAllTours).post(checkBody, createTour);
toursRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

export { toursRouter };
