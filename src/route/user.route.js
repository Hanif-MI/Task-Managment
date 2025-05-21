import express from "express";
import { login, register } from "../controller/user.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "../validation/user.validation.js";

export const userRoute = express.Router();

userRoute.post("/register", validate(registerSchema),register);
userRoute.post("/login", validate(loginSchema),login);
