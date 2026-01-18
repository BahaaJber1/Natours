import {} from "dotenv/config";

const PORT = Number(process.env.PORT) || 8000;

const serverSettings = {
  PORT,
};

export { serverSettings };
