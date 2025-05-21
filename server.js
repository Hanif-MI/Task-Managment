import { config } from "dotenv";
import db from "./src/models/index.js"; // Adjust the path to your models index file
config();

import express from "express";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { route } from "./src/route/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route)
app.use(errorHandler);

try {
  await db.sequelize.sync();
  await db.sequelize.authenticate();

  app.listen(process.env.PORT || 8080, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT || 8080}.`
    );
  });
} catch (err) {
  console.error("Unable to connect to the database:", err);
}
