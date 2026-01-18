import express from "express";
import { serverSettings } from "#config/settings";

const app = express();
const { PORT } = serverSettings;

app.get("/", (req, res) => {
  res.json({ response: "success", data: "Hello, Natours!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
