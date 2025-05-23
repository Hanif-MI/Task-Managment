import express from "express";
import {
  addSectionToProject,
  addUpdateSection,
  getAllSections,
  removeSectionFromProject,
} from "../controller/section.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { USER_ACCESS } from "../utility/constant.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { addSectionSchema, addSectionToProjectSchema } from "../validation/section.validation.js";
import { idSchema } from "../validation/common.validation.js";

export const sectionRoute = express.Router();
sectionRoute.post(
  "/addUpdateSection",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(addSectionSchema),
  addUpdateSection
);
sectionRoute.get(
  "/getAllSections",
  authMiddleware(USER_ACCESS.ADMIN),
  getAllSections
);

sectionRoute.post(
  "/addSectionToProject",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(addSectionToProjectSchema),
  addSectionToProject
);

sectionRoute.delete(
  "/removeSectionFromProject",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(idSchema),
  removeSectionFromProject
);
