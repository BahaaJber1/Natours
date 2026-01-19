import { readFileSync, writeFile } from "fs";

const dirname = import.meta.dirname;

const tours = JSON.parse(
  readFileSync(`${dirname}/../dev-data/data/tours-simple.json`, "utf-8"),
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const tourId = +req.params.id;
  res.json({ status: "success", data: { tour: tours[tourId] } });
};

const createTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = { id: tourId, ...req.body };
  tours.push(newTour);
  writeFile(
    `${dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: "error", message: "Could not save tour" });
      res.status(201).json({ status: "success", data: { tour: newTour } });
    },
  );
};

const updateTour = (req, res) => {
  const tourId = Number(req.params.id);
  const { name, duration } = req.body;
  tours[tourId] = { ...tours[tourId], name, duration };
  res.status(200).json({ status: "success", data: { tour: tours[tourId] } });
};

const deleteTour = (req, res) => {
  const tourId = Number(req.params.id);
  tours.splice(tourId, 1);
  res.status(204).json({ status: "success", data: null });
};

export { getAllTours, getTourById, createTour, updateTour, deleteTour, tours };
