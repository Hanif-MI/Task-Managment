import Joi from "joi";

export const organizationSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500).optional(),
  is_active: Joi.boolean().default(true).optional(),
  status: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .optional(),
});
