import { serverSettings } from "#config/settings";
import { app } from "#root/app.js";

const { PORT } = serverSettings;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
