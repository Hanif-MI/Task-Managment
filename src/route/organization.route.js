import express from "express";
import { organizationSchema } from "../validation/organization.validation.js";
import {
  addUpdateOrganization,
  deleteOrganization,
  getOrganizations,
} from "../controller/organization.controller.js";
import { validate, ValidationTarget } from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { idSchema } from "../validation/common.validation.js";
import { USER_ACCESS } from "../utility/constant.js";

export const organizationRouter = express.Router();

organizationRouter.post(
  "/addUpdateOrganization",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(organizationSchema),
  addUpdateOrganization
);
organizationRouter.get(
  "/getOrganization",
  authMiddleware(USER_ACCESS.ADMIN),
  getOrganizations
);
organizationRouter.delete(
  "/deleteOrganization",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(idSchema,ValidationTarget.QUERY),
  deleteOrganization
);
