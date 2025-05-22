import express from "express";
import {
  addMemberToProject,
  addUpdateProject,
  getProjects,
  removeMemberFromProject,
} from "../controller/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { USER_ACCESS } from "../utility/constant.js";
import { validate } from "../middleware/validation.middleware.js";
import { projectSchema } from "../validation/project.validation.js";

export const projectRouter = express.Router();
projectRouter.post(
  "/addUpdateProject",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(projectSchema),
  addUpdateProject
);
projectRouter.get("/getProjects", getProjects);
projectRouter.post("/add-member-to-project", addMemberToProject);
projectRouter.delete("/remove-member-to-project", removeMemberFromProject);
