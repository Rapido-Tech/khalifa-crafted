import dotenv from "dotenv";
dotenv.config({ path: "./src/config/config.env" });

import app from "./app.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT ?? 4000;

const start = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
