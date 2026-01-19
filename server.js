import { serverSettings } from "#config/settings";
const { PORT } = serverSettings;
import { app } from "#root/app.js";

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
