import { config } from "dotenv";
import db from "./src/models/index.js"; // Adjust the path to your models index file
config();

import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

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
