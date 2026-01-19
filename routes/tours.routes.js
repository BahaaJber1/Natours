import express from "express";
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from "#controllers/tours.controller";
import { tours } from "#controllers/tours.controller";
import { checkIdParam } from "#utils/checkIdParam";

const toursRouter = express.Router();
toursRouter.param("id", checkIdParam(tours)); // Middleware for the 'id' parameter

toursRouter.route("/").get(getAllTours).post(createTour);
toursRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

export { toursRouter };
