import express from "express";
import { organizationSchema } from "../validation/organization.validation.js";
import {
  addUpdateOrganization,
  getOrganizations,
} from "../controller/organization.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

export const organizationRouter = express.Router();

organizationRouter.post(
  "/addUpdateOrganization",
  authMiddleware("admin"),
  validate(organizationSchema),
  addUpdateOrganization
);
organizationRouter.get(
  "/getOrganization",
  authMiddleware("admin"),
  getOrganizations
);
