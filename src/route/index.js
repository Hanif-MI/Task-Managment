import express from "express";
import { userRoute } from "./user.route.js";
import { organizationRouter } from "./organization.route.js";
import { projectRouter } from "./project.route.js";
import { sectionRoute } from "./section.routes.js";
import { taskRouter } from "./task.route.js";

export const route = express.Router();

route.use("/user", userRoute);
route.use("/organization", organizationRouter);
route.use("/project", projectRouter);
route.use("/section", sectionRoute);
route.use("/task", taskRouter);