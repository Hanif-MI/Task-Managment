import express from "express";
import {
  addMemberToProject,
  addUpdateProject,
  deleteProject,
  getProjects,
  removeMemberFromProject,
} from "../controller/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { USER_ACCESS } from "../utility/constant.js";
import {
  validate,
  ValidationTarget,
} from "../middleware/validation.middleware.js";
import {
  AddProjectSchema,
  projectSchema,
} from "../validation/project.validation.js";
import { idSchema } from "../validation/common.validation.js";

export const projectRouter = express.Router();
projectRouter.post(
  "/addUpdateProject",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(projectSchema),
  addUpdateProject
);
projectRouter.get(
  "/getProjects",
  authMiddleware(USER_ACCESS.ADMIN),
  getProjects
);
projectRouter.delete(
  "/deleteProject",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(idSchema, ValidationTarget.QUERY),
  deleteProject
);
projectRouter.post(
  "/add-member-to-project",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(AddProjectSchema),
  addMemberToProject
);
projectRouter.delete(
  "/remove-member-to-project",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(idSchema, ValidationTarget.QUERY),
  removeMemberFromProject
);
