import { serverSettings } from "#config/settings";
import express from "express";
import { readFileSync, writeFile } from "fs";

const app = express();
const { PORT } = serverSettings;

app.use(express.json());

// since __dirname is not available in ES modules, we use import.meta.dirname
const dirname = import.meta.dirname;

// read the tours data from the file
const tours = JSON.parse(
  readFileSync(`${dirname}/dev-data/data/tours-simple.json`, "utf-8"),
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  // const tourId = parseInt(req.params.id);
  // const tourId = req.params.id * 1;
  const tourId = +req.params.id;
  if (tourId >= tours.length)
    return res.status(404).json({ status: "fail", message: "Invalid ID" });

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
  if (tourId >= tours.length)
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  const { name, duration } = req.body;
  tours[tourId] = { ...tours[tourId], name, duration };
  res.status(200).json({ status: "success", data: { tour: tours[tourId] } });
};

const deleteTour = (req, res) => {
  const tourId = Number(req.params.id);
  if (tourId >= tours.length)
    return res.status(404).json({ status: "fail", message: "Invalid ID" });

  tours.splice(tourId, 1);
  res.status(204).json({ status: "success", data: null });
};

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTourById);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
