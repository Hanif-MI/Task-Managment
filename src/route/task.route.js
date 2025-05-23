import express from "express";
import {
  addUpdateTask,
  getTasks,
  assignTaskToMember,
  removeTaskFromMember,
} from "../controller/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { USER_ACCESS } from "../utility/constant.js";
import { validate, ValidationTarget } from "../middleware/validation.middleware.js";
import {
  assignTaskToMemberSchema,
  taskSchema,
} from "../validation/task.validation.js";
import { idSchema } from "../validation/common.validation.js";

export const taskRouter = express.Router();

taskRouter.post(
  "/addUpdateTask",
  authMiddleware(),
  validate(taskSchema),
  addUpdateTask
);
taskRouter.get("/getTasks", authMiddleware(), getTasks);
taskRouter.post(
  "/assignTaskToMember",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(assignTaskToMemberSchema),
  assignTaskToMember
);
taskRouter.delete(
  "/removeTaskFromMember",
  authMiddleware(USER_ACCESS.ADMIN),
  validate(idSchema,ValidationTarget.QUERY),
  removeTaskFromMember
);
