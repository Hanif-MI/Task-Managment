import express from "express";
import { userRoute } from "./user.route.js";
import { organizationRouter } from "./organization.route.js";

export const route = express.Router();

route.use("/user", userRoute);
route.use("/organization", organizationRouter);
