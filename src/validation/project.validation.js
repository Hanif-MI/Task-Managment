import Joi from "joi";

const projectSchema = Joi.object({
  name: Joi.string().required(),
  due_date: Joi.date().optional(),
  organization_id: Joi.string().required(),
  description: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
  status: Joi.string().valid("active", "inactive").optional(),
});

const AddProjectSchema = Joi.object({
  project_id: Joi.string().required(),
  user_id: Joi.string().required(),
});


export { projectSchema, AddProjectSchema };
